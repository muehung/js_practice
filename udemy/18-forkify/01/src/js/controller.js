import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'


// from parcel !?
// if(module.hot) {
//   module.hot.accept()
// }

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
       // 可替換成 const recipeView = new recipeView(model.state.recipe);
      recipeView.render(model.state.recipe);
  }
  catch(err){
    recipeView.renderError();
  }
};


const controlSearchResults = async function(){
  try {

    resultView.renderSpinner();

    // 1) saerch 
    const query = searchView.getQuery();
    if(!query) return

    //2) load results
    await model.loadSearchResults(query);

    //3) Render results
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    //4) pagination
    paginationView.render(model.state.search); //array

  } catch(err) {
    console.log(err)
  }
}

const controlPagination = function(goToPage){

  //1) Render new results
  // resultView.render(model.state.search.result);
  resultView.render(model.getSearchResultPage(goToPage)); //array
  console.log()

  //2) pagination
  paginationView.render(model.state.search);
  model.state.search.page = 1; // init page
}


const controlServings = function(newServings){
  // Update the recipe number in state
  model.updateServings(newServings);
  
  // Update the recipe view
  recipeView.render(model.state.recipe);

}



// Publisher-Subscriber pattern
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateTo(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();