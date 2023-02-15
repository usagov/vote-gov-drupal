<?php
$cf_application_data = json_decode(getenv('VCAP_APPLICATION') ?? '{}', TRUE);
$cf_service_data = json_decode(getenv('VCAP_SERVICES') ?? '{}', TRUE);

$application_environment = explode("-", $cf_application_data['space_name'])[count(explode("-", $cf_application_data['space_name'])) - 1] ?? 'local';

$application_hostname = "https://" . $_SERVER['SERVER_NAME'];

$applicaiton_fqdn_regex = "^.+\.app\.cloud\.gov$";

$settings['tome_static_directory'] = dirname(DRUPAL_ROOT) . '/html';
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';
$settings['file_private_path'] = "../private";

//$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config/sync';

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

/**
 * Collect external service information from environment.
 * Cloud Foundry places all service credentials in VCAP_SERVICES
 */

// 
// $SERVER_HTTP_HOST = $_SERVER['HTTP_HOST'];
// if (!empty($cf_application_data['space_name']) &&
//     in_array($cf_application_data['space_name'],
//              ['dev', 'stage', 'prod'])) {
//   switch (strtolower($cf_application_data['space_name'])) {
//     case "dev":
//       $SERVER_HTTP_HOST = 'https://cms-dev.vote.gov';
//       break;

//     case "stage":
//       $SERVER_HTTP_HOST = 'https://cms-stage.vote.gov';
//       break;

//     case "prod":
//       $SERVER_HTTP_HOST = 'https://cms.vote.gov';
//       break;
//   }
// }
$IS_CLOUDGOV=FALSE;

//$SERVER_HTTP_POST = $_SERVER['HTTP_HOST'] ?? '';

if (!empty($cf_application_data['space_name']) &&
    $application_environment != 'local') {
  switch ($application_environment) {
    case "dev":
      $IS_CLOUDGOV=TRUE;
      //$SERVER_HTTP_HOST = 'cms-dev.vote.gov';
      break;

    case "stage":
      $IS_CLOUDGOV=TRUE;
      //$SERVER_HTTP_HOST = 'cms-stage.vote.gov';
      break;

    case "prod":
      $IS_CLOUDGOV=TRUE;
      //$SERVER_HTTP_HOST = 'cms.vote.gov';
      break;
  }
  $SERVER_HTTP_HOST = $application_hostname;
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
        //'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
        //'driver' => 'mysql'
        'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
        'driver' => 'mysql',
        'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
      ];

      // if ( $IS_CLOUDGOV===TRUE ) {
      //   $databases['default']['default']['pdo'] = [
      //     \PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/rds-combined-ca-us-gov-bundle.pem',
      //     \PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => TRUE
      //   ];
      // }
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

      // $config['s3fs.settings']['use_cname'] = TRUE;
      // $config['s3fs.settings']['domain'] = $_SERVER['HTTP_HOST'] . '/sites/default/files';
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
      /*
      var_dump($config['s3fs.settings']);
      echo "\n\n";
      var_dump($settings);
      exit();
      */
    }
  }
}

$settings['php_storage']['twig']['directory'] = '../storage/php';

// CSS and JS aggregation need per dyno/container cache.
// This is from https://www.fomfus.com/articles/how-to-create-a-drupal-8-project-for-heroku-part-1
// included here without fully understanding implications:
$settings['cache']['bins']['data'] = 'cache.backend.php';

$settings['trusted_host_patterns'][] = $applicaiton_fqdn_regex;
//var_dump($settings['trusted_host_patterns']);

/*
if (!empty($application_environment)) {
  switch (strtolower($applicaiton_environment)) {
    case "local":
      $settings['trusted_host_patterns'][] = '^cms-local.usa.gov$';
      $settings['trusted_host_patterns'][] = '^cms-local-usagov.apps.internal$';
      break;

    case "dev":
      $settings['trusted_host_patterns'][] = '^cms-dev.vote.gov$';
      $settings['trusted_host_patterns'][] = '^cms-dev-usagov.apps.internal$';
      break;

    case "stage":
      $settings['trusted_host_patterns'][] = '^cms-stage.vote.gov$';
      $settings['trusted_host_patterns'][] = '^cms-stage-usagov.apps.internal$';
      break;

    case "prod":
      $settings['trusted_host_patterns'][] = '^cms.vote.gov$';
      $settings['trusted_host_patterns'][] = '^cms-prod-usagov.apps.internal$';
      break;
  }
}
*/
