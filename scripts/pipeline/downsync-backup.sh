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
    [ -n "$(grep 'Press Control-C to stop.' backup.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done
}

## Create a tunnel through the application to pull the database.
echo "Creating tunnel to database..."
if [ ${BACKUP_ENV} = "prod" ]; then
  cf enable-ssh vote-drupal-${BACKUP_ENV}
  cf restart --strategy rolling vote-drupal-${BACKUP_ENV}
fi
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

  ## Exclude tables without data
  declare -a excluded_tables=(
    "cache_advagg_minify"
    "cache_bootstrap"
    "cache_config"
    "cache_container"
    "cache_data"
    "cache_default"
    "cache_discovery"
    "cache_discovery_migration"
    "cache_dynamic_page_cache"
    "cache_entity"
    "cache_menu"
    "cache_migrate"
    "cache_page"
    "cache_render"
    "cache_rest"
    "cache_toolbar"
    "sessions"
    "watchdog"
    "webprofiler"
  )

  ignored_tables_string=''
  for table in "${excluded_tables[@]}"
  do
    ignored_tables_string+=" --ignore-table=${dbname}.${table}"
  done

  ## Dump structure
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host=${host} \
    --port=${port} \
    --protocol=TCP \
    --no-data \
    ${dbname} > backup_${BACKUP_ENV}.sql

  ## Dump content
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host=${host} \
    --port=${port} \
    --protocol=TCP \
    --no-create-info \
    --skip-triggers \
    ${ignored_tables_string} \
    ${dbname} >> backup_${BACKUP_ENV}.sql

  ## Patch out any MySQL 'SET' commands that require admin.
  sed -i 's/^SET /-- &/' backup_${BACKUP_ENV}.sql

} >/dev/null 2>&1

## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} >/dev/null 2>&1

## Clean up.
if [ ${BACKUP_ENV} = "prod" ]; then
  cf disable-ssh vote-drupal-${BACKUP_ENV}
fi
rm -rf backup.txt ~/.mysql
