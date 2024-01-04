<?php

namespace Drupal\translation_import_export\Form;

use Drupal\Core\Entity\ContentEntityDeleteForm;

/**
 * Provides a form for Translation Package Request type deletion.
 */
class TranslationPackageRequestDeleteForm extends ContentEntityDeleteForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'translation_package_request_delete_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getRedirectUrl() {
    return $this->entity->toUrl('collection');
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return $this->t('Deleting this Translation Package Request cannot be undone.');
  }

  /**
   * {@inheritdoc}
   */
  protected function getDeletionMessage() {
    return $this->t('The Translation Package Request been deleted.');
  }

}
