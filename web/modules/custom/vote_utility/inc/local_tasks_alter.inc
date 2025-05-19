<?php

use \Drupal\Core\Cache\RefinableCacheableDependencyInterface;

/**
 * Implements hook_menu_local_tasks_alter().
 */
function vote_utility_menu_local_tasks_alter(&$data, $route_name, RefinableCacheableDependencyInterface &$cacheability) {
  // Get current user roles.
  $current_user = \Drupal::currentUser();
  $roles = $current_user->getRoles();

  if (in_array('content_manager', $roles) || in_array('content_editor', $roles)) {
    // Restrict access to blocks admin listing page for content roles.
    $data['tabs'][0]['entity.block_content.collection']['#access'] = FALSE;

    // Set cache trigger via role change.
    $cacheability->addCacheContexts([
      'user.roles',
    ]);
  }
}