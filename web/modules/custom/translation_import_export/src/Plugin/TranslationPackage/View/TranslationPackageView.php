<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\View;

use Drupal\translation_import_export\Plugin\TranslationPackagePluginBase;
use Drupal\translation_import_export\Plugin\TranslationPackagePluginInterface;
use Drupal\translation_import_export\Form\ViewPackageRequestForm;
/**
 * Provides a translation package plugin.
 *
 * @TranslationPackage(
 *   id = "view",
 *   label = @Translation("View Translation Package")
 * )
 */
class TranslationPackageView extends TranslationPackagePluginBase implements TranslationPackagePluginInterface {
    
  private $plugin_type = 'view';
  private $default_export_filename = 'view'; // The file extension will be set later

  public function __construct($view, $plugin_id, $plugin_definition) {
    parent::__construct($view, $plugin_id, $plugin_definition);
  }

  public function getViewName() {
    $value = '';
    if(!empty($this->getSource()['view_name'])) {
      $value = $this->getSource()['view_name'];
    }
    return $value;
  }

  public function getViewDisplayId() {
    $value = '';
    if(!empty($this->getSource()['view_display_id'])) {
      $value = $this->getSource()['view_display_id'];
    }
    return $value;
  }


  public function process() {
    if ('export' == $this->getRequestType()) {
      $exporter = \Drupal::service('translation_import_export.exporter.view');
      $exporter->export($this);
      return $exporter->getPackage();
    }
  }

  public function getFormFields(&$form, $form_state, $entity) {

    $form['view_name'] = [
      '#type' => 'textfield',
      '#title' => t('View'),
      '#required' => TRUE,
      '#default_value' => $this->getViewName(),
    ];
    $form['view_display_id'] = [
        '#type' => 'textfield',
        '#title' => t('View Display Id'),
        '#required' => TRUE,
        '#default_value' => $this->getViewDisplayId(),
    ];
    return $form;
  }

  public function prepFormFieldData($form_state) {
    $field_value = [
      'request_type' => $this->plugin_type,
      'instructions' => '',
      'source' => [
        'view_name' => $form_state->getValue('view_name'),
        'view_display_id' => $form_state->getValue('view_display_id'),
      ],
      'langcode' => 'en',
  ];
    return json_encode($field_value);
  }

  

}