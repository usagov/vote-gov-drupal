#! /bin/bash

cf_env=$1

if [ "${cf_env}" == "prod" ]; then
  export cf_space=${prod_cf_space}
  export drupal_memory=${prod_drupal_memory}
  export waf_name=${prod_waf_name}
  export waf_external_endpoint=${prod_waf_external_endpoint}
elif [ "${cf_env}" == "stage" ]; then
  export cf_space=${stage_cf_space}
  export drupal_memory=${stage_drupal_memory}
  export waf_name=${stage_waf_name}
  export waf_external_endpoint=${stage_waf_external_endpoint}
elif [ "${cf_env}" == "test" ]; then
  export cf_space=${test_cf_space}
  export drupal_memory=${test_drupal_memory}
  export waf_name=${test_waf_name}
  export waf_external_endpoint=${test_waf_external_endpoint}
elif [ "${cf_env}" == "dev" ]; then
  export cf_space=${dev_cf_space}
  [ -z "${cf_space}" ] && export cf_space=${CF_SPACE_DEV}
  export waf_name=${dev_waf_name}
  export drupal_memory=${dev_drupal_memory}
  export waf_external_endpoint=${dev_waf_external_endpoint}
fi