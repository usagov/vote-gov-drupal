<?php

/**
 * @file
 * Settings file for cloud.gov.
**/

$cf_application_data = json_decode(getenv('VCAP_APPLICATION') ?? '{}', TRUE);
$cf_service_data = json_decode(getenv('VCAP_SERVICES') ?? '{}', TRUE);

$application_environment = explode("-", $cf_application_data['space_name'])[count(explode("-", $cf_application_data['space_name'])) - 1] ?? 'local';

$application_hostname = "https://" . $_SERVER['SERVER_NAME'];

$applicaiton_fqdn_regex = "^.+\.app\.cloud\.gov$";

$settings['tome_static_directory'] = dirname(DRUPAL_ROOT) . '/html';
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';
$settings['file_private_path'] = dirname(DRUPAL_ROOT) . '/private';
$settings['install_profile'] = 'minimal';

$settings['tome_static_path_exclude'] = [
  '/saml', '/saml/acs', '/saml/login', '/saml/logout', '/saml/metadata', '/saml/sls',
  '/jsonapi', '/jsonapi/deleted-nodes',
  '/es/saml', '/es/saml/acs', '/es/saml/login', '/es/saml/logout', '/es/saml/metadata', '/es/saml/sls',
  '/es/jsonapi', '/es/jsonapi/deleted-nodes',
];

if (getenv('NEW_RELIC_API_KEY')) {
  $settings['new_relic_rpm.api_key'] = getenv('NEW_RELIC_API_KEY');
  $config['new_relic_rpm.settings']['api_key'] = getenv('NEW_RELIC_API_KEY');
}

$is_cloudgov=FALSE;

if (!empty($cf_application_data['space_name']) &&
    $application_environment != 'local') {
  switch ($application_environment) {
    case "dev":
      $is_cloudgov=TRUE;
      // $server_http_host = 'cms-dev.vote.gov';
      break;

    case "stage":
      $is_cloudgov=TRUE;
      // $server_http_host = 'cms-stage.vote.gov';
      break;

    case "prod":
      $is_cloudgov=TRUE;
      // $server_http_host = 'cms.vote.gov';
      break;
  }
  $server_http_host = $application_hostname;
}

foreach ($cf_service_data as $service_list) {
  foreach ($service_list as $service) {

    if ( stristr($service['name'], 'mysql') ) {
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
    } else if ( stristr($service['name'], 'secrets') ) {
      $settings['hash_salt'] = $service['credentials']['HASH_SALT'];
    } else if ( stristr($service['name'], 'storage') ) {
      $settings['s3fs.access_key'] = $service['credentials']['access_key_id'];
      $settings['s3fs.secret_key'] = $service['credentials']['secret_access_key'];
      $config['s3fs.settings']['bucket'] = $service['credentials']['bucket'];
      $config['s3fs.settings']['region'] = $service['credentials']['region'];
      $config['s3fs.settings']['disable_cert_verify'] = FALSE;
      $config['s3fs.settings']['root_folder'] = '';
      $config['s3fs.settings']['public_folder'] = 'sites/default/files';
      $config['s3fs.settings']['private_folder'] = 'private';
      $config['s3fs.settings']['domain_root'] = 'public';
      $config['s3fs.settings']['use_customhost'] = FALSE;
      $config['s3fs.settings']['hostname'] = $service['credentials']['fips_endpoint'];
      $config['s3fs.settings']['use-path-style-endpoint'] = FALSE;
      $config['s3fs.settings']['use_cssjs_host'] = FALSE;
      $config['s3fs.settings']['cssjs_host'] = '';
      $config['s3fs.settings']['use_https'] = TRUE;
      $settings['s3fs.upload_as_private'] = FALSE;
      $settings['s3fs.use_s3_for_public'] = TRUE;
      $settings['s3fs.use_s3_for_private'] = FALSE;
    }
  }
}

$settings['php_storage']['twig']['directory'] = '../storage/php';
$settings['cache']['bins']['data'] = 'cache.backend.php';
$settings['trusted_host_patterns'][] = $applicaiton_fqdn_regex;
