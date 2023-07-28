import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



const renderSpinner = function(parentEl){
  const temp = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', temp);
  // When inserting HTML into a page by using insertAdjacentHTML be careful not to use user input that hasn't been escaped.???? from MDN
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const getRecipe = async function(){
  try {
    const id = window.location.hash.slice(1);
    // const key = '48f4c4a2-7d2d-4960-befa-c155bb5fb999';

    if (!id) return;

    // 1) loading recipe
    renderSpinner(recipeContainer);

    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    // const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce32?key=5b66d08e-6215-4435-972b-ae69787571ca'); // ../item'sID?key=MyId
      const data = await response.json();
      console.log(data);

      if(!response.ok) throw new Error(`${data.message} (${response.status})`);  

      // console.log(data.data);
      let {recipe} = data.data;
      
      recipe = {
        id: recipe.id,
        imgUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        cookTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
      console.log(recipe)

      // 2) Rendering recipe

      const templateRecipe = `
      <figure class="recipe__fig">
          <img src="${recipe.imgUrl}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ing => {
            return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `
          })}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      `;
      
      recipeContainer.insertAdjacentHTML('afterbegin', templateRecipe);
  }
  catch(err){
    // console.log(err);
    alert(err)
  }
  
};

// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe)
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, getRecipe));

