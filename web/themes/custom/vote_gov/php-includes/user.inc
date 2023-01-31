<?php

/**
 * @file
 * Preprocess functions for users.
 */

/**
 * Implements theme_suggestions_user_alter() for user theming.
 */
function vote_gov_theme_suggestions_user_alter(array &$suggestions, array $variables) {
  $elements = $variables['elements'];
  if (isset($elements['#user'])) {
    array_splice($suggestions, 1, 0, 'user__' . $elements['#view_mode']);
  }
}
