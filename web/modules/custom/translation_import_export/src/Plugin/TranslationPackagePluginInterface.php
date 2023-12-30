<?php

namespace Drupal\translation_import_export\Plugin;

use Drupal\Component\Plugin\PluginInspectionInterface;

#use Drupal\Component\Plugin\PluginBase;

/**
 * Provides a interface class for your plugin type.
 */
interface TranslationPackagePluginInterface extends PluginInspectionInterface {
  /**
   * Returns the label of the translation package.
   *
   * @return string
   *   The label of the translation package.
   */
  
  #public function getLabel();
  
}