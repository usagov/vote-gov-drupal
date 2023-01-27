/**
 * Global JS functions.
 * @file
 */
// Always use "use strict";
"use strict";

(function (Drupal, drupalSettings, once) {
  Drupal.behaviors.uswdsGlobal = {
    attach: function (context, settings) {
      // Globals and functions.
      // Get current pathname from the url.
      const current_path = window.location.pathname;

      // Detect the "I am a keyboard user" key.
      // Check if the user is using keyboard navigation (tabbing) and if so, add a class.
      function handleFirstTab(event) {
        if (event.key === "Tab") {
          document.body.classList.add("user-is-tabbing");
          window.removeEventListener("keydown", handleFirstTab);
        }
      }

      // Remove <p>&nbsp;</p> function.
      function nbspCleaner(el) {
        if (el.innerHTML === '&nbsp;' || el.innerHTML === '') {
          el.parentNode.removeChild(el)
        }
      }

      // -------------------------------

      // Invoke handleFirstTab function.
      window.addEventListener("keydown", handleFirstTab);

      // -------------------------------

      // Remove p tags that have a &nbsp, invoke nbspCleaner.
      const elements = document.querySelectorAll('.node__content p');
      elements.forEach(nbspCleaner)

      // -------------------------------

      // Loop the main menu to find the is-active class and then add the USWDS3 class to it.
      const active_menu_items = once(
        "active-menu-item",
        context.querySelectorAll(".usa-nav__menu-link")
      );
      const active_menu_item = [...active_menu_items];
      active_menu_item.forEach((item) => {
        if (item.classList.contains("is-active")) {
          item.classList.add("usa-current");
        }
      });

      // -------------------------------

      // Inverse link
      const inverseLinkItems = once(
        "inverse-link",
        context.querySelectorAll([
          '.usa-summary-box a',
        ])
      );
      const inverseLinkItem = [...inverseLinkItems];
      inverseLinkItem.forEach((item) => {
        item.classList.add('usa-summary-box__link');
      });

      // -------------------------------

      // Add usa-link class to any links in drupal where we do not have
      // access to the actual HTML.
      // Add more classes to the array as needed.
      const body_link_items = once(
        "body-link",
        context.querySelectorAll([
          '.usa-alert__body a',
          '.node__content a',
          '.node__meta a',
        ])
      );
      const body_link_item = [...body_link_items];
      body_link_item.forEach((item) => {
        item.classList.add('usa-link');
      });

      // -------------------------------

      // USA sidebar navigation current item.
      // Select all the side navigation items on a given page.
      const sideMenuItems = once(
        "usa-current-sidenav",
        context.querySelectorAll(".usa-sidenav__item > a")
      );
      // Spread the array.
      const sideMenuItem = [...sideMenuItems];
      // Loop through any sidemenu items.
      sideMenuItem.forEach((item) => {
        const href = item.getAttribute('href');
        if (href === current_path) {
          item.classList.add("usa-current");
        }
      });

      // -------------------------------

    },
  };
})(Drupal, drupalSettings, once);
