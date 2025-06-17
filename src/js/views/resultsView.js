import previewView from "./previewView";
import View from "./view";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No results available for your query";

  _generateMarkup() {
    return this._data.map((el) => previewView.render(el, false)).join();
  }
}

export default new ResultsView();
