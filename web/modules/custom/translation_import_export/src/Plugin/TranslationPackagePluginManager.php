<?php
namespace Drupal\translation_import_export\Plugin;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

/**
 * Provides the TranslationPackage plugin manager.
 */
class TranslationPackagePluginManager extends DefaultPluginManager {

  /**
   * Constructs a new TranslationPackagePluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct(
      'Plugin/TranslationPackage',
      $namespaces,
      $module_handler,
      'Drupal\translation_import_export\Plugin\TranslationPackagePluginInterface',
      'Drupal\translation_import_export\Annotation\TranslationPackage'
    );
    // Defines the hook_translation_package_info() function
    $this->alterInfo('translation_package_info');
    $this->setCacheBackend($cache_backend, 'translation_package_plugins');
  }

}