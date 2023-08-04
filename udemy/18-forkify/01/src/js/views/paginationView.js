import View from "./View";
import icons from "./../../img/icons.svg";

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');

            this._clear;
            console.log(btn);
            if(!btn) return
            const goToPage = +btn.dataset.goto; // === Number(btn.dataset.goto)
            // console.log(goToPage);

            handler(goToPage);
        })
    }

    _generateMarkup() {

        const currentPage = this._data.page;

        // data = search results by controller
        const numPage = Math.ceil(this._data.result.length / this._data.resultPerPage);
        console.log('numPage:' + numPage, 'currentPage: ' + currentPage);

        //page 1 && others
        // 現在頁碼 === 1 && 所有頁碼 > 1
        if(currentPage === 1 && numPage > 1) {
            console.log('page 1 & others')
            return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        
        //page last 現在頁碼 === 所有頁碼
        if(currentPage === numPage && numPage > 1){
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `
        }

        // page 2 ~ others
        if(currentPage < numPage){
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }

        //page 1 no others
        console.log('page 1 only')
        return ''
    }
};

export default new paginationView();