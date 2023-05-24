<?php

/**
 * @file
 * Navigation-specific theming alterations.
 */

/**
 * Implements hook_theme_suggestions_main_alter().
 */
function vote_gov_theme_suggestions_menu_alter(array &$suggestions, array $variables) {
  $current_route = Drupal::service('current_route_match');
  $current_route_name = $current_route->getRouteName();
  // View route.
  if ($current_route_name == 'view.sitemap.page_1') {
    $suggestions[] = 'menu__main_' . strtr($current_route_name, '.', '_');
  }
}
