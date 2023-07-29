export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    // const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce32?key=5b66d08e-6215-4435-972b-ae69787571ca'); // ../item'sID?key=MyId
      const data = await response.json();
      console.log(data);

      if(!response.ok) throw new Error(`${data.message} (${response.status})`);  

      // console.log(data.data);
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
      console.log(recipe);
    }
    catch(err){
        alert(err);
    }

}