#!/bin/bash 

while true
do
  echo "Running 'drush cron'..."
  drush --root=$HOME/web core:cron
  echo "'drush cron' task completed!"
  sleep 60m
done