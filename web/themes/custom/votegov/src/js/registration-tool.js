/*
  Dropdown functionality for state selector component.
 */

(() => {
  const stateComboBox = document.getElementById("vote-basic-tool__form");
  const stateInput = document.getElementById("vote-basic-tool__input");
  const stateResultsContainer = document.getElementById("vote-basic-tool__results");
  const stateFilteredOptions = stateComboBox ? stateResultsContainer.getElementsByTagName('a') : null;
  const noResultsMsg = document.getElementById("no-results");

  // Store dynamic filtered results.
  let stateListResults = [];

  // Show No Results Message
  function toggleResultsMessage(empty) {
    if (empty) {
      noResultsMsg.removeAttribute('hidden');
    } else {
      noResultsMsg.setAttribute('hidden', '');
    }
  }
  
  // Filter dropdown results based on user input.
  function stateListFilter() {
    let filter, txtValue, wordTxtValues, keyValue;
    filter = stateInput.value.toUpperCase().trim();
    txtValue = "";
    wordTxtValues = [];
    keyValue = "";
    stateListResults = [];

    for (let i = 0; i < stateFilteredOptions.length; i++) {
      let li = stateFilteredOptions[i].parentNode;
      txtValue = li.textContent.trim() || li.innerText.trim();
      wordTxtValues = txtValue.split(' ');
      keyValue = li.firstElementChild.getAttribute('key');

      // Match user input with the start of the state name or state abbrev.
      if (wordTxtValues.some((elem) => elem.length > 2 && elem.toUpperCase().startsWith(filter))
        || (filter.length === 2 && keyValue.toUpperCase() === filter)) {
        li.removeAttribute('hidden');
        stateListResults.push(stateFilteredOptions[i]);
      } else {
        li.setAttribute('hidden', '');
      }
    }

    toggleDataFiltered(filter);
    toggleResultsMessage(!stateListResults.length);
  }

  // Focus on previous option in dropdown.
  function stateListPrevious(option) {
    stateListResults.find((element, index) => {
      if (element === option) {
        if (index === 0) {
          stateInput.focus();
        }
        else {
          stateListResults[index - 1].focus();
        }
      }
    });
  }

  // Focus on next option in dropdown.
  function stateListNext(option) {
    stateListResults.find((element, index) => {
      if (element === option) {
        if (index === stateListResults.length - 1) {
          stateListResults[0].focus();
        }
        else {
          stateListResults[index + 1].focus();
        }
      }
    });
  }

  // Toggle data attribute on results container.
  function toggleDataFiltered(filter) {
    if (filter === '') {
      stateResultsContainer.removeAttribute('data-filtered');
    }
    else {
      stateResultsContainer.setAttribute('data-filtered', 'true');
    }
  }

  // Redirect user if value is an exact match to a option.
  function quickLinkToState(value) {
    stateListResults.find((element) => {
      let resultTxt = element.textContent || element.innerText;
      if (resultTxt.toUpperCase() === value) {
        window.location.href = element.href;
      }
    });
  }

  // Initialize event listeners if combobox loaded.
  if (stateComboBox) {
    stateComboBox.addEventListener('submit', (e) => {
      e.preventDefault();
      let value = stateInput.value.toUpperCase();
      quickLinkToState(value);
    })

    // Attach events for state input field.
    // stateInput.addEventListener('focus', stateListShow);
    stateInput.addEventListener('keydown', (e) => {
      if (e.key === "ArrowDown") {
        stateListResults[0].focus();
      }
    });
    stateInput.addEventListener('keyup', (e) => {
      if (e.key !== "ArrowDown") {
        stateListFilter();
      }
    });
    
    // Attach events for state links in dropdown.
    for (let i = 0; i < stateFilteredOptions.length; i++) {
      stateListResults.push(stateFilteredOptions[i]);
      stateFilteredOptions[i].addEventListener('keydown', (e) => {
        // stateFilteredOptions = stateResultsContainer.getElementsByTagName('a');
        if (e.key === "ArrowDown") {
          e.preventDefault();
          let option = stateFilteredOptions[i];
          stateListNext(option);
        }
      });

      stateFilteredOptions[i].addEventListener('keyup', (e) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          let option = stateFilteredOptions[i];
          stateListPrevious(option);
        }
      });
    }
  }

})();
