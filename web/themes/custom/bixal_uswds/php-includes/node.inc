<?php

/**
 * @file
 * Preprocess function for nodes.
 */

use Drupal\node\NodeInterface;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Implements hook_preprocess_node().
 */
function bixal_uswds_preprocess_node(&$vars) {
  // Define the node.
  $node = \Drupal::routeMatch()->getParameter('node');
  if ($node instanceof NodeInterface) {
    // Get $paragraph data inside the node.
    if ($node->getType() === "bx_landing_page") {
      // Query the components field on the landing page node.
      if (!empty($node->field_bx_components->getValue())) {
        foreach ($node->field_bx_components->getValue() as $key => $value) {
          $paragraph = FALSE;
          if (!empty($value['entity'])) {
            // Previewing.
            $paragraph = $value['entity'];
          }
          elseif (!empty($value['target_id'])) {
            // Full node, load the paragraph.
            $paragraph = Paragraph::load($value['target_id']);
          }

          // Instance of a $paragraph.
          if (!empty($paragraph) && $paragraph instanceof Paragraph) {
            // Define the entityTypeManager, slightly updated for D9.
            $entity_type_manager = \Drupal::entityTypeManager();
            $view_builder = $entity_type_manager->getViewBuilder('paragraph');
            $view_para = $view_builder->view($paragraph);
            $view_para['#cache']['tags'][] = 'node:' . $node->id();

            // If $paragraph bundle is bx_collection.
            if ($paragraph->bundle() === 'bx_collection') {
              // Get the settings.
              $collection_settings = $view_para["#paragraph"]->get("field_bx_collection_settings")->getString();
              // Now for each setting, create node template variables
              // from the $paragraph setting.
              switch ($collection_settings) {
                case 'media_thumbnail':
                  $vars['is_media_thumbnail'] = TRUE;
                  break;

                case 'headings_only':
                  $vars['is_headings_only'] = TRUE;
                  break;

                case 'calendar_display':
                  $vars['is_calendar_display'] = TRUE;
                  break;

                default:
              }
            }
          }
        }
      }
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for node().
 */
function bixal_uswds_theme_suggestions_node_alter(&$suggestions, array $vars): void {
  // Custom templates per view mode.
  if (!empty($vars["elements"]["#view_mode"])) {
    // Define the view mode on the node.
    $view_mode = $vars["elements"]["#view_mode"];

    // Custom theme suggestion for bx_collection.
    if ($view_mode === 'bx_collection') {
      $suggestions[] = $vars['theme_hook_original'] . '__' . 'uswds_collection';
    }

    // Custom theme suggestion for bx_card.
    if ($view_mode === 'bx_card') {
      $suggestions[] = $vars['theme_hook_original'] . '__' . 'uswds_card';
    }
  }
}
