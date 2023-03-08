#!/bin/bash

kill_pids() {
  app=$1
  ids=$(ps aux | grep ${app} | grep -v grep | awk '{print $2}')
  for id in ${ids}; do
    kill -9 ${id}
  done
} &> /dev/null

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
cf connect-to-service --no-client vote-drupal-${RESTORE_ENV} vote-mysql-${RESTORE_ENV} > restore.txt &

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

} &> /dev/null

## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
kill_pids "connect-to-service"

## Clean up.
rm -rf restore.txt ~/.mysql backup_${BACKUP_ENV}.sql