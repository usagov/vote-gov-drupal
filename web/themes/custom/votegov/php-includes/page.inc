<?php

/**
 * @file
 * Preprocess function for page.
 */

/*
 * Implements hook_theme_suggestion_HOOK_alter().
 */
function votegov_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    $suggestions[] = "page__node__" . $node->bundle();
  }
}