import icons from '../../img/icons.svg';

export default class View {
    _data;
    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        console.log(this._parentElement);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // When inserting HTML into a page by using insertAdjacentHTML be careful not to use user input that hasn't been escaped.???? from MDN
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
        
        this._clear;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        // // When inserting HTML into a page by using insertAdjacentHTML be careful not to use user input that hasn't been escaped.???? from MDN
      };

    renderError(msg = this._errorMsg) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${msg}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}