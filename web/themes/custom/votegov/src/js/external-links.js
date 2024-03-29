/*
  Processing External Links
 */

(() => {

  // Enable external links behavior.
  const externalLinks = document.querySelectorAll('a[href^="https"]');
  const title_translated = Drupal.t('External link opens in new window');

  // Process external links.
  if (externalLinks.length) {
    for (let i = 0; i < externalLinks.length; i++) {
      externalLinks[i].classList.add('usa-link--external');
      externalLinks[i].setAttribute('target', '_blank');
      externalLinks[i].setAttribute('title', title_translated);
      externalLinks[i].setAttribute('rel', 'noreferrer');
    }
  }

})();
