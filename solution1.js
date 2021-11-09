import recipes from "./recipes.js";
import { renderRecipes} from "./main.js";

// Etape 1 : récupérer les mots de 3 lettres minimum tappés par l'utilisateur
// Donnée d'entré : event sur la barre de recherche
// Donnée de sortie : variable récupérant le mot tappé

// Récupérer les éléments du DOM
const searchbar = document.getElementsByClassName("search__input")[0];
// Appliquer un event sur la barre de recherche pour récupérer le mot tappé en direct

let userword = "";



// Fonction match (entre un mot en minuscule et une chaine de caractère)
const matchInput = (String, inputword) => {
  if (String.toLowerCase().match(inputword)) {
    return true;
  } else {
    return false;
  }
};

searchbar.addEventListener("input", () => {
if(searchbar.value === ""){
    renderRecipes(recipes)
}
  if (searchbar.value.length >= 3) {
    // On passe userword en minuscule
    userword = searchbar.value.toLowerCase();

    const filteredrecipes = recipes.filter((recipe)=>{
        if (
            matchInput(recipe.name, userword) ||
            matchInput(recipe.description, userword) ||
            ( recipe.ingredients.forEach((ingredient) => {
              matchInput(ingredient.ingredient, userword)}))
          ) {
              return recipe
          }
    })

    renderRecipes(filteredrecipes)

  } else {
    userword = undefined;
    
  }
});


const recipesSection = document.getElementsByClassName("recipes")[0];
if (recipesSection.innerHTML === ""){
    console.log("Pas de recettes")
}
