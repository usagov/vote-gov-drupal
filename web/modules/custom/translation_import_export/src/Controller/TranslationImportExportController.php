<?php

namespace Drupal\translation_import_export\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns responses for Translation Import Export routes.
 */
class TranslationImportExportController extends ControllerBase {

  /**
   *
   */
  protected $entityTypeManager;

  /**
   *
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   *
   */
  public static function create(ContainerInterface $container) {
    return new static(
          $container->get('entity_type.manager')
      );
  }

  /**
   * Builds the response.
   */
  public function build() {

    // Replace with your actual entity type.
    $entity_type = 'translation_package_request';
    $entity = $this->entityTypeManager->getStorage($entity_type)->load($entity_id = 1);
    $request_type = $entity->getType();
    $request = $entity->getDecodedRequestSettings();

    // Test loading the plugins.
    // Example usage in a service.
    $translation_package_manager = \Drupal::service('plugin.manager.translation_package');

    // Create an instance of package manager type.
    $package = $translation_package_manager->createInstance($request_type, ['request_type' => 'export', 'request' => $request]);
    $package_deliverable = $package->process();

    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
    ];

    return $build;
  }

  /**
   *
   */
  public function importOverview($langcode, $filename) {
    // Im thinking that we need an importer class to centralize
    // common handling across importers.
    // Maybe we can load some additional annotations for the plugin
    // to include import template names amongst other useful info.
    // Load the file content to get information to determine what
    // we should do and display.
    // move this to settings/config.
    $directory_path = DRUPAL_ROOT . '/../translation_imports';
    $file_uri = $directory_path . '/' . $langcode . '/' . $filename . '.json';

    if (file_exists($file_uri)) {
      // All of this should move to a Class.
      $file_content = file_get_contents($file_uri);
      $received_package = json_decode($file_content, TRUE);
      $package_type = $received_package['package_type'];
      // Create an instance of package manager type.
      $translation_package_manager = \Drupal::service('plugin.manager.translation_package');
      $package = $translation_package_manager->createInstance($package_type,
        [
          'request_type' => 'import',
          'received_package' => $received_package,
        ],
      );
      $package->setLangcode($langcode);
      $import_preview = $package->getImporterPreview();
      return [
        '#theme' => 'translation_import_export_import_' . $package_type . '_overview',
        '#langcode' => $langcode,
        '#url_filename' => $filename,
        '#received_package' => $received_package,
        '#import_preview' => $import_preview,
      ];
    }
  }

  /**
   *
   */
  public function browseBuild() {
    // $mask = ExtensionDiscovery::PHP_FUNCTION_PATTERN;
    $mask = '/.*/';

    // Browse the directory.
    $directory_path = DRUPAL_ROOT . '/../translation_imports';
    $file_system = \Drupal::service('file_system');
    // Use file_scan_directory to get file objects.
    $files = $file_system->scanDirectory($directory_path, $mask, ['recurse' => TRUE]);

    $import_files = [];
    foreach ($files as $file) {
      // Lets extract the folder information.
      $file_uri = $file->uri;
      $langcode = explode('/', str_replace([$directory_path . '/', '/' . $file->filename], '', $file_uri))[0];

      if (empty($import_files[$langcode])) {
        $import_files[$langcode] = [
          'name' => \Drupal::languageManager()->getLanguageName($langcode),
          'files' => [],
        ];
      }

      $url_filename = str_replace('.json', '', $file->filename);
      $import_file_url = \Drupal::urlGenerator()->generateFromRoute('translation_package_request.import_overview', ['langcode' => $langcode, 'filename' => $url_filename]);
      $import_files[$langcode]['files'][] = [
        'file' => $file,
        'url'  => $import_file_url,
      ];
    }

    return [
      '#theme' => 'translation_import_export_imports_overview',
      '#import_files' => $import_files,
    ];
  }

  /**
   *
   */
  public function processImportBuild($langcode, $filename) {

    // Get the file for importing.
    $directory_path = DRUPAL_ROOT . '/../translation_imports';
    $file_uri = $directory_path . '/' . $langcode . '/' . $filename . '.json';

    if (file_exists($file_uri)) {

      $file_content = file_get_contents($file_uri);
      $received_package = json_decode($file_content, TRUE);
      $package_type = $received_package['package_type'];
      $package_data = $received_package['data_to_translate'];

      $translation_package_manager = \Drupal::service('plugin.manager.translation_package');

      // Create an instance of package manager type.
      $package = $translation_package_manager->createInstance($package_type, ['request_type' => 'import', 'received_package' => $received_package]);

      $package->setLangcode($langcode);
      return $package->getImporterResponse();
    }

  }

}
