<?php

/**
 * @file
 * Theme global preprocess functions.
 */

/**
 * Implements hook_preprocess().
 */
function bixaluswds_preprocess(&$variables) {
  // Set global variable for language.
  $language = Drupal::languageManager()->getCurrentLanguage();
  $variables['language'] = $language->getId();
  $variables['uswds_img_path'] = '/themes/custom/bixaluswds/dist/img';
}
