#!/bin/bash

mv manifest.yml manifest.tmp
envsubst < manifest.tmp > manifest.yml

space=${CIRCLE_BRANCH}
[ "${CIRCLE_BRANCH}" = "test" ] && space="dev"

cf push

cf add-network-policy ${project}-drupal-${CIRCLE_BRANCH} ${proxy_name} -s ${proxy_space} --protocol tcp --port ${proxy_port}
cf add-network-policy ${waf_name} ${project}-drupal-${CIRCLE_BRANCH} -s "${project}-${space}" --protocol tcp --port ${drupal_port}
cf run-task ${project}-drupal-${CIRCLE_BRANCH} --command "./scripts/post-deploy" --name "${project}-${CIRCLE_BRANCH}-post-deploy"  -k "2G" -m "256M"
cf run-task ${project}-drupal-${CIRCLE_BRANCH} --command "ENV=${CIRCLE_BRANCH} scripts/build_static" --name "${project}-${CIRCLE_BRANCH}-tome"  -k "2G" -m "256M"