#!/bin/bash

mv manifest.yml manifest.tmp
envsubst < manifest.tmp > manifest.yml

branch=${CIRCLE_BRANCH}
[ "${CIRCLE_BRANCH}" = "test" ] && branch="dev"

cf push
cf add-network-policy ${project}-drupal-${branch} ${proxy_name} -s ${proxy_space} --protocol tcp --port ${proxy_port}
cf add-network-policy ${waf_name} ${project}-drupal-${branch} -s "${project}-${branch}" --protocol tcp --port ${drupal_port}
cf run-task ${project}-drupal-${branch} --command "./scripts/post-deploy" --name "${project}-${branch}-post-deploy"  -k "2G" -m "256M"