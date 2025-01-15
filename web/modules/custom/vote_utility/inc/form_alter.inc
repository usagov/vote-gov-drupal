<?php

/**
 * @file
 * Defines custom form alter hooks.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_alter().
 */
function vote_utility_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  if (isset($form['field_content_version'])) {
    $current_user = \Drupal::service('current_user');
    $roles = $current_user->getRoles();

    if (in_array('content_editor', $roles)) {
      // Hide content version field from content editors.
      $form['field_content_version']['#access'] = FALSE;
    }
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vote_utility_form_taxonomy_term_nvrf_field_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Change Name field label/description to improve editorial experience.
  $form['name']['widget'][0]['value']['#title'] = t('Administrative label');
  $form['name']['widget'][0]['value']['#description'] = t('This value is for identifying in Drupal and not used in the form display.');

  // Hide relations options to improve editorial experience.
  $form['relations']['#access'] = FALSE;
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function vote_utility_form_node_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Content types that are not user facing content pages.
  $non_content_bundles = [
    'node_nvrf_page_edit_form',
    'node_nvrf_page_form',
    'node_state_territory_edit_form',
    'node_state_territory_form',
  ];
  // Content types that are comprised of components.
  $landing_bundles = [
    'node_landing_edit_form',
    'node_landing_form',
  ];

  // Add help text for Title field.
  if (!in_array($form_id, $non_content_bundles)) {
    if (isset($form['title']) && $form['title']['#access']) {
      $form['title']['widget'][0]['value']['#description'] = [
        '#markup' => 'This field value will display on the page as a heading level 1. <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank">WCAG heading level guide</a>',
      ];

      // Provide alternative help for a landing page.
      if (in_array($form_id, $landing_bundles)) {
        $form['title']['widget'][0]['value']['#description'] = 'This field value will not display on the page. Add a Page Component that includes content that displays on the page as a heading level 1.';
      }
    }
  }
}

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
