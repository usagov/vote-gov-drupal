<?php

/**
 * @file
 * Preprocess function for blocks.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter() for block().
 */
function vote_gov_theme_suggestions_block_alter(&$suggestions, array $vars): void {
  if (!empty($vars['elements']['#id'])) {
    // Pull in the block interface.
    /** @var \Drupal\block\BlockInterface $block */
    $block = \Drupal::entityTypeManager()
      ->getStorage('block')
      ->load($vars['elements']['#id']);

    if ($block) {
      // Add region-specific block theme suggestions.
      $region = $block->getRegion();
      $suggestions[] = 'block__region__' . $region;
      $suggestions[] = 'block__region__' . $region . '__' . 'plugin_id' . '__' . $vars['elements']['#plugin_id'];
      $suggestions[] = 'block__region__' . $region . '__' . 'id' . '__' . $vars['elements']['#id'];
    }
  }
}

/**
 * Implements hook_preprocess_block().
 */
function vote_gov_preprocess_block(&$variables) {
  $variables['content']['#attributes']['block'] = $variables['attributes']['id'];
}
