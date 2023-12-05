<?php

/**
 * @file
 * Views-specific theming alterations.
 */

/**
 * Implements hook_theme_suggestions_views_view_alter().
 */
function bixal_uswds_theme_suggestions_views_view_alter(array &$suggestions, array $vars) {
  $view = $vars['view'];
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id();
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->current_display;
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_views_view_unformatted_alter().
 */
function bixal_uswds_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $vars) {
  $view = $vars['view'];
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id();
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->current_display;
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_views_view_list_alter().
 */
function bixal_uswds_theme_suggestions_views_view_list_alter(array &$suggestions, array $vars) {
  $view = $vars['view'];
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id();
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->current_display;
  $suggestions[] = $vars['theme_hook_original'] . '__' . $view->id() . '__' . $view->current_display;
}
