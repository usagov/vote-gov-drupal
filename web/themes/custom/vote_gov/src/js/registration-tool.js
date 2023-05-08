(function (Drupal) {
    Drupal.behaviors.registrationTool = {
      attach: function (context, settings) {
        document.getElementById('register').onsubmit = function (ev) {
          var stateSelected = document.getElementById('js-user-selection').value;
          if (stateSelected === 'default') {
            return false;
          } else {
            ev.preventDefault();
            var redirectURL = 'http://vote-gov.lndo.site/register/';
            redirectURL = redirectURL + stateSelected + '/';
            window.location.href = redirectURL;
          }
        };
      },
    };
  })(Drupal);
  