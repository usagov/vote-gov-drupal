<?php

namespace Drupal\translation_import_export\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Url;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns responses for Translation Import Export routes.
 */
class TranslationImportExportController extends ControllerBase {

  protected $entityTypeManager;

  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Builds the response.
   */
  public function build() {

    $entity_type = 'translation_package_request'; // Replace with your actual entity type.
    $entity = $this->entityTypeManager->getStorage($entity_type)->load($entity_id = 1);
    $request_type = $entity->getType();
    $request = $entity->getDecodedRequestSettings();

    // Test loading the plugins.
    // Example usage in a service.
    $translation_package_manager = \Drupal::service('plugin.manager.translation_package');

    //Create an instance of package manager type
    $package = $translation_package_manager->createInstance($request_type, ['request_type'=>'export','request'=>$request]);
    $package_deliverable = $package->process();
    
    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
    ];

    return $build;
  }

  
}
