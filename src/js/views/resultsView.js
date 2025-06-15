import View from "./view";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No results available for your query";

  _generateMarkup() {
    return this._data.map((el) => this._getPreviewMarkup(el)).join();
  }

  _getPreviewMarkup(result) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
            <a class="preview__link ${
              id === result.id ? "preview__link--active" : ""
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image_url}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}

export default new ResultsView();
