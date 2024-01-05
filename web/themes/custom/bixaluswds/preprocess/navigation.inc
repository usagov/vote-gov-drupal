<?php

/**
 * @file
 * Navigation-specific theming alterations.
 */

/**
 * Implements hook_theme_suggestions_main_alter().
 */
function bixaluswds_theme_suggestions_menu_alter(array &$suggestions, array $variables) {
  if (isset($variables['attributes']['block'])) {
    $block = str_replace(['block-', '-'], ['', '_'], $variables['attributes']['block']);
    $suggestions[] = 'menu__main__' . $block;
  }
}
