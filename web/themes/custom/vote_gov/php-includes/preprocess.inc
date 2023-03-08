// Set global variables for language name.
$languagename = Drupal::languageManager()->getCurrentLanguage()->getName();
$variables['languagename'] = $languagename;

// Set global variable for site name.
$sitename = Drupal::config('system.site')->get('name');
$variables['sitename'] = $sitename;