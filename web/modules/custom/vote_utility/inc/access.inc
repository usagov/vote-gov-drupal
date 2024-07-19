<?php

/**
 * @file
 * Defines custom entity access behavior.
 */

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

function vote_utility_entity_access(EntityInterface $entity, $operation, AccountInterface $account)
{
  $langcode = Drupal::languageManager()->getCurrentLanguage()->getId();
  $restricted_entity_types = ['paragraph', 'taxonomy_term', 'node'];

  if ($account->isAnonymous()
    && in_array($entity->getEntityTypeId(), $restricted_entity_types)
    && !$entity->hasTranslation($langcode)) {
    $access = AccessResult::forbidden();
  } else {
    $access = AccessResult::neutral();
  }

  $access->addCacheableDependency($entity);
  return $access;
}
