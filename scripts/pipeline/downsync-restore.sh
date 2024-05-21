#!/bin/bash

kill_pids() {
  app=$1
  ids=$(ps aux | grep ${app} | grep -v grep | awk '{print $2}')
  for id in ${ids}; do
    kill -9 ${id} >/dev/null 2>&1
  done
}

## Wait for the tunnel to finish connecting.
wait_for_tunnel() {
  while : ; do
    [ -n "$(grep 'Press Control-C to stop.' restore.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done
}

## Create a tunnel through the application to restore the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client ${project}-drupal-${RESTORE_ENV} ${project}-mysql-${RESTORE_ENV} > restore.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
echo "Restoring '${BACKUP_ENV}' database to '${RESTORE_ENV}'..."
{
  host=$(cat restore.txt | grep -i host | awk '{print $2}')
  port=$(cat restore.txt | grep -i port | awk '{print $2}')
  username=$(cat restore.txt | grep -i username | awk '{print $2}')
  password=$(cat restore.txt | grep -i password | awk '{print $2}')
  dbname=$(cat restore.txt | grep -i '^name' | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql

  echo "[client]" > ~/.mysql/mysql.cnf
  echo "user=${username}" >> ~/.mysql/mysql.cnf
  echo "password=${password}" >> ~/.mysql/mysql.cnf
  chmod 400 ~/.mysql/mysql.cnf

  mysql \
  --defaults-extra-file=~/.mysql/mysql.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  --database=${dbname} < backup_${BACKUP_ENV}.sql

} >/dev/null 2>&1

## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} >/dev/null 2>&1

## Clean up database connection.
rm -rf restore.txt ~/.mysql backup_${BACKUP_ENV}.sql

echo "Running 'drush cr' on '${BACKUP_ENV}' database..."
source $(pwd $(dirname $0))/scripts/pipeline/cloud-gov-remote-command.sh "${project}-drupal-${RESTORE_ENV}" "drush cr"

# Upload media files.
backup_media="cms/public/media"

echo "Uploading media files..."
{
  cf target -s "${cf_space}"

  service="${project}-storage-${RESTORE_ENV}"
  service_key="${service}-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"
  sleep 2
  s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)

  export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

  #rm -rf ${backup_media}
  #mkdir -p ${backup_media}
  #tar xzf media_${BACKUP_ENV}.tar.gz -C ${backup_media}

  #sync the files that were backed up, deleting those not found from the backup env
  aws s3 sync --no-verify-ssl --delete ${backup_media}/ s3://${bucket}/${backup_media} #2>/dev/null

  cf delete-service-key "${service}" "${service_key}" -f
} #>/dev/null 2>&1
