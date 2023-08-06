import icons from '../../img/icons.svg';

export default class View {
    _data;
    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // When inserting HTML into a page by using insertAdjacentHTML be careful not to use user input that hasn't been escaped.???? from MDN
    }

    update(data) {
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
      // console.log(newElements);
      // console.log(curElements);

      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

        if(
          !newEl.isEqualNode(curEl) && 
          newEl.firstChild?.nodeValue.trim() !== ''
        ) {
          // console.log('!!!', newEl.firstChild.nodeValue.trim())
          curEl.textContent = newEl.textContent;
        }

        if(!newEl.isEqualNode(curEl)){
          // console.log(Array.from(newEl.attributes));
          Array.from(newEl.attributes).forEach(attr => 
            curEl.setAttribute(attr.name, attr.value))
        }

      });
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
        // // When inserting HTML into a page by using insertAdjacentHTML be careful not to use user input that hasn't been escaped. from MDN
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