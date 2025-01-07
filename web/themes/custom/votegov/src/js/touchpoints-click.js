/*
  Second button interaction for triggering Touchpoints modal.
 */

(() => {
  const button = document.getElementById("vote-touchpoints-mobile--button");

  button.addEventListener("click", function () {
    document.getElementById('vote-touchpoints--button').click();
  });
})();
