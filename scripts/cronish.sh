#!/bin/bash 

while true
do
  echo "Running 'drush cron'..."
  drush --root=$HOME/web core:cron --uri=https://vote-drupal-test.app.cloud.gov  echo "'drush cron' task completed!"
  sleep 60m
done