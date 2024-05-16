/*
  Toggle High Contrast mode 
 */

// function toggleHighContrast() {
//   const container = document.body;
//   const dataTheme = container.getAttribute("data-theme");
//   let theme = localStorage.getItem("data-theme");

// if (theme === "light") {
//   container.setAttribute("data-theme", "dark");
//   document.getElementById("night").style.display = "block";
//   document.getElementById("light").style.display = "none";
//   localStorage.setItem("data-theme", "dark");

// } else {

//   container.setAttribute("data-theme", "light");
//   document.getElementById("night").style.display = "none";
//   document.getElementById("light").style.display = "block";
//   localStorage.setItem("data-theme", "light");
//   }
// }

(() => {
  const contrastBtn = document.getElementById("high-contrast");
  const banner = document.querySelector('.usa-accordion');
  // Define a key for the local storage item
  const highContrastKey = 'highContrastEnabled'; 

  function toggleHighContrast() {
    // Check the current state of high contrast 
    const enabled = localStorage.getItem(highContrastKey) === 'true';
    // Update the local storage item based on the state and toggle between true and false
    localStorage.setItem(highContrastKey, !enabled);
    
    banner.classList.toggle('highContrast');

  }

  // Check if high contrast is already enabled
  if (localStorage.getItem(highContrastKey) === 'true') {
    banner.classList.add('highContrast');
  }

  contrastBtn.addEventListener('click', toggleHighContrast);
})();


