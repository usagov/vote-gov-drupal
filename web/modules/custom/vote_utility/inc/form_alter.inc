<?php

/**
 * @file
 * Defines custom form alter hooks.
 */

/**
 * Implements hook_form_FORM_ID_alter().
 *
 */
function vote_utility_form_node_state_territory_edit_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id) {
//  dpm($form);
  // Hide override link fields from english edit form.
  $language = Drupal::languageManager()->getCurrentLanguage();
  if ($language->getId() == 'en') {
    $form['field_override_mail_reg_link']['#access'] = false;
    $form['field_override_confirm_reg_link']['#access'] = false;
    $form['field_override_election_hp_link']['#access'] = false;
    $form['field_override_more_info_link']['#access'] = false;
    $form['field_override_registration_link']['#access'] = false;
  }
}
