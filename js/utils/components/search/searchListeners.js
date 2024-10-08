import {
  SEARCH_KEY,
  searchForm,
  searchInput,
  navigateAway,
} from "/js/utils/general/constants.js";
import { gamesHTML } from "/js/utils/components/search/filterProducts.js";
import {
  clearSearchIconInit,
  updateSearchIconVisibility,
} from "/js/utils/components/search/clearSearch.js";
import { loadError } from "/js/utils/auth/messages.js";

export function setSearchListeners(info) {
  try {
    const clearSearchIcon = clearSearchIconInit();

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    searchInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.trim();
      searchTerm === "";
      localStorage.setItem(SEARCH_KEY, searchTerm);

      gamesHTML(info.data);
      updateSearchIconVisibility(clearSearchIcon);
    });

    if (clearSearchIcon) {
      clearSearchIcon.addEventListener("click", function () {
        searchInput.value = "";
        localStorage.removeItem(SEARCH_KEY);
        gamesHTML(info.data);
        updateSearchIconVisibility(clearSearchIcon);
      });
    }

    if (sessionStorage.getItem(navigateAway) === "true") {
      searchInput.value = "";
      localStorage.removeItem(SEARCH_KEY);
      sessionStorage.removeItem(navigateAway);
    } else {
      const searchTerm = localStorage.getItem(SEARCH_KEY) || "";
      searchInput.value = searchTerm;
      if (searchTerm !== "") {
        gamesHTML(info.data);
      }
      updateSearchIconVisibility(clearSearchIcon);
    }

    window.addEventListener("beforeunload", function () {
      sessionStorage.setItem(navigateAway, "true");
    });
  } catch (error) {
    loadError();
  }
}
