#!/bin/bash

set -e

# Wait until drupal app is running
until [ cf app ${project}-drupal-${CIRCLE_BRANCH} | grep running ]
do
  sleep 1
done

# Enable SSH if in prod
if [ ${BACKUP_ENV} = "test" ]; then
  cf enable-ssh ${project}-drupal-${BACKUP_ENV}
  #cf restart --strategy rolling ${project}-drupal-${BACKUP_ENV}
fi

echo "Running post deploy steps..."
cf ssh ${project}-drupal-${CIRCLE_BRANCH} --command "PATH=/home/vcap/deps/1/bin:/home/vcap/deps/0/bin:/usr/local/bin:/usr/bin:/bin:/home/vcap/app/php/bin:/home/vcap/app/php/sbin:/home/vcap/app/php/bin:/home/vcap/app/vendor/drush/drush app/scripts/post-deploy >/dev/null 2>&1 && echo 'Successfully completed post deploy!' || echo 'Failed to complete post deploy!'"

## Clean up.
if [ ${BACKUP_ENV} = "prod" ]; then
  cf disable-ssh ${project}-drupal-${BACKUP_ENV}
fi
