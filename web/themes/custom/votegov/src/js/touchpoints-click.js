/*
  Second button interaction for triggering Touchpoints modal.
 */

(() => {
  const mobileModalButton = document.getElementById("vote-touchpoints-mobile--button");
  const mainModalButton = document.getElementById("vote-touchpoints--button");
  const closeMenuButton = document.getElementsByClassName("usa-nav__close");

  /*
    When mobile touchpoints button is clicked:
    1. Close the mobile menu
    2. Trigger the touchpoints mobile using the main button
  */

  mobileModalButton.addEventListener("click", function () {
    closeMenuButton[0].click();
    mainModalButton.click();
  });
})();
