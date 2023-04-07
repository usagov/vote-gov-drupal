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
 * Implements hook_preprocess_HOOK().
 */
function vote_gov_preprocess_links__language_block(&$variables) {

  // Send the untranslated english language name to the template.
  if (isset($variables['currentnode'])) {
    $node = $variables['currentnode'];
    $languages = $node->getTranslationLanguages();

    foreach ($variables['links'] as $i => $link) {
      // Append the english language name after the translated one
      // if they are unique.
      if (isset($languages[$i])
          && $variables['links'][$i]['link']['#title'] != $languages[$i]->getName()) {
        $variables['links'][$i]['link']['#title'] .= " ({$languages[$i]->getName()})";
      }
    }
  }
}
