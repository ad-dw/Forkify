import { RES_PER_PAGE } from "../config";
import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.currentPage;
    const numPages = Math.ceil(this._data.searchResults.length / RES_PER_PAGE);
    //page 1 with other pages
    if (curPage === 1) {
      return `<button data-goto=${
        curPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //other page

    if (curPage > 1 && curPage < numPages) {
      return `<button data-goto=${
        curPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <button data-goto=${
            curPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //last page
    if (curPage === numPages) {
      return `<button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    return "";
  }
}

export default new PaginationView();
