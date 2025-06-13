import { getJSON, showToast } from "./helper";

export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  try {
    let data = await getJSON(id);
    state.recipe = data.recipe;
  } catch (err) {
    showToast(err.message);
  }
};
