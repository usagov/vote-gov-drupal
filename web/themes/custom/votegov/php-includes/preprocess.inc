<?php

/**
 * @file
 * Theme preprocess functions.
 */

/**
 * Implements hook_preprocess().
 */
function votegov_preprocess(&$variables) {
  // Set global variable for language.
  $language = Drupal::languageManager()->getCurrentLanguage();
  $variables['language'] = $language->getId();
  $variables['languagename'] = $language->getName();
  $variables['uswds_img_path'] = '/themes/custom/votegov/dist/assets/img';

  // Set global variable for theme directory.
  $theme_path = \Drupal::request()->getBasePath() . '/' . \Drupal::service('extension.list.theme')->getPath('votegov');
  $variables['theme_path'] = $theme_path;

  // Set global variable for site name.
  $sitename = Drupal::config('system.site')->get('name');
  $variables['sitename'] = $sitename;

  // Set variable for node object.
  $node = \Drupal::request()->attributes->get('node');
  if (!empty($node)) {
    $variables['currentnode'] = $node;
    // Check if current page is designated an error page.
    $system_errors = [
      404 => Drupal::config('system.site')->get('page.404'),
      403 => Drupal::config('system.site')->get('page.403'),
    ];

    foreach ($system_errors as $system_error) {
      if ($system_error == '/node/' . $node->id()) {
        $variables['status_code'] = 'error';
      }
    }
  }

  // Set variable for node title in english.
  $translated_entity = $node->getTranslation('en');
  $variables['title_english'] = $translated_entity->getTitle();

  // Set variable for frontpage.
  $variables['is_frontpage'] = \Drupal::service('path.matcher')->isFrontPage();

  // Load bengali numbers array.
  $path_to_file = __DIR__ . "/../json/translated-numbers.json";
  $variables['t_numbers'] = json_decode(file_get_contents($path_to_file), TRUE);
}

/**
 * Implements hook_preprocess_HOOK().
 */
function votegov_preprocess_links__language_block(&$variables) {

  // Send the untranslated english language names to the template.
  $original_language = \Drupal::languageManager()->getConfigOverrideLanguage();
  $en = \Drupal::languageManager()->getLanguage('en');
  \Drupal::languageManager()->setConfigOverrideLanguage($en);
  $languages = \Drupal::languageManager()->getLanguages();
  \Drupal::languageManager()->setConfigOverrideLanguage($original_language);

  foreach ($variables['links'] as $i => $link) {
    // Append the english language name after the translated one
    // if they are unique.
    if (isset($languages[$i])
      && $variables['links'][$i]['link']['#title'] != $languages[$i]->getName()) {
      $variables['links'][$i]['link']['#english'] = "({$languages[$i]->getName()})";
    }
  }
}
