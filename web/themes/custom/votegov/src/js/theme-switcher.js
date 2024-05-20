/*
  Toggle High Contrast mode 
 */

(() => {
  const contrastBtn = document.getElementById("theme-btn");
  const themes = [ 'default', 'contrast' ]
  const container = document.body;
  let currentIndex = 0;

    function toggleTheme() {

      currentIndex = (currentIndex + 1) % themes.length;
      container.setAttribute("data-theme", themes[currentIndex]);

      localStorage.setItem('theme', themes[currentIndex]);

    }

    const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
    // Set the current theme index based on the stored value
    currentIndex = themes.indexOf(storedTheme);
    container.setAttribute("data-theme", themes[currentIndex]);
}
    
  contrastBtn.addEventListener('click', toggleTheme);
})();