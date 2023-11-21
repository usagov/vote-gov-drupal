<?php

/**
 * @file
 * Preprocess function for nodes.
 */

use Drupal\node\NodeInterface;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Implements hook_theme_suggestions_HOOK_alter() for node().
 */
function votegov_theme_suggestions_node_alter(&$suggestions, array $vars, $hook) {
  $node = $vars['elements']['#node'];
  $reg_type_array = $node->get('field_registration_type')->getValue();
  $reg_type = strval(end($reg_type_array)['value']);
  $reg_type = str_replace('-', '', $reg_type);

  $suggestions[] = 'node__state_territory__' . $reg_type;

}
