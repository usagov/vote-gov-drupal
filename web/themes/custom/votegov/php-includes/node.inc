<?php

/**
 * @file
 * Preprocess function for nodes.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function votegov_theme_suggestions_node_alter(&$suggestions, array $vars) {
  $node = $vars['elements']['#node'];

  // Add custom template suggestion based on state registration type.
  if ($node->bundle() === "state_territory") {
    $reg_type_array = $node->get('field_registration_type')->getValue();
    $reg_type = end($reg_type_array);
    $reg_type = str_replace(['-', ''], '_', $reg_type['value']);

    // Set node template suggestion for registration type.
    $suggestions[] = 'node__state_territory__' . $reg_type;
  }
}
