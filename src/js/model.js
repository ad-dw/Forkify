import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    searchResults: [],
    currentPage: 1,
  },
};

export const loadRecipe = async (id) => {
  try {
    let data = await getJSON(`${API_URL}/${id}?`);
    state.recipe = data.recipe;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    let data = await getJSON(`${API_URL}?search=${query}&`);
    state.search.searchResults = data.recipes;
  } catch (err) {
    throw err;
  }
};

export const currentPageResults = function (
  goToPage = state.search.currentPage
) {
  state.search.currentPage = goToPage;
  const start = (state.search.currentPage - 1) * RES_PER_PAGE;
  const end = state.search.currentPage * RES_PER_PAGE;
  return state.search.searchResults.slice(start, end);
};
