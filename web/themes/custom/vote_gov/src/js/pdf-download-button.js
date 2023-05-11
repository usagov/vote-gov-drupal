(function (Drupal) {
  Drupal.behaviors.pdfDownloadButton = {
    attach: function () {
      document.getElementById('register').onsubmit = function (ev) {
        ev.preventDefault();
        var languageSelected = document.getElementById('js-user-selection').value;
        window.open(languageSelected, '_blank');
      };
    },
};
})(Drupal);