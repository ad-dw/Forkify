export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  try {
    let response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}?key=8b0ababc-fcc7-47ee-84ed-dcd1f8d52bea`
    );
    if (!response.ok)
      throw new Error(`${response.statusText}${response.status}`);
    let { data } = await response.json();
    state.recipe = data.recipe;
  } catch (err) {
    alert(err);
  }
};
