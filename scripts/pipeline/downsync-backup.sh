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
    [ -n "$(grep 'Press Control-C to stop.' creds.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done 
}

## Create a tunnel through the application to pull the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client vote-drupal-${BACKUP_ENV} vote-mysql-${BACKUP_ENV} > creds.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
{
  host=$(cat creds.txt | grep -i host | awk '{print $2}')
  port=$(cat creds.txt | grep -i port | awk '{print $2}')
  username=$(cat creds.txt | grep -i username | awk '{print $2}')
  password=$(cat creds.txt | grep -i password | awk '{print $2}')
  dbname=$(cat creds.txt | grep -i '^name' | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql
  
  echo "[mysqldump]" > ~/.mysql/creds.cnf
  echo "user=${username}" >> ~/.mysql/creds.cnf
  echo "password=${password}" >> ~/.mysql/creds.cnf
  chmod 400 ~/.mysql/creds.cnf                
} &> /dev/null

echo "Backing up '${BACKUP_ENV}' database..."
mysqldump \
  --defaults-extra-file=~/.mysql/creds.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  ${dbname} > backup_${BACKUP_ENV}.sql

## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
kill_pids "connect-to-service"

rm -f creds.txt