<?php

/**
 * @file
 * Defines custom form alter hooks.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vote_utility_form_node_state_territory_edit_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Hide override link fields from english edit form.
  $language = Drupal::languageManager()->getCurrentLanguage();
  if ($language->getId() == 'en') {
    $form['field_override_mail_reg_link']['#access'] = FALSE;
    $form['field_override_confirm_reg_link']['#access'] = FALSE;
    $form['field_override_election_hp_link']['#access'] = FALSE;
    $form['field_override_more_info_link']['#access'] = FALSE;
    $form['field_override_registration_link']['#access'] = FALSE;
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vote_utility_form_user_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Check if the user has the "content_translator" role.
  if (\Drupal::currentUser()->hasRole('content_translator')) {
    // Disable access to alter user profile settings.
    $form['language']['#disabled'] = TRUE;
    $form['account']['#disabled'] = TRUE;
    $form['actions']['#access'] = FALSE;
  }
}
