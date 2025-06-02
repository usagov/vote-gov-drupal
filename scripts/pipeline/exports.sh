#! /bin/bash

cf_env=$1

export composer_no_dev=1
if [ "${cf_env}" == "prod" ]; then
  export cf_space=${prod_cf_space}
  export cms_uri=${prod_cms_uri}
  export drupal_instances=${prod_drupal_instances}
  export drupal_memory=${prod_drupal_memory}
  export ssg_uri=${prod_ssg_uri}
  export sso_x509_cert=${prod_sso_x509_cert}
  export sso_assertion_cert=${prod_sso_assertion_cert}
  export sso_assertion_key=${prod_sso_assertion_key}
  export waf_name=${prod_waf_name}
  export waf_external_endpoint=${prod_waf_external_endpoint}
elif [ "${cf_env}" == "stage" ]; then
  export cf_space=${stage_cf_space}
  export cms_uri=${stage_cms_uri}
  export drupal_instances=${stage_drupal_instances}
  export drupal_memory=${stage_drupal_memory}
  export ssg_uri=${stage_ssg_uri}
  export sso_x509_cert=${stage_sso_x509_cert}
  export sso_assertion_cert=${stage_sso_assertion_cert}
  export sso_assertion_key=${stage_sso_assertion_key}
  export waf_name=${stage_waf_name}
  export waf_external_endpoint=${stage_waf_external_endpoint}
elif [ "${cf_env}" == "test" ]; then
  export cf_space=${test_cf_space}
  export cms_uri=${test_cms_uri}
  export drupal_memory=${test_drupal_memory}
  export drupal_instances=${test_drupal_instances}
  export ssg_uri=${test_ssg_uri}
  export sso_x509_cert=${test_sso_x509_cert}
  export sso_assertion_cert=${test_sso_assertion_cert}
  export sso_assertion_key=${test_sso_assertion_key}
  export waf_name=${test_waf_name}
  export waf_external_endpoint=${test_waf_external_endpoint}
elif [ "${cf_env}" == "dev" ]; then
  export cf_space=${dev_cf_space}
  export cms_uri=${dev_cms_uri}
  export drupal_instances=${dev_drupal_instances}
  export drupal_memory=${dev_drupal_memory}
  export ssg_uri=${dev_ssg_uri}
  export sso_x509_cert=${dev_sso_x509_cert}
  export sso_assertion_cert=${dev_sso_assertion_cert}
  export sso_assertion_key=${dev_sso_assertion_key}
  export waf_name=${dev_waf_name}
  export waf_external_endpoint=${dev_waf_external_endpoint}
fi
