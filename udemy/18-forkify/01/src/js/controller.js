import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'



const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const getRecipe = async function(){
  try {
    const id = window.location.hash.slice(1);
    // const key = '48f4c4a2-7d2d-4960-befa-c155bb5fb999';
    if (!id) return;
    recipeView.renderSpinner();
    // 1) loading recipe
    await model.loadRecipe(id);

      // 2) Rendering recipe
       // render 自定義方法，給 View用，所有 View都將繼承此方法 by助教 292.
      recipeView.render(model.state.recipe);
      // 可替換成 const recipeView = new recipeView(model.state.recipe);???
      recipeView.render(model.state.recipe);
  }
  catch(err){
    alert(err)
  }
  
};

// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe)
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, getRecipe));

