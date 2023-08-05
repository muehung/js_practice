import View from '../views/View.js'
class SearchView extends View {
    _parentElment = document.querySelector('.search');

    getQuery(){
        const query = this._parentElment.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput(){
        this._parentElment.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler){
        this._parentElment.addEventListener('submit', function(e){
            e.preventDefault();
            handler(); // 296. 20:45 control searchResults function
        })
    }
}

export default new SearchView();