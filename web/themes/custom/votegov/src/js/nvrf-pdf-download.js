// Download function for the NVRF Registration form selector block
(function (Drupal) {
  Drupal.behaviors.nvrfPdfDownload = {
    attach: function () {
      document.getElementById('register_form_download').onsubmit = function (ev) {
        ev.preventDefault();
        var languageSelected = document.getElementById('js-user-selection').value;
        window.open(languageSelected, '_blank');
      };
    },
  };
})(Drupal);
