<?php

namespace Drupal\translation_import_export\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a TranslationPackage annotation object.
 *
 * @Annotation
 */
class TranslationPackage extends Plugin {
  /**
   *
   */
  public $id;

  /**
   * The human-readable name of the TranslationPackage type.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

  /**
   * A short description of the TranslationPackage type.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  // Public $description;.
}
