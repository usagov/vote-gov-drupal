#!/bin/bash

kill_pids() {
  app=$1
  ids=$(ps aux | grep ${app} | grep -v grep | awk '{print $2}')
  for id in ${ids}; do
    kill -9 ${id}
  done
}

## Wait for the tunnel to finish connecting.
wait_for_tunnel() {
  while : ; do
    [ -n "$(grep 'Press Control-C to stop.' backup.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done 
}

echo "Running 'drush cr' on '${BACKUP_ENV}' database..."
source $(pwd $(dirname $0))/scripts/pipeline/cloud-gov-remote-command.sh "vote-drupal-${BACKUP_ENV}" "drush cr"

## Create a tunnel through the application to pull the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client vote-drupal-${BACKUP_ENV} vote-mysql-${BACKUP_ENV} > backup.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
echo "Backing up '${BACKUP_ENV}' database..."
{
  host=$(cat backup.txt | grep -i host | awk '{print $2}')
  port=$(cat backup.txt | grep -i port | awk '{print $2}')
  username=$(cat backup.txt | grep -i username | awk '{print $2}')
  password=$(cat backup.txt | grep -i password | awk '{print $2}')
  dbname=$(cat backup.txt | grep -i '^name' | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql
  
  echo "[mysqldump]" > ~/.mysql/mysqldump.cnf
  echo "user=${username}" >> ~/.mysql/mysqldump.cnf
  echo "password=${password}" >> ~/.mysql/mysqldump.cnf
  chmod 400 ~/.mysql/mysqldump.cnf
  
  mysqldump \
  --defaults-extra-file=~/.mysql/mysqldump.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  ${dbname} > backup_${BACKUP_ENV}.sql

  ## Patch out any MySQL 'SET' commands that require admin.
  sed -i 's/^SET /-- &/' backup_dev.sql

} >/dev/null 2>&1

## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} >/dev/null 2>&1

## Clean up.
rm -rf backup.txt ~/.mysql