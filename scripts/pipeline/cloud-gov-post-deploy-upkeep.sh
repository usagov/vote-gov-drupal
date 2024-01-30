echo "Running upkeep..."
cf ssh ${project}-drupal-${CIRCLE_BRANCH} --command "PATH=/home/vcap/deps/1/bin:/home/vcap/deps/0/bin:/usr/local/bin:/usr/bin:/bin:/home/vcap/app/php/bin:/home/vcap/app/php/sbin:/home/vcap/app/php/bin:/home/vcap/app/vendor/drush/drush app/scripts/upkeep >/dev/null 2>&1"
