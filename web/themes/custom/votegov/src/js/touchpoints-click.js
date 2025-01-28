/*
  Second button interaction for triggering Touchpoints modal.
 */

(() => {
  const mobileModalButton = document.getElementById("vote-touchpoints-mobile--button");
  const mainModalButton = document.getElementById('vote-touchpoints--button');
  const closeButton = document.getElementsByClassName("usa-nav__close");

  mobileModalButton.addEventListener("click", function () {
    closeButton[0].click();
    mainModalButton.click();
  });
})();
