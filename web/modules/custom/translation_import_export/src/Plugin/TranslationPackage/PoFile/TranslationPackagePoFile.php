<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\PoFile;

use Drupal\translation_import_export\Plugin\TranslationPackagePluginBase;
use Drupal\translation_import_export\Plugin\TranslationPackagePluginInterface;

/**
 * Provides a translation package plugin.
 *
 * @TranslationPackage(
 *   id = "pofile",
 *   label = @Translation("Po File Translation Package")
 * )
 */
class TranslationPackagePoFile extends TranslationPackagePluginBase implements TranslationPackagePluginInterface {
  /**
   *
   */
  private $plugin_type = 'pofile';

  /**
   *
   */
  /**
   * The file extension will be set later.
   */
  private $default_export_filename = 'po';

  /**
   *
   */
  public function __construct($po_file, $plugin_id, $plugin_definition) {
    parent::__construct($po_file, $plugin_id, $plugin_definition);
  }

  /**
   *
   */
  public function process() {
    if ('export' == $this->getRequestType()) {
      $exporter = \Drupal::service('translation_import_export.exporter.po_file');
      $exporter->export($this);
      return $exporter->getPackage();
    }
  }

  /**
   *
   */
  public function getFormFields(&$form, $form_state, $disabled = FALSE) {

    $form['po_file_uri'] = [
      '#type' => 'textfield',
      '#title' => t('PO File URI'),
      '#required' => FALSE,
      '#disabled' => $disabled,
      '#default_value' => $this->getSource(),
    ];
    return $form;
  }

  /**
   *
   */
  public function prepFormFieldData($form_state) {
    $field_value = [
      'package_type' => $this->plugin_type,
      'instructions' => '',
      'source' => $form_state->getValue('po_file_uri'),
      'langcode' => 'en',
    ];
    return json_encode($field_value);
  }

}
