import recipes from "./recipes.js";
import { renderRecipes } from "./main.js";
import {
  FilterRecipesByIngredient,
  FilterRecipesByDevice,
  FilterRecipesByUstensil,
  MainFilter,
  matchInput,
  matchWithTable,
  FilterbyClick,
} from "./functions.js";

// Récupérer les éléments du DOM

const searchbar = document.getElementsByClassName("search__input")[0];
const recipesection = document.getElementsByClassName("recipes")[0];
const ingredientblue = document.querySelectorAll(".ingredient");
const devicegreen = document.querySelectorAll(".device");
const ustensilorange = document.querySelectorAll(".ustensil");
const sectiontag = document.getElementById("tags");
const closeTags = document.querySelectorAll(".btntag__cross-container");

// Fonction de suivi des tags
const TagsFollowUp = () => {
  let tagsArray = [];

  ingredientblue.forEach((ingredient) => {
    ingredient.addEventListener("click", () => {
      let tagName = ingredient.textContent;
      let found = tagsArray.find((tag) => tag === tagName);

      if (!found) {
        tagsArray.push(tagName);
        sectiontag.innerHTML += `<button class="btntag btntag--blue"><span class="btntag--span">${tagName}</span>
        <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
      </button>`;
        console.log(tagsArray);
        return tagsArray;
      } else {
        console.log("doublon");
        return tagsArray;
      }
    });
  });

  devicegreen.forEach((device) => {
    device.addEventListener("click", () => {
      let tagName = device.textContent;
      let found = tagsArray.find((tag) => tag === tagName);

      if (!found) {
        tagsArray.push(tagName);
        sectiontag.innerHTML += `<button class="btntag btntag--green"><span class="btntag--span">${tagName}</span>
                <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
              </button>`;
        console.log(tagsArray);
        return tagsArray;
      } else {
        console.log("doublon");
        return tagsArray;
      }
    });
  });

  ustensilorange.forEach((ustensil) => {
    ustensil.addEventListener("click", () => {
      let tagName = ustensil.textContent;
      let found = tagsArray.find((tag) => tag === tagName);

      if (!found) {
        tagsArray.push(tagName);
        sectiontag.innerHTML += `<button class="btntag btntag--orange"><span class="btntag--span">${tagName}</span>
                <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
              </button>`;
        console.log(tagsArray);
        return tagsArray;
      } else {
        console.log("doublon");
        return tagsArray;
      }
    });
  });

  // Fermeture des tags

  closeTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      console.log(tag);
      const tagTextContent = tag.parentNode.firstChild.textContent;
      let index = TagsArray.indexOf(tagTextContent);
      tagsArray.splice(index, 1);
      tag.parentNode.style.display = "none";
      console.log(tagsArray);
    });
  });
  return tagsArray;
};

TagsFollowUp();

// Début du Scénario

const FirstFilter = () => {
  searchbar.addEventListener("input", () => {
    let userword = "";
    let input = searchbar.value;

    if (input.length >= 3) {
      userword = input;
      if (MainFilter(userword, recipes).length === 0) {
        recipesection.innerHTML = "";
        recipesection.innerHTML += `<p class="error"> Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc</p>`;
        return recipes;
      } else {
        console.log(MainFilter(userword, recipes));
        MainFilter(userword, recipes);
        renderRecipes(MainFilter(userword, recipes));
        return MainFilter(userword, recipes);
      }
    }
  });
};
FirstFilter();

// Fonction de recherche principale (via la barre de recherche principale) >> Retourne un tableau de recettes ou undefined

// const MainSearchFunction = () => {
//   searchbar.addEventListener("input", () => {
//     let userword = "";

//     // *cas ou la barre de recherche est vide (length === 0)                                                             OK
//     //       -On affiche toutes les recettes et on retourne le tableau des recettes                                      OK
//     if (searchbar.value.length === 0) {
//       renderRecipes(recipes);
//       return recipes;

//       // *cas où la barre de recherche est >= 3 caractères (length >=3)                                                  OK
//       //          -On créé un tableau filtré
//     } else if (searchbar.value.length >= 3) {
//       // la variable userword prend la valeur de l'input                                                                 OK
//       userword = searchbar.value;

//       const filteredrecipes = recipes.filter((recipe) => {
//         let ingredients = recipe.ingredients;
//         let ingredientTable = [];
//         ingredients.forEach((ingr) => {
//           ingredientTable.push(ingr.ingredient);
//         });
//         if (
//           matchInput(recipe.name, userword) ||
//           matchInput(recipe.description, userword) ||
//           matchWithTable(ingredientTable, userword)
//         ) {
//           return recipe;
//           //
//         } else {
//           console.log("no match");
//         }
//       });

//       // Si le tableau filtré n'est pas vide (length >0)    ----------------> on affiche les recettes du tableau et on retourne le tableau        OK

//       if (filteredrecipes.length > 0) {
//         renderRecipes(filteredrecipes);
//         FilterIngredientsList(filteredrecipes);
//         FilterUstensilsList(filteredrecipes);
//         FilterDevicesList(filteredrecipes);
//         return filteredrecipes;
//       }
//       //               * sinon ----------------------------------------------> Afficher message d'erreur et on retourne le tableau total des recettes  OK
//       else {
//         recipesection.innerHTML = "";
//         recipesection.innerHTML += `<p class="error"> Aucune recette ne correspond à votre critère… vous pouvez
//       chercher « tarte aux pommes », « poisson », etc</p>`;
//         return recipes;
//       }
//     }
//     // *cas ou la longeur de la barre de recherche est >0 et <3
//     //         - afficher toutes les recettes et retourner le tableau total des recettes
//     else {
//       userword = undefined;
//       renderRecipes(recipes);
//       return recipes;
//     }
//   });
// };
// MainSearchFunction();
