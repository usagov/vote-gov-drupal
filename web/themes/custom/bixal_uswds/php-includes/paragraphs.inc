<?php

/**
 * @file
 * Bixal USWDS Paragraphs file.
 */

/**
 * Implements hook_preprocess_paragraph().
 */
function bixal_uswds_preprocess_paragraph(&$vars) {
  // Define the $paragraph.
  $paragraph = $vars['elements']['#paragraph'];
  // Check for a $paragraph bundle.
  if (!empty($paragraph->bundle())) {
    // Define the bundle.
    $bundle = $paragraph->bundle();

    // If bundle type =.
    switch ($bundle) {
      case "bx_process_list_item":
        // Get the parent (host) $paragraph value and pass it down to the child.
        $host_value_title = $paragraph->getParentEntity()->field_bx_large_title->value;
        // If the value is checked.
        if ($host_value_title === '1') {
          // Set a template var.
          $vars['is_large_text'] = TRUE;
        }
        break;

      case "bx_card_item":
        // Get the parent (host) $paragraph values and pass down to the child.
        // These are all USWDS card variant settings.
        $host_value_title_pos_top = $paragraph->getParentEntity()->field_bx_card_title_pos->value;
        $host_value_flag = $paragraph->getParentEntity()->field_bx_flag->value;
        $host_value_flag_right = $paragraph->getParentEntity()->field_bx_flag_right->value;
        $host_value_media_inset = $paragraph->getParentEntity()->field_bx_media_inset->value;
        // Count the number of card items.
        $vars['card_count'] = count($paragraph->getParentEntity()->field_bx_card_item);
        // Check the booleans below.
        if ($host_value_title_pos_top === '1') {
          // Set a template var.
          $vars['is_title_position_top'] = TRUE;
        }

        if ($host_value_flag === '1') {
          // Set a template var.
          $vars['is_flag'] = TRUE;
        }

        if ($host_value_flag_right === '1') {
          // Set a template var.
          $vars['is_flag_right'] = TRUE;
        }

        if ($host_value_media_inset === '1') {
          // Set a template var.
          $vars['is_media_inset'] = TRUE;
        }
        break;

      default:
    }
  }
}
