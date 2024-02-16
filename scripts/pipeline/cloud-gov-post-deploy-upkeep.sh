#!/bin/bash

set -e

# Enable SSH if in prod
if [ ${BACKUP_ENV} = "test" ]; then
  cf enable-ssh ${project}-drupal-${BACKUP_ENV}
  #cf restart --strategy rolling ${project}-drupal-${BACKUP_ENV}
fi

echo "Running upkeep..."
cf ssh ${project}-drupal-${CIRCLE_BRANCH} --command "PATH=/home/vcap/deps/1/bin:/home/vcap/deps/0/bin:/usr/local/bin:/usr/bin:/bin:/home/vcap/app/php/bin:/home/vcap/app/php/sbin:/home/vcap/app/php/bin:/home/vcap/app/vendor/drush/drush app/scripts/upkeep >/dev/null 2>&1 && echo 'Successfully completed upkeep!' || echo 'Failed to complete upkeep!'"

## Clean up.
if [ ${BACKUP_ENV} = "test" ]; then
  cf disable-ssh ${project}-drupal-${BACKUP_ENV}
fi
