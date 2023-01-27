/**
 * Range JS functions.
 * @file
 */
// Always use "use strict";
"use strict";

(function (Drupal, drupalSettings, once) {
  Drupal.behaviors.uswdsGlobal = {
    attach: function (context, settings) {

      // Calc avg / mean function.
      function calcAverage(array) {
        return (
          array.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          ) / array.length
        );
      }

      // Query all usa-range items.
      const form_ranges = once('usa-range', context.querySelectorAll('.usa-range'));

      if (form_ranges) {
        // Array reduce for all above.
        const form_range_item = [...form_ranges];
        // Loop all range sliders.
        form_range_item.forEach((range_item) => {

          // Define min / max and calc mean with the function.
          // Use Math.trunc to convert the "number" from a string to a number.
          const min = Math.trunc(range_item.getAttribute('min'));
          const max = Math.trunc(range_item.getAttribute('max'));
          const range_start_value = (calcAverage([min, max]))

          // Set the starting value when the page loads
          // as the mean between min and max.
          range_item.setAttribute('aria-valuenow', range_start_value)

          // Listen for a change on the slider and update it in real time.
          range_item.addEventListener("change", function () {
            this.setAttribute("aria-valuenow", this.value)
          })
        });
      }
    },
  };
})(Drupal, drupalSettings, once);
