import Fraction from "fraction.js";
import icons from "url:../../img/icons.svg";
import View from "./view";

class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");
  _message = "Start by searching for a recipe or an ingredient. Have fun!";

  _generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${
            this._data?.image_url
          }" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data?.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data?.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to=${
                this._data.servings - 1
              }>
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to=${
                this._data.servings + 1
              }>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._getIngredients()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data?.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data?.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  _getIngredients() {
    return this._data?.ingredients
      ?.map((ing) => {
        return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity
                    ? new Fraction(ing.quantity).toFraction(true)
                    : ""
                }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>`;
      })
      .join("");
  }

  renderInitialMessage() {
    const markup = `<div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${this._message}</p>
        </div>`;
  }

  addHandlerRenderer(handler) {
    ["load", "hashchange"].map((ev) => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".btn--tiny");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo <= 0) return;
      handler(updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentEl.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();
