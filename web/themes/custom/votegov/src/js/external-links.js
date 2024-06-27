/*
  Processing External Links
 */

(() => {

  // Enable external links behavior.
  // `extlinkjs-ignore` attribute should be added to all icons in order to not render the uswds external links icon
  const externalLinks = document.querySelectorAll('a[href^="https"]:not([extlinkjs-ignore])');
  const title_translated = Drupal.t('External link opens in new window');

  // Process external links.
  if (externalLinks.length) {
    for (let i = 0; i < externalLinks.length; i++) {
      externalLinks[i].classList.add('usa-link--external');
      externalLinks[i].setAttribute('target', '_blank');
      externalLinks[i].setAttribute('title', title_translated);
      if (!new URL(externalLinks[i].href).hostname.endsWith(".gov")) {
        externalLinks[i].setAttribute('rel', 'noreferrer');
      }
    }
  }

})();
