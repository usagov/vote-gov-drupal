<?php

/**
 * @file
 * Alterations for front-end forms.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter() for form templates.
 */
function bixaluswds_theme_suggestions_form_alter(array &$suggestions, array $vars): void {
  // General theme suggestion with form id.
  $suggestions[] = $vars['theme_hook_original'] . '__' . $vars['element']['#form_id'];
}
