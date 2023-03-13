<?php

/**
 * @file
 * Defines custom tokens.
 */

use Drupal\Core\Render\BubbleableMetadata;

/**
 * Implements hook_token_info().
 */
function vote_utility_token_info() {
  // No token groups to define (this module adds tokens to the existing 'node'
  // token group).
  $types = [];
  // Define node-based tokens.
  $tokens['vote-utility--menu-path'] = [
    'name'        => t('Vote Utility - Menu path'),
    'description' => t('Provide a URL path fragment, based on the Menu location otherwise falls back on node title.'),
  ];

  return [
    'types'  => $types,
    'tokens' => [
      'node' => $tokens,
    ],

  ];
}

/**
 * Implements hook_tokens().
 */
function vote_utility_tokens($type, $tokens, array $data, array $options, BubbleableMetadata $bubbleable_metadata): array {
  $replacements = [];

  // Get new token replacement values for the 'node' token group.
  if ($type == 'node' && !empty($data['node'])) {

    /** @var \Drupal\node\NodeInterface $node */
    $node = $data['node'];

    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'vote-utility--menu-path':
          $replacements[$original] = vote_utility_get_menu_path($node);
          break;
      }
    }
  }

  return $replacements;
}

// @codingStandardsIgnore
/**
 * Get token replacement value, based on value of menu location on an entity otherwise fall back on node title.
 *\
function vote_utility_get_menu_path($node) {
// @codingStandardsIgnoreEnd

  /**
  * Define the menu token string value.
  *\

  $menu_token = '[node:menu-link:parents:join-path]/[node:menu-link:title]';

  /**
  * Set the default replacement value.
  *\

  $replacement_value = $node->getTitle();
// @codingStandardsIgnoreStart
  /**
  * If the menu IS enabled on this node set a new replacement value based on
  * the menu token.
  *\

// @codingStandardsIgnoreEnd
  if (!empty($node->menu['enabled'])) {
    $replacement_value = Drupal::token()
      ->replace($menu_token, ['node' => $node], ['clear' => TRUE]);
  }

  return $replacement_value;
}




