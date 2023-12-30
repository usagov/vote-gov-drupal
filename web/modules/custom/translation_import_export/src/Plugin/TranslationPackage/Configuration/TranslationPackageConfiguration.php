<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\Configuration;

use Drupal\translation_import_export\Plugin\TranslationPackagePluginBase;
use Drupal\translation_import_export\Plugin\TranslationPackagePluginInterface;

/**
 * Provides a translation package plugin.
 *
 * @TranslationPackage(
 *   id = "configurations",
 *   label = @Translation("Configurations Translation Package")
 * )
 */
class TranslationPackageConfiguration extends TranslationPackagePluginBase implements TranslationPackagePluginInterface {

  /**
   *
   */
  private $plugin_type = 'configuration';

  /**
   *
   */
  /**
   * The file extension will be set later.
   */
  private $default_export_filename = 'configuration';

  /**
   *
   */
  public function __construct($configuration, $plugin_id, $plugin_definition) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   *
   */
  public function getConfigurationId() {
    $value = '';
    if (!empty($this->getSource()['configuration_id'])) {
      $value = $this->getSource()['configuration_id'];
    }
    return $value;
  }

  /**
   *
   */
  public function getConfiguration() {
    $value = '';
    if (!empty($this->getSource()['configuration'])) {
      $value = $this->getSource()['configuration'];
    }
    return $value;
  }

  /**
   *
   */
  public function process() {
    if ('export' == $this->getRequestType()) {
      $exporter = \Drupal::service('translation_import_export.exporter.configuration');
      $exporter->export($this);
      return $exporter->getPackage();
    }
  }

  /**
   *
   */
  public function getFormFields(&$form, $form_state) {

    $form['configuration_id'] = [
      '#type' => 'textfield',
      '#title' => t('Configuration Name (YAML File Name)'),
      '#required' => FALSE,
      '#default_value' => $this->getConfigurationId(),
    ];
    $form['configuration'] = [
      '#type' => 'textarea',
      '#title' => t('Configuration'),
      '#required' => FALSE,
      '#default_value' => $this->getConfiguration(),
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
      'source' => [
        'configuration_id' => $form_state->getValue('configuration_id'),
        'configuration' => $form_state->getValue('configuration'),
      ],
      'langcode' => 'en',
    ];
    return json_encode($field_value);
  }

}
