import View from '../views/View.js'
import icons from '../../img/icons.svg';

class resultView extends View {
    // 對應到 View.js 的 this._parentElement
    _parentElement = document.querySelector('.results');
    _errorMsg = '沒有搜尋到，請再試其他關鍵字！';

    _generateMarkup(){
        // console.log(this._data); // a Array
        return this._data.map(this._generateMarkupPreview).join('');
        
    }
    _generateMarkupPreview(result){
        const id = window.location.hash.slice(1);
        return `
            <li class="preview">
                <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.imgUrl}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <!-- <div class="preview__user-generated">
                            <svg>
                            <use href="${icons}#icon-user"></use>
                            </svg>
                        </div> -->
                </div>
                </a>
            </li>
        `
    }
}

export default new resultView();