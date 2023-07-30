class SearchView {
    #parentEl = document.querySelector('.search');

    getQuery(){
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#claerInput();
        return query;
    }

    #claerInput(){
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler){
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handler(); // 296. 20:45 control searchResults function
        })
    }
}

export default new SearchView();