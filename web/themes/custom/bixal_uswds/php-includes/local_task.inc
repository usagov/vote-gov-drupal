<?php

/**
 * @file
 * Preprocess function for local tasks.
 */

/**
 * Implements hook_preprocess_HOOK() for menu-local-task templates.
 */
function bixal_uswds_preprocess_menu_local_task(&$vars): void {
  $vars['link']['#options']['attributes']['class'][] = 'tabs__link';
  $vars['link']['#options']['attributes']['class'][] = 'js-tabs-link';

  // Ensure is-active class is set when the tab is active. The generic active
  // link handler applies stricter comparison rules than what is necessary for
  // tabs.
  if (isset($vars['is_active']) && $vars['is_active'] === TRUE) {
    $vars['link']['#options']['attributes']['class'][] = 'is-active';
  }

  if (isset($vars['element']['#level'])) {
    $vars['level'] = $vars['element']['#level'];
  }
}
