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

// @codingStandardsIgnoreStart
/**
 * Get token replacement value, based on value of menu location on an entity otherwise fall back on node title.
 *
 *\

function vote_utility_get_menu_path($node) {

  /**
  * Define the menu token string value.
  *\

  $menu_token = '[node:menu-link:parents:join-path]/[node:menu-link:title]';

  /**
  * Set the default replacement value.
  *\

  $replacement_value = $node->getTitle();

  /**
  * If the menu IS enabled on this node set a new replacement value based on the menu token.
  *\

// @codingStandardsIgnoreEnd
  if (!empty($node->menu['enabled'])) {
    $replacement_value = Drupal::token()
      ->replace($menu_token, ['node' => $node], ['clear' => TRUE]);
  }

  return $replacement_value;
}


File,Line,Column,Type,Message,Source,Severity,Fixable
"/root/project/web/modules/custom/vote_utility/inc/token.inc",62,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",63,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",64,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",67,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",68,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",69,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",70,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",73,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",74,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",81,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",82,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",83,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",84,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",85,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",86,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",87,1,error,"Doc comment star missing",Drupal.Commenting.DocCommentStar.StarMissing,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",88,1,error,"Expected 1 newline at end of file; 0 found",Drupal.Files.EndFileNewline.NoneFound,5,1
"/root/project/web/modules/custom/vote_utility/inc/token.inc",88,1,error,"Wrong function doc comment end; expected \"*/\", found \"\"",Drupal.Commenting.DocComment.WrongEnd,5,0