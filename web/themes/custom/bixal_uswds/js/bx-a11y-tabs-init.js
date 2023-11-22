/**
 * a11y Tabs JS functions.
 * @file
 */
// Always use "use strict";
"use strict";

(function (Drupal, drupalSettings, once) {
  Drupal.behaviors.uswdsA11YTabsInit = {
    attach: function (context, settings) {
      // Initialize a11y tabs.
      window.addEventListener('DOMContentLoaded', () => {
        new A11yTabs('.c-tabs__list', '[role="tabpanel"]', 0);
      })
    },
  };
})(Drupal, drupalSettings, once);
