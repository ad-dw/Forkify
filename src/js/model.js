import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    searchResults: "",
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
