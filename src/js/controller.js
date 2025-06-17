import "core-js/stable";
import "regenerator-runtime/runtime";
import SearchView from "./views/searchView.js";
import RecipeView from "./views/recipeView.js";
import ResultsView from "./views/resultsView.js";
import PaginationView from "./views/paginationView.js";
import { showToast } from "./helper.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import Bookmarksview from "./views/bookmarksview.js";

if (module.hot) {
  module.hot.accept();
}

const getRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();
    ResultsView.update(model.currentPageResults());
    Bookmarksview.update(model.state.bookmarks);
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError(err.message);
    showToast(err.message);
  }
};

const getSearchResults = async function () {
  try {
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    ResultsView.render(model.currentPageResults());
    PaginationView.render(model.state.search);
  } catch (err) {
    showToast(err.message);
  }
};

const getPagination = function (goToPage) {
  ResultsView.render(model.currentPageResults(goToPage));
  PaginationView.render(model.state.search);
};

const updateRecipeServings = function (newServing) {
  model.updateServingsData(newServing);
  RecipeView.render(model.state.recipe);
};

const handleBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  Bookmarksview.render(model.state.bookmarks);
};

const handleLoadBookmark = function () {
  Bookmarksview.render(model.state.bookmarks);
};

const init = () => {
  Bookmarksview.addHandlerLoader(handleLoadBookmark);
  RecipeView.addHandlerRenderer(getRecipe);
  RecipeView.addHandlerUpdateServings(updateRecipeServings);
  RecipeView.addHandlerBookmark(handleBookmark);
  SearchView.addHandlerSearch(getSearchResults);
  PaginationView.addHandlerPagination(getPagination);
};
init();
