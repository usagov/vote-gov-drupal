/*
 * Theme UI data attribute switcher
 * Example:
 *   <button
 *     class="vote-theme-btn"
 *     data-ui-switch-id="theme"
 *     data-values="default,contrast"
 *     type="button"
 *   >Toggle Theme</button>
 */

(() => {
  const switchBtn = document.querySelectorAll("button[data-ui-switch-id]");
  const targetContainer = document.documentElement;

  function switchInit(item) {
    const id = item.getAttribute('data-ui-switch-id');
    let values = item.getAttribute('data-values');
    let currentIndex = 0;

    if (id && values) {
      const storedSwitch = sessionStorage.getItem(id);
      const attr =  `data-${id}`;
      // Split the string value into an array of values
      values = values.trim().split(/,\s*/);

      function switchTrigger() {
        // once function is called move to the next item in themes array and then loop back at the end of the list
        currentIndex = (currentIndex + 1) % values.length;
        targetContainer.setAttribute(attr, values[currentIndex]);
        // set theme selection in local storage
        sessionStorage.setItem(id, values[currentIndex]);
      }

      if (storedSwitch) {
        // Set the current theme index based on the stored value
        let storedValue = currentIndex = values.indexOf(storedSwitch);
        targetContainer.setAttribute(attr, values[storedValue]);
      }

      item.addEventListener('click', switchTrigger);
    }
  }

  switchBtn.forEach(switchInit);
})();
