<?php

/**
 * @file
 * Preprocess function for blocks.
 */

/**
 * Implements hook_preprocess_block().
 */
function votegov_preprocess_block(&$variables) {
  if (isset($variables['attributes']['id'])) {
    $variables['content']['#attributes']['block'] = $variables['attributes']['id'];
  }
}
