import View from "./view";

class UploadRcipeView extends View {
  _parentEl = document.querySelector(".upload");
  _overlay = document.querySelector(".overlay");
  _recipeWindow = document.querySelector(".add-recipe-window");
  _btnOpenModal = document.querySelector(".nav__btn--add-recipe");
  _btnCloseModal = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }

  toggleModal() {
    this._overlay.classList.toggle("hidden");
    this._recipeWindow.classList.toggle("hidden");
  }

  _addHandlerOpenModal() {
    this._btnOpenModal.addEventListener("click", this.toggleModal.bind(this));
  }
  _addHandlerCloseModal() {
    this._btnCloseModal.addEventListener("click", this.toggleModal.bind(this));
    this._overlay.addEventListener("click", this.toggleModal.bind(this));
  }

  _addHandlerUploadRecipe(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      handler(data);
    });
  }
}

export default new UploadRcipeView();
