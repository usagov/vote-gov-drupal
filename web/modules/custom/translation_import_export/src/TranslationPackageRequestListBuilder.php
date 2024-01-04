<?php

namespace Drupal\translation_import_export;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of translation package request entities.
 *
 * @see \Drupal\translation_import_export\Entity\TranslationPackageRequest
 */
class TranslationPackageRequestListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['label'] = $this->t('Package Request');
    $header['description'] = $this->t('Description');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    $row['label'] = $entity->label();
    $row['description'] = $entity->getDescription();
    return $row + parent::buildRow($entity);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEntityIds() {
    $query = $this->getStorage()->getQuery()
      ->accessCheck(TRUE)
      ->sort($this->entityType->getKey('id'));

    // Only add the pager if a limit is specified.
    if ($this->limit) {
      $query->pager($this->limit);
    }
    return $query->execute();
  }

  /**
   * {@inheritdoc}
   */
  public function buildOperations(EntityInterface $entity) {
    $operations = [];
    $operations['edit'] = [
      'title' => $this->t('Edit'),
      'url' => Url::fromRoute('entity.translation_package_request.edit_form', ['translation_package_request' => $entity->id()]),
    ];
    $operations['preview'] = [
      'title' => $this->t('Preview Export'),
      'url' => Url::fromRoute('entity.translation_package_request.preview', ['translation_package_request' => $entity->id()]),
    ];
    $operations['delete'] = [
      'title' => $this->t('Delete'),
      'url' => Url::fromRoute('entity.translation_package_request.delete_form', ['translation_package_request' => $entity->id()]),
    ];

    return [
      '#type' => 'operations',
      '#links' => $operations,
    ];
  }

}
