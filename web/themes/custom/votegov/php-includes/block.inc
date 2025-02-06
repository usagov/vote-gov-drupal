<?php

/**
 * @file
 * Preprocess function for blocks.
 */

/**
 * Implements hook_preprocess_block().
 */
function votegov_preprocess_block(&$variables) {
  // Pass block id forward to be used in menu block template suggestion.
  if (isset($variables['attributes']['id'])) {
    $variables['content']['#attributes']['block'] = $variables['attributes']['id'];
  }
}
