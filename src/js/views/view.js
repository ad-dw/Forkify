import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();
    this._data = data;
    const recipeMarkup = this._generateMarkup();
    this._parentEl.innerHTML = recipeMarkup;
  }

  renderSpinner() {
    const loaderMarkup = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div> `;
    this._parentEl.innerHTML = loaderMarkup;
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._parentEl.innerHTML = errorMarkup;
  }
}
