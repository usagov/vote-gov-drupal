<?php

/**
 * @file
 * Defines custom view alter hooks.
 */

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;

/**
 * Implements hook_taxonomy_term_view_alter().
 */
function vote_utility_taxonomy_term_view_alter(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display) {
  if ($entity->bundle() == 'basics_modules' && $display->getMode() == 'default') {
    // Disable cache for basics_modules using default display mode.
    $build['#cache']['max-age'] = 0;
  }
}
