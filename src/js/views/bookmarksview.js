import View from "./view";
import PreviewView from "./previewView.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  addHandlerLoader(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map((el) => PreviewView.render(el, false)).join();
  }
}

export default new BookmarksView();
