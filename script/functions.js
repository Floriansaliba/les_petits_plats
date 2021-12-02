import recipes from "./recipes.js";
import { renderRecipes } from "./main.js";

export const searchbaringredients =
  document.getElementById("searchingredients");
export const searchbardevices = document.getElementById("searchdevices");
export const searchbarustensils = document.getElementById("searchustensils");

// // Afficher/ Fermer les Tags et retourner le tableau des tags

// export const AddTag = (targetNodeList, colorOfTag) => {
//   const sectiontag = document.getElementById("tags");
//   let selectedTags = [];

//   targetNodeList.forEach((element) => {
//     element.addEventListener("click", () => {
//       let found = selectedTags.find((String) => {
//         return String === element.textContent;
//       });
//       if (!found) {
//         selectedTags.push(element.textContent);
//         sectiontag.innerHTML += `<button class="btntag btntag--${colorOfTag}"><span class="btntag--span">${element.textContent}</span>
//             <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
//           </button>`;
//       } else {
//         console.log("doublon");
//       }
//       // Fermeture des Tags
//       const closeTags = document.querySelectorAll(".btntag__cross-container");

//       closeTags.forEach((tag) => {
//         tag.addEventListener("click", () => {
//           const tagTextContent = tag.parentNode.firstChild.textContent;
//           let index = selectedTags.indexOf(tagTextContent);
//           selectedTags.splice(index, 1);
//           tag.parentNode.style.display = "none";
//           return selectedTags;
//         });
//       });
//     });
//   });
//   return selectedTags;
// };

// Fonction permettant de filtrer un tableau de recettes si le titre, la description ou les ingrédients correspondent à un mot donné
// Inputs : un mot et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : OK

export const MainFilter = (wordToFind, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    let ingredients = recipe.ingredients;
    let ingredientTable = [];
    ingredients.forEach((ingr) => {
      ingredientTable.push(ingr.ingredient);
    });
    if (
      matchInput(recipe.name, wordToFind) ||
      matchInput(recipe.description, wordToFind) ||
      matchWithTable(ingredientTable, wordToFind)
    ) {
      return recipe;
      //
    } else {
      console.log("no match");
    }
  });
  console.log(filteredArray);
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les ingrédients correspondent à un mot donné
// Inputs : le nom de l'ingrédient et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : OK

export const FilterRecipesByIngredient = (ingredientName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    let ingredients = recipe.ingredients;
    let ingredientTable = [];
    ingredients.forEach((ingr) => {
      ingredientTable.push(ingr.ingredient);
    });
    if (matchWithTable(ingredientTable, ingredientName)) {
      return recipe;
      //
    } else {
      console.log("no match");
    }
  });
  console.log(filteredArray);
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les appareils correspondent à un mot donné
// Inputs : le nom de l'appareil et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : ok
export const FilterRecipesByDevice = (deviceName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchInput(recipe.appliance, deviceName)) {
      return recipe;
      //
    } else {
      console.log("no match");
    }
  });
  console.log(filteredArray);
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les appareils correspondent à un mot donné
// Inputs : le nom de l'appareil et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : ok
export const FilterRecipesByUstensil = (ustensilName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchWithTable(recipe.ustensils, ustensilName)) {
      return recipe;
      //
    } else {
      console.log("no match");
    }
  });
  console.log(filteredArray);
  return filteredArray;
};

// Fonction match (entre un mot en minuscule et une chaine de caractère), renvoit true ou false
// Inputs : 2 chaines de caractères
// Ouputs : retourne true or false
// Test de la foncttion : OK
export const matchInput = (string, inputword) => {
  return string.toLowerCase().match(inputword.toLowerCase()) ? true : false;
};

// Fonction match (entre un mot et un tableau de stings), renvoit true ou false
// Inputs : Un tableau de strings et une string de référence
// Ouputs : retourne true ou false
// Test de la fonction : OK
export const matchWithTable = (tableOfStrings, inputword) => {
  let newTable = [];
  tableOfStrings.forEach((string) => {
    newTable.push(string.toLowerCase());
  });
  tableOfStrings.forEach((string) => {
    string.toLowerCase();
  });
  let found = newTable.find((element) =>
    element.match(inputword.toLowerCase())
  );
  if (found != undefined) {
    return true;
  } else {
    return false;
  }
};

// Fonction permettant de récupérer le click sur un mot clef et filtrer un tableau de recette en fonction du nom du mot clef cliqué
// Inputs : Un tableau de recette et une nodeList d'ingrédients, appareils ou ustensils
// Outputs : retoure un Tableau Filtré et affiche les recettes correspondantes
// Test de la fonction : OK

export const FilterbyClick = (targetNodeList, recipeTable) => {
  let selectedKeyWord = "";
  targetNodeList.forEach((element) => {
    element.addEventListener("click", () => {
      selectedKeyWord = element.textContent;

      let elementName = element.textContent;

      switch (element.className) {
        case "ingredient":
          FilterRecipesByIngredient(elementName, recipeTable);
          renderRecipes(FilterRecipesByIngredient(elementName, recipeTable));
          break;

        case "device":
          FilterRecipesByDevice(elementName, recipeTable);
          renderRecipes(FilterRecipesByDevice(elementName, recipeTable));
          break;

        case "ustensil":
          FilterRecipesByUstensil(elementName, recipeTable);
          renderRecipes(FilterRecipesByUstensil(elementName, recipeTable));
          break;

        default:
          console.log("error");
      }
    });
  });
};

// Fonction de filtrage des ingrédients lorsque l'utilisateur tappe un ingrédient dans la barre de recherche
//*Input : Tableau de recettes
//*Output : Mise à jour des ingrédients affichés
// Test de la fonction : ok

export const FilterIngredientsList = (recipeTable) => {
  let ingredientword = "";
  let ingredientarray = [];
  let ingredientlist = document.getElementsByClassName("list--blue__ul")[0];

  searchbaringredients.addEventListener("input", () => {
    // Si le mot tappé est > à 1 caractère : on créé un tableau de recettes
    if (searchbaringredients.value.length >= 1) {
      const ingredientTables = recipeTable.map((r) => {
        return r.ingredients.map((i) => {
          return i.ingredient;
        });
      });

      // Récupérer les ingrédients en minuscules dans un tableau
      ingredientTables.forEach((table) => {
        table.forEach((i) => {
          ingredientarray.push(i.toLowerCase());
        });
      });

      // Modifier le tableau pour avoir la première lettre des ingrédients en majuscule
      const firstuppercaseletter = ingredientarray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });

      // Enlever les doublons pour récupérer les 123 ingrédients

      const ingredients = [...new Set(firstuppercaseletter)];

      // La variable ingredientword récupère la valeur de l'input en minuscule
      ingredientword = searchbaringredients.value.toLowerCase();

      // Créer un tableau d'ingrédient qui match la recherche
      const matchsearcharray = ingredients.filter((i) => {
        if (matchInput(i, ingredientword)) {
          return i;
        }
      });

      // si le tableau présente plus de 30 ingrédients, raccourcir la liste à 30 max
      matchsearcharray.length > 30
        ? matchsearcharray.slice(0, 30)
        : matchsearcharray;

      ingredientlist.innerHTML = "";
      console.log(ingredientlist);
      matchsearcharray.forEach((i) => {
        ingredientlist.innerHTML += `<li class="ingredient">${i}</li>`;
      });

      console.log(ingredientlist);
    }
  });
};

// Fonction de filtrage des Devices lorsque l'utilisateur tappe un appareil dans la barre de recherche
// *Input : Tableau de recette
// *Output : Mise à jour des appareils affichés
// Test de la fonction : ok

export const FilterDevicesList = (recipeTable) => {
  // Recherche complémentaire
  // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
  let deviceword = "";
  let devicearray = [];
  let devicelist = document.getElementsByClassName("list--green__ul")[0];

  searchbardevices.addEventListener("input", () => {
    if (searchbardevices.value.length >= 1) {
      const deviceTables = recipeTable.map((r) => {
        return r.appliance;
      });

      // Récupérer les appareils en minuscules dans un tableau
      deviceTables.forEach((device) => {
        devicearray.push(device.toLowerCase());
      });

      // Modifier le tableau pour avoir la première lettre des appareils en majuscule
      const firstuppercaseletter = devicearray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });

      // Enlever les doublons

      const devices = [...new Set(firstuppercaseletter)];

      // La variable ingredientword récupère la valeur de l'input en minuscule
      deviceword = searchbardevices.value.toLowerCase();

      // Créer un tableau d'appareils qui matchent la recherche
      const matchsearcharray = devices.filter((i) => {
        if (matchInput(i, deviceword)) {
          return i;
        }
      });

      // si le tableau présente plus de 30 appareils, raccourcir la liste à 30 max
      matchsearcharray.length > 30
        ? matchsearcharray.slice(0, 30)
        : matchsearcharray;

      devicelist.innerHTML = "";
      console.log(devicelist);
      matchsearcharray.forEach((i) => {
        devicelist.innerHTML += `<li class="device">${i}</li>`;
      });

      console.log(devicelist);
    }
  });
};

// Fonction de filtrages des ustensils lorsque l'utilisateur tappe un appareil dans la barre de recherche
// *Input : Tableau de recette
// *Output : Mise à jour des ustensils affichés
// Test de la fonction : ok

export const FilterUstensilsList = (recipeTable) => {
  // Recherche complémentaire
  // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
  let ustensilword = "";
  let ustensilarray = [];
  let ustensillist = document.getElementsByClassName("list--orange__ul")[0];

  searchbarustensils.addEventListener("input", () => {
    if (searchbarustensils.value.length >= 1) {
      const ustensilTables = recipeTable.map((r) => {
        return r.ustensils;
      });

      console.log(ustensilTables);

      // Récupérer les appareils en minuscules dans un tableau
      ustensilTables.forEach((ustensil) => {
        ustensil.forEach((u) => {
          ustensilarray.push(u.toLowerCase());
        });
      });

      // Modifier le tableau pour avoir la première lettre des appareils en majuscule
      const firstuppercaseletter = ustensilarray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });

      // Enlever les doublons

      const ustensils = [...new Set(firstuppercaseletter)];

      // La variable ingredientword récupère la valeur de l'input en minuscule
      ustensilword = searchbarustensils.value.toLowerCase();

      // Créer un tableau d'appareils qui matchent la recherche
      const matchsearcharray = ustensils.filter((i) => {
        if (matchInput(i, ustensilword)) {
          return i;
        }
      });

      // si le tableau présente plus de 30 ustenils, raccourcir la liste à 30 max
      matchsearcharray.length > 30
        ? matchsearcharray.slice(0, 30)
        : matchsearcharray;

      ustensillist.innerHTML = "";
      console.log(ustensillist);
      matchsearcharray.forEach((i) => {
        ustensillist.innerHTML += `<li class="ustensil">${i}</li>`;
      });

      console.log(ustensillist);
    }
  });
};
