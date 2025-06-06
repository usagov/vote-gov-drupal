#!/bin/bash

mv manifest.yml manifest.tmp
envsubst < manifest.tmp > manifest.yml

space=${CIRCLE_BRANCH}
[ "${CIRCLE_BRANCH}" = "test" ] && space="dev"

cf push >/dev/null 2>&1

cf add-network-policy ${project}-drupal-${CIRCLE_BRANCH} ${proxy_name} -s ${proxy_space} --protocol tcp --port ${proxy_port}
cf add-network-policy ${waf_name} ${project}-drupal-${CIRCLE_BRANCH} -s "${project}-${space}" --protocol tcp --port ${drupal_port}
