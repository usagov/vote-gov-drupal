<?php

/**
 * @file
 * Preprocess function for media.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter() for media().
 */
function bixal_uswds_theme_suggestions_media_alter(&$suggestions, array $vars): void {
  // Define the media view mode.
  $view_mode = $vars["elements"]["#view_mode"];
  // Array of view modes being used in CKEditor.
  $ckeditor_view_modes = [
    'bx_ckeditor_half_width',
    'bx_ckeditor_full_width',
    'bx_ckeditor_banner',
  ];
  // Array of view modes being used in components.
  $component_view_modes = [
    'bx_half_width',
    'bx_full_width',
    'bx_banner',
  ];

  // If in the array above, create a theme suggestion.
  if (!empty($vars["elements"]["field_media_image"])) {
    $image_field_type = $vars["elements"]["field_media_image"]["#field_type"];
    if ($image_field_type === 'image') {
      if (!empty($view_mode && in_array($view_mode, $ckeditor_view_modes))) {
        $suggestions[] = $vars['theme_hook_original'] . '__' . 'image_ckeditor';
      }

      // If in the array above, create a theme suggestion.
      if (!empty($view_mode && in_array($view_mode, $component_view_modes))) {
        $suggestions[] = $vars['theme_hook_original'] . '__' . 'image_component';
      }
    }
  }
}
