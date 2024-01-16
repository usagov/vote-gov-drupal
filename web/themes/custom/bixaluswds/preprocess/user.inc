<?php

/**
 * @file
 * Theme and preprocess functions for users.
 */

/**
 * Implements theme_suggestions_user_alter() for user theming.
 */
function bixaluswds_theme_suggestions_user_alter(array &$suggestions, array $variables) {
  /** @var \Drupal\user\UserInterface $user */
  $user = $variables['elements']['#user'];
  $sanitized_view_mode = strtr($variables['elements']['#view_mode'], '.', '_');
  // Add view mode theme suggestions.
  if (!empty($user)) {
    $suggestions[] = 'user__' . $sanitized_view_mode;
  }
}
