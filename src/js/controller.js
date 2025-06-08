import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getRecipe = async function () {
  let id = window.location.hash.slice(1);
  if (!id) return;
  RecipeView.renderSpinner();
  await model.loadRecipe(id);
  RecipeView.render(model.state.recipe);
};

["load", "hashchange"].map((ev) => window.addEventListener(ev, getRecipe));
