/*
  Search bar functionality.
 */

(() => {
    let searchInputEl = document.getElementById("usa-search-input");

    function clearSearch() {
        searchInputEl.value='';
    }
    searchInputEl.addEventListener('blur', clearSearch)
})();
