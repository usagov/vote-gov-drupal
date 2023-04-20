#!/bin/bash

cf_env=$1

if [ "${cf_env}" == "prod" ]; then
  export cf_space=${prod_cf_space}
  export drupal_memory=${prod_drupal_memory}
elif [ "${cf_env}" == "stage" ]; then
  export cf_space=${stage_cf_space}
  export drupal_memory=${stage_drupal_memory}
elif [ "${cf_env}" == "test" ]; then
  export cf_space=${test_cf_space}
  [ -z "${cf_space}" ] && export cf_space=${CF_SPACE_DEV}
  export drupal_memory=${test_drupal_memory}
elif [ "${cf_env}" == "dev" ]; then
  export cf_space=${dev_cf_space}
  export drupal_memory=${dev_drupal_memory}
fi

echo "Logging into Cloud.gov..."
{
  cf login \
    -a https://api.fr.cloud.gov \
    -u ${cloudgov_username} \
    -p ${cloudgov_password} \
    -o ${cf_org} \
    -s ${cf_space} > login.log || login_error=1
} >/dev/null 2>&1

[ -n "${login_error}" ] && echo "Error logging into Cloud.gov!" && exit 1

echo "Login successful!"