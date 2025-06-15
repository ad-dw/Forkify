import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    searchResults: [],
    currentPage: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    let data = await getJSON(`${API_URL}/${id}?`);
    state.recipe = data.recipe;
    if (state.bookmarks.some((bmk) => bmk.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    state.search.currentPage = 1;
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

export const updateServingsData = function (newServing) {
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity / state.recipe.servings) * newServing)
  );
  state.recipe.servings = newServing;
};

export const addBookmark = function () {
  state.recipe.bookmarked = true;
  state.bookmarks.push(state.recipe);
};

export const removeBookmark = function (id) {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
};
