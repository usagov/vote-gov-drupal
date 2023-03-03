<?php

/**
 * @file
 * Theme preprocess functions.
 */

/**
 * Implements hook_preprocess().
 */
function vote_gov_preprocess(&$variables) {
  // Set global variable for language.
  $language = Drupal::languageManager()->getCurrentLanguage()->getId();
  $variables['language'] = $language;
}
