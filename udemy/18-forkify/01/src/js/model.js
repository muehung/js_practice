// import { async } from 'regenerator-runtime'
import { API_URL, RESULT_PER_PAGE } from '../js/config'
import { getJSON } from '../js/helper'


export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultPerPage: RESULT_PER_PAGE,
    }
};

export const loadRecipe = async function(id){
    try {
        const data = await getJSON(`${API_URL}/${id}`);
        // console.log(data);

      const {recipe} = data.data;
      state.recipe = {
        id: recipe.id,
        imgUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        cookTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    //   console.log(state.recipe);
    }
    catch(err){
        console.error(`${err} !!!`);
        throw err;
    }

};


export const loadSearchResults = async function(query){
    try {
        state.search.query = query;
        const result = await getJSON(`${API_URL}?search=${query}`)
        // console.log(result);
        
        state.search.result = result.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                imgUrl: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title,
            }
        });

    }
    catch(err){
        console.error(`${err} !!!`);
        throw err;
    }
}

export const getSearchResultPage = function(currentePage = state.search.page){
    state.search.page = currentePage;
    const startItem = (currentePage - 1) * state.search.resultPerPage; 
    // start from array[0] * 10 items per page
    const endItem = currentePage * state.search.resultPerPage; 
    // on slice('', end) final choose array[9]

    return state.search.result.slice(startItem, endItem); 
    // .slice(): new a array (begin, end before)
}
