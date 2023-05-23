#!/bin/bash

mv manifest.yml manifest.tmp
envsubst < manifest.tmp > manifest.yml

cf push
cf add-network-policy ${project}-drupal-${CIRCLE_BRANCH} ${proxy_name} -s ${proxy_space} --protocol tcp --port ${proxy_port}
cf add-network-policy ${waf_name} ${project}-drupal-${CIRCLE_BRANCH} -s "${project}-${CIRCLE_BRANCH}" --protocol tcp --port ${drupal_port}
cf run-task ${project}-drupal-${CIRCLE_BRANCH} --command "./scripts/post-deploy" --name "${project}-${CIRCLE_BRANCH}-post-deploy"  -k "2G" -m "256M"