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

  // Set variable for node object.
  $node = \Drupal::request()->attributes->get('node');
  if (!empty($node)) {
    $variables['currentnode'] = $node;
  }
}

/**
 * Use language code for the language switcher
 */
function vote_gov_preprocess_links__language_block(&$variables) {

  //Set title to translated laguage name
  foreach ($variables['links'] as $i => $link) {
    $linkLanguage = $link['link']['#options']['language'];
    $variables['links'][$i]['link']['#title'] = $linkLanguage->getName();
  }

  //Append the title with the language name in English
  $node = $variables['currentnode'];
  $languages = $node->getTranslationLanguages();
  foreach ($languages as $i => $language) {
    //if translated lang name is different from english lang name
    if ($variables['links'][$i]['link']['#title'] != $language->getName() ) {
      $variables['links'][$i]['link']['#title'] = $variables['links'][$i]['link']['#title'] . " (" . $language->getName() . ")";
    }
  }
}
