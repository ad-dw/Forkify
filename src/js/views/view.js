import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();
    this._data = data;
    const domMarkup = this._generateMarkup();
    this._parentEl.innerHTML = domMarkup;
  }

  render(data, shouldRender = true) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();
    this._data = data;
    const domMarkup = this._generateMarkup();
    if (!shouldRender) return domMarkup;
    this._parentEl.innerHTML = domMarkup;
  }

  update(data) {
    this._data = data;
    const newDomMarkup = this._generateMarkup();
    const newDOM = document
      .createRange()
      .createContextualFragment(newDomMarkup);
    const newElements = newDOM.querySelectorAll("*");
    const prevElements = this._parentEl.querySelectorAll("*");
    newElements.forEach((newEl, i) => {
      if (!newEl.isEqualNode(prevElements[i])) {
        if (newEl.firstChild?.nodeValue.trim() !== "")
          prevElements[i].textContent = newEl.textContent;
        Array.from(newEl.attributes).forEach((attribute) =>
          prevElements[i].setAttribute(attribute.name, attribute.value)
        );
      }
    });
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
