import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from '../js/views/searchView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import searchView from '../js/views/searchView.js';





// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    // const key = '48f4c4a2-7d2d-4960-befa-c155bb5fb999';
    if (!id) return; // 每個食譜的 id
    recipeView.renderSpinner();
    // 1) loading recipe
    await model.loadRecipe(id);

      // 2) Rendering recipe
       // render 自定義方法，給 View用，所有 View都將繼承此方法 by助教 292.
      recipeView.render(model.state.recipe);
      // 可替換成 const recipeView = new recipeView(model.state.recipe);???
  }
  catch(err){
    // console.log(err);
    recipeView.renderError();
  }
  
};


const controlSearchResults = async function(){
  try {

    // 1) saerch 
    const query = searchView.getQuery();
    if(!query) return

    //2) load result
    await model.loadSearchResults(query);
    console.log(model.state.search)

  } catch(err) {
    console.log(err)
  }
}
controlSearchResults();

// Publisher-Subscriber pattern
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
}

init();