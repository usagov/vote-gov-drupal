<?php

/**
 * @file
 * Preprocess functions for pages.
 */

use Drupal\node\NodeInterface;

/**
 * Implements hook_preprocess_page().
 */
function bixal_uswds_preprocess_page(&$vars) {
  // Define the node.
  $node = \Drupal::routeMatch()->getParameter('node');
  // Add the module handler service.
  $moduleHandler = \Drupal::service('module_handler');
  // Load the site name from configuration.
  $config = \Drupal::config('system.site');

  // If twig_tweak is installed and enabled.
  if ($moduleHandler->moduleExists('twig_tweak')) {
    $vars['twig_tweak_enabled'] = TRUE;
  }

  // Set a var for the sitename.
  $vars['site_name'] = $config->get('name');

  // Check for a node instance.
  if ($node instanceof NodeInterface) {
    // If the page has a hero, unset the page
    // title as the hero will have a h1 tag.
    if ($node->hasField('field_bx_hero') &&
      !$node->get('field_bx_hero')->isEmpty()) {
      unset($vars['page']['help']['bixal_uswds_page_title']);
    }
  }
}
