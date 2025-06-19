import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON, postJSON, showToast } from "./helper";

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
    console.log(state.recipe);
    if (state.bookmarks.some((bmk) => bmk.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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

const persistBookmarks = function () {
  window.localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function () {
  state.recipe.bookmarked = true;
  state.bookmarks.push(state.recipe);
  persistBookmarks();
};

export const removeBookmark = function (id) {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
};

export const uploadRecipe = async function (recipe) {
  try {
    const ingredients = Object.entries(recipe)
      .filter((ele) => ele[0].includes("ingredient") && !!ele[1])
      .map((ing) => {
        const ingArr = ing[1].split(",");
        if (!ingArr.length === 3) showToast("Wrong ingredient format");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    if (ingredients.length !== 3) {
      showToast("The ingredient format is not correct. Pkease try again !!!");
      return;
    }

    const toUploadRecipe = {
      title: recipe.title,
      cooking_time: +recipe.cookingTime,
      image_url: recipe.image,
      servings: +recipe.servings,
      publisher: recipe.publisher,
      source_url: recipe.sourceUrl,
      ingredients,
    };

    const data = await postJSON(`${API_URL}?`, toUploadRecipe);
    if (data.status === "success") {
      showToast("Recipe uploaded successfully", "success");
    }
    state.recipe = data.data.recipe;
    addBookmark();
  } catch (err) {
    console.log(err);
    showToast(
      "OOps! some error occurred while uploading recipe. Please try again later."
    );
  }
};

const init = function () {
  const storageData = window.localStorage.getItem("bookmarks");
  if (!storageData) return;
  state.bookmarks = JSON.parse(storageData);
};
init();
