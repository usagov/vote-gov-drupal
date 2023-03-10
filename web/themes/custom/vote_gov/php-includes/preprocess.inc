<?php

/**
 * @file
 * Theme preprocess functions.
 */

/**
 * Implements hook_preprocess().
 */
function vote_gov_preprocess(&$variables) {
  // Set global variable for language.
  $language = Drupal::languageManager()->getCurrentLanguage()->getId();
  $variables['language'] = $language;

  // Set global variable for theme directory.
  $theme_path = \Drupal::request()->getBasePath() . '/' . \Drupal::service('extension.list.theme')->getPath('vote_gov');
  $variables['theme_path'] = $theme_path;

  // Set global variables for language name.
  $languagename = Drupal::languageManager()->getCurrentLanguage()->getName();
  $variables['languagename'] = $languagename;

  // Set global variable for site name.
  $sitename = Drupal::config('system.site')->get('name');
  $variables['sitename'] = $sitename;
}

/**
 * Implements hook_preprocess_page_title().
 */
function vote_gov_preprocess_page_title(&$variables) {

  $node = \Drupal::request()->attributes->get('node');

  if ($node && $node->bundle() == 'state_territory') {
    $variables['title'] = t('Register to vote in @title', ['@title' => $node->getTitle()]);
  }
}


