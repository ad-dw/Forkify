import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const getRecipe = async function () {
  let id = window.location.hash.slice(1);
  if (!id) return;
  RecipeView.renderSpinner();
  await model.loadRecipe(id);
  RecipeView.render(model.state.recipe);
};

const init = () => {
  RecipeView.addHandlerRenderer(getRecipe);
};
init();
