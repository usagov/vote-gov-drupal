<?php

namespace Drupal\translation_import_export\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 *
 */
class TranslationPackageRequestPreviewForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'translation_package_request_preview_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $entity = $this->entity;
    $plugin_type = $entity->getType();
    $request = $entity->getDecodedRequestSettings();

    $translation_package_manager = \Drupal::service('plugin.manager.translation_package');
    $package = $translation_package_manager->createInstance($plugin_type, ['request_type' => 'export', 'request' => $request]);

    $form['admin_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Admin Name'),
      '#disabled' => TRUE,
      '#default_value' => $entity->getAdminName(),
    ];

    $form['description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Description'),
      '#disabled' => TRUE,
      '#default_value' => $entity->getDescription(),
    ];

    $package->getFormFields($form, $form_state, $disable = TRUE);

    $form['preview'] = [
      '#type' => 'textarea',
      '#title' => $this->t('JSON Output'),
      '#default_value' => $package->process(),
    ];

    $form['back'] = [
      '#type' => 'link',
      '#title' => $this->t('<< Back'),
      '#url' => $entity->toUrl('collection'),
      '#attributes' => [
        'class' => ['button'],
      ],
    ];

    return $form;

  }

}
