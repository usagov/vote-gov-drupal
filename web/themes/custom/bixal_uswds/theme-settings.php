<?php

/**
 * @file
 * Functions to support theming in the bixal_uswds theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Allow themes to alter the theme-specific settings form.
 */
function bixal_uswds_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  $form['theme_custom']['settings'] = [
    '#type' => 'details',
    '#open' => TRUE,
    '#title' => 'Bixal USWDS Custom Settings',
    '#weight' => -1000,
  ];

  // Custom setting to enable browserSync locally.
  $form['theme_custom']['settings']['time_picker_style'] = [
    '#type' => 'select',
    '#required' => TRUE,
    '#options' => [
      'html5_time_picker' => 'HTML 5 time picker',
      'uswds_time_picker' => 'USWDS time picker',
    ],
    '#description' => t("Choose a time picker style, USWDS or standard HTML 5."),
    '#title' => 'Time picker style',
    '#default_value' => theme_get_setting('time_picker_style', 'bixal_uswds'),
  ];
}
