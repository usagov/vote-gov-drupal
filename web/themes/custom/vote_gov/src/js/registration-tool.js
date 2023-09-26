  (function (Drupal) {
    Drupal.behaviors.nvrfPdfDownload = {
      attach: function (context, settings) {
        function filterStateList() {
          var input, filter, ul, li, a, i, txtValue;
          input = document.getElementById("state-input");
          filter = input.value.toUpperCase();
          ul = document.getElementById("results-list");
          li = ul.getElementsByTagName("li");
          for (i = 0; i < li.length; i++) {
              a = li[i].getElementsByTagName("a")[0];
              txtValue = a.textContent || a.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  li[i].style.display = "";
              } else {
                  li[i].style.display = "none";
              }
          }
        }
        
        function stateListVisible() {
          var x = document.getElementById("results-container");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        }
        
      },
    };
  })(Drupal);
  