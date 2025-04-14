<?php

/**
 * @file
 * Settings file for cloud.gov.
 */

$cf_application_data = json_decode(getenv('VCAP_APPLICATION') ?? '{}', TRUE);
$cf_service_data = json_decode(getenv('VCAP_SERVICES') ?? '{}', TRUE);

$application_environment = getenv('environment') ?? 'local';

$application_hostname = "https://" . $_SERVER['SERVER_NAME'];

$applicaiton_fqdn_regex = "^.+\.(app\.cloud\.gov|apps\.internal|vote\.gov)$";
$s3_proxy_path_cms = getenv('S3_PROXY_PATH_CMS') ?: '/s3/files';

$settings['tome_static_directory'] = dirname(DRUPAL_ROOT) . '/html';
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config/sync';
$settings['file_private_path'] = dirname(DRUPAL_ROOT) . '/private';

$settings['tome_static_path_exclude'] = [
  '/am/disabled-state-mail-in-forms',
  '/ar/disabled-state-mail-in-forms',
  '/bn/disabled-state-mail-in-forms',
  '/es/disabled-state-mail-in-forms',
  '/fr/disabled-state-mail-in-forms',
  '/ht/disabled-state-mail-in-forms',
  '/hi/disabled-state-mail-in-forms',
  '/ja/disabled-state-mail-in-forms',
  '/km/disabled-state-mail-in-forms',
  '/ko/disabled-state-mail-in-forms',
  '/nv/disabled-state-mail-in-forms',
  '/pt/disabled-state-mail-in-forms',
  '/ru/disabled-state-mail-in-forms',
  '/so/disabled-state-mail-in-forms',
  '/tl/disabled-state-mail-in-forms',
  '/vi/disabled-state-mail-in-forms',
  '/ypk/disabled-state-mail-in-forms',
  '/zh/disabled-state-mail-in-forms',
  '/zh-hans/disabled-state-mail-in-forms',
  '/am/state-data-points-index',
  '/ar/state-data-points-index',
  '/bn/state-data-points-index',
  '/es/state-data-points-index',
  '/fr/state-data-points-index',
  '/ht/state-data-points-index',
  '/hi/state-data-points-index',
  '/ja/state-data-points-index',
  '/km/state-data-points-index',
  '/ko/state-data-points-index',
  '/nv/state-data-points-index',
  '/pt/state-data-points-index',
  '/ru/state-data-points-index',
  '/so/state-data-points-index',
  '/tl/state-data-points-index',
  '/vi/state-data-points-index',
  '/ypk/state-data-points-index',
  '/zh/state-data-points-index',
  '/zh-hans/state-data-points-index',
  '/am/sitemap.xml',
  '/ar/sitemap.xml',
  '/bn/sitemap.xml',
  '/es/sitemap.xml',
  '/fr/sitemap.xml',
  '/ht/sitemap.xml',
  '/hi/sitemap.xml',
  '/ja/sitemap.xml',
  '/km/sitemap.xml',
  '/ko/sitemap.xml',
  '/nv/sitemap.xml',
  '/pt/sitemap.xml',
  '/ru/sitemap.xml',
  '/so/sitemap.xml',
  '/tl/sitemap.xml',
  '/vi/sitemap.xml',
  '/ypk/sitemap.xml',
  '/zh/sitemap.xml',
  '/zh-hans/sitemap.xml',
];

/**
 * Vote.gov addition to exclude entire directories.
 *
 * Don't include the trailing slash.
 */
$settings['vote_tome_static_path_exclude_directories'] = [
  '/node',
  '/taxonomy',
  '/saml',
  '/jsonapi',
];

$is_cloudgov = FALSE;

if (!empty($cf_application_data['space_name']) &&
    $application_environment != 'local') {
  switch ($application_environment) {
    case "dev":
      $is_cloudgov = TRUE;
      $server_http_host = 'cms-dev.vote.gov';
      break;

    case "prod":
      $is_cloudgov = TRUE;
      $server_http_host = 'cms.vote.gov';
      break;

    case "stage":
      $is_cloudgov = TRUE;
      $server_http_host = 'cms-stage.vote.gov';
      break;

    case "test":
      $is_cloudgov = TRUE;
      $server_http_host = 'cms-test.vote.gov';
      break;
  }
}

foreach ($cf_service_data as $service_list) {
  foreach ($service_list as $service) {

    if (stristr($service['name'], 'mysql')) {
      $databases['default']['default'] = [
        'database' => $service['credentials']['db_name'],
        'username' => $service['credentials']['username'],
        'password' => $service['credentials']['password'],
        'prefix' => '',
        'host' => $service['credentials']['host'],
        'port' => $service['credentials']['port'],
        'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
        'driver' => 'mysql',
        'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
      ];
    }
    elseif (stristr($service['name'], 'secrets')) {
      $settings['hash_salt'] = hash('sha256', $service['credentials']['hash_salt']);
      if (!empty($service['credentials']['newrelic_key'])) {
        $settings['new_relic_rpm.api_key'] = $service['credentials']['newrelic_key'];
        $config['new_relic_rpm.settings']['api_key'] = $service['credentials']['newrelic_key'];
      }
      $settings['cron_key'] = hash('sha256', $service['credentials']['cron_key']);
    }
    elseif (stristr($service['name'], 'storage')) {
      $settings['s3fs.access_key'] = $service['credentials']['access_key_id'];
      $settings['s3fs.secret_key'] = $service['credentials']['secret_access_key'];
      $config['s3fs.settings']['bucket'] = $service['credentials']['bucket'];
      $config['s3fs.settings']['region'] = $service['credentials']['region'];

      $config['s3fs.settings']['disable_cert_verify'] = FALSE;

      $config['s3fs.settings']['root_folder'] = 'cms';

      $config['s3fs.settings']['public_folder'] = 'public';
      $config['s3fs.settings']['private_folder'] = 'private';

      $config['s3fs.settings']['use_cname'] = TRUE;
      $config['s3fs.settings']['domain'] = $server_http_host . $s3_proxy_path_cms;
      $config['s3fs.settings']['domain_root'] = 'public';

      $config['s3fs.settings']['use_customhost'] = TRUE;
      $config['s3fs.settings']['hostname'] = $service['credentials']['fips_endpoint'];
      $config['s3fs.settings']['use-path-style-endpoint'] = FALSE;

      $config['s3fs.settings']['use_cssjs_host'] = FALSE;
      $config['s3fs.settings']['cssjs_host'] = '';

      $config['s3fs.settings']['use_https'] = TRUE;
      $settings['s3fs.upload_as_private'] = FALSE;
      $settings['s3fs.use_s3_for_public'] = TRUE;
      $settings['s3fs.use_s3_for_private'] = TRUE;
    }
  }
}

$settings['php_storage']['twig']['directory'] = '../storage/php';
$settings['cache']['bins']['data'] = 'cache.backend.php';
$settings['state_cache'] = TRUE;
$settings['trusted_host_patterns'][] = $applicaiton_fqdn_regex;

// SSO - SAML Auth Config.
$config['samlauth.authentication']['idp_certs'][] = getenv('sso_x509_cert');
$config['samlauth.authentication']['sp_private_key'] = getenv('sso_assertion_key');
$config['samlauth.authentication']['sp_x509_certificate'] = getenv('sso_assertion_cert');
// @todo DC - Move the following to config split for respective environments.
switch ($application_environment) {
  case "dev":
    $config['config_split.config_split.non_production']['status'] = TRUE;
    $config['samlauth.authentication']['sp_entity_id'] = 'dev.vote.gov';
    $config['samlauth.authentication']['idp_single_sign_on_service'] = 'https://auth-preprod.gsa.gov/app/gsauth-preprod_devvotegov_1/exkcups2fwc3wTcTO4h7/sso/saml';
    $config['samlauth.authentication']['idp_entity_id'] = 'http://www.okta.com/exkcups2fwc3wTcTO4h7';
    break;

  case "prod":
    $config['config_split.config_split.production']['status'] = TRUE;
    $config['samlauth.authentication']['sp_entity_id'] = 'cms.vote.gov';
    $config['samlauth.authentication']['idp_single_sign_on_service'] = 'https://auth.gsa.gov/app/gsauth_cmsvotegov_1/exkd51oit40ss1AdT4h7/sso/saml';
    $config['samlauth.authentication']['idp_entity_id'] = 'http://www.okta.com/exkd51oit40ss1AdT4h7';
    break;

  case "stage":
    $config['config_split.config_split.non_production']['status'] = TRUE;
    $config['samlauth.authentication']['sp_entity_id'] = 'cms-stage.vote.gov';
    $config['samlauth.authentication']['idp_single_sign_on_service'] = 'https://auth-preprod.gsa.gov/app/gsauth-preprod_cmsstagevotegov_1/exkcupw8ddWb0oqaP4h7/sso/saml';
    $config['samlauth.authentication']['idp_entity_id'] = 'http://www.okta.com/exkcupw8ddWb0oqaP4h7';
    break;

  case "test":
    $config['config_split.config_split.non_production']['status'] = TRUE;
    $config['samlauth.authentication']['sp_entity_id'] = 'cms-test.vote.gov';
    $config['samlauth.authentication']['idp_single_sign_on_service'] = 'https://auth-preprod.gsa.gov/app/gsauth-preprod_cmstestvotegov_1/exkcuoyewsWHvYili4h7/sso/saml';
    $config['samlauth.authentication']['idp_entity_id'] = 'http://www.okta.com/exkcuoyewsWHvYili4h7';
    break;
}
