(function (Drupal) {
    Drupal.behaviors.registrationTool = {
      attach: function () {
        document.getElementById('register').onsubmit = function (ev) {
          var stateSelected = document.getElementById('js-user-selection').value;
          var stateRelativePath = document.getElementById(stateSelected).attributes.data.value;
          if (stateSelected === 'default') {
            return false;
          } else {
            ev.preventDefault();
            window.location.href = stateRelativePath;
          }
        };
      },
    };
  })(Drupal);
  