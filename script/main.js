import recipes from "./recipes.js";
import {
  matchInput,
  matchWithTable,
  FilterIngredientsList,
  FilterUstensilsList,
  FilterDevicesList,
  searchbaringredients,
  searchbardevices,
  searchbarustensils,
} from "./functions.js";

export const renderRecipes = (recipeTable) => {
  // Get DOM elements to insert recipes

  const recipesSection = document.getElementsByClassName("recipes")[0];
  const ingredientblue = document.querySelectorAll(".ingredient");
  const devicegreen = document.querySelectorAll(".device");
  const ustensilorange = document.querySelectorAll(".ustensil");
  const sectiontag = document.getElementById("tags");
  const closeTags = document.querySelectorAll(".btntag__cross-container");

  recipesSection.innerHTML = "";

  // Insérer dynamiquement le code html des recettes
  recipeTable.forEach((recipe) => {
    recipesSection.innerHTML += `<div class="recipe">
    <div class="recipe__picturecontainer"></div>
    <div class="recipe__description">
        <div class="recipe__description__titlecontainer">
            <h2 class="title">${recipe.name}</h2>
            <div class="recipe__description__timecontainer">
                <span class="recipe__description__time"><i class="far fa-clock"></i> ${recipe.time} min</span>
            </div>
        </div>
        <div class="recipe__description__detailscontainer">
            <ul class="recipe__description__detailscontainer__ingredients"></ul>
            <p class="recipe__description__detailscontainer__cooking">${recipe.description}</p>
        </div>
    </div>
</div>`;
  });

  // Récupérer le tableau d'ingrédients pour chaque recette

  const ingredientTables = recipeTable.map((r) => {
    return r.ingredients.map((i) => {
      if (i.quantity === undefined) {
        return `<li>${i.ingredient}</li>`;
      } else if (i.unit === undefined) {
        return `<li>${i.ingredient}: ${i.quantity}</li>`;
      } else {
        return `<li>${i.ingredient}: ${i.quantity}${i.unit}</li>`;
      }
    });
  });

  // Injecter les ingrédients, quantités et unités sous forme de balise <i> dans le code HTML

  const ingredientsLists = document.getElementsByClassName(
    "recipe__description__detailscontainer__ingredients"
  );
  ingredientsLists.innerHTML = "";

  for (let i = 0; i < ingredientsLists.length; i++) {
    ingredientsLists[i].innerHTML += ingredientTables[i];
  }

  // Récupérer la liste de tous les ingrédients sans doublons

  const getIngredientArray = () => {
    const allIngredientsTable = [];

    const ingredientsByRecipeTable = recipeTable.map((element) => {
      return element.ingredients.map((i) => {
        return i.ingredient;
      });
    });

    ingredientsByRecipeTable.forEach((element) => {
      element.forEach((i) => {
        allIngredientsTable.push(i);
      });
    });

    // Passer les ingrédients en minuscule
    let ingretiensToLowerCase = allIngredientsTable.map((i) => {
      return i.toLowerCase();
    });

    // Enlever les doublons et passer les premières lettres en majuscule

    const ingredientsArray = [...new Set(ingretiensToLowerCase)];
    const ingredients = ingredientsArray.map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    });
    return ingredients;
  };

  getIngredientArray();

  // Récupérer les 30 premiers ingrédients

  const getIngredientsShortListed = () => {
    const shortListedIngredients = getIngredientArray().slice(0, 30);
    return shortListedIngredients;
  };

  getIngredientsShortListed();

  // Injecter les données du tableau shortlisté dans le HTML

  let listofingredients = document.getElementById("ingredientslist");
  listofingredients.innerHTML = "";

  getIngredientsShortListed().forEach((i) => {
    listofingredients.innerHTML += `<li class=ingredient>${i}</li>`;
  });

  // Récupérer la liste de tous les appareils sans doublons
  const getDevicesArray = () => {
    const allDevicesTable = [];

    const devicesByRecipeTable = recipeTable.map((element) => {
      return element.appliance;
    });

    devicesByRecipeTable.forEach((element) => {
      return allDevicesTable.push(element);
    });

    // Passer les appareils en minuscule
    let devicesToLowerCase = allDevicesTable.map((i) => {
      return i.toLowerCase();
    });

    // Enlever les doublons et passer les premières lettres en majuscule

    const devicesArray = [...new Set(devicesToLowerCase)];
    const devices = devicesArray.map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    });
    return devices;
  };

  getDevicesArray();

  // Injecter les données du tableau des appareils dans le HTML

  let listofdevices = document.getElementById("deviceslist");
  listofdevices.innerHTML = "";

  getDevicesArray().forEach((i) => {
    listofdevices.innerHTML += `<li class=device>${i}</li>`;
  });

  // Récupérer la liste de tous les ustensils sans doublons
  const getUstensilsArray = () => {
    const allUstensilsTable = [];

    const ustensilsByRecipeTable = recipeTable.map((element) => {
      return element.ustensils;
    });

    ustensilsByRecipeTable.forEach((element) => {
      return element.forEach((u) => {
        return allUstensilsTable.push(u);
      });
    });

    // Passer les ustensils en minuscule
    let ustensilsToLowerCase = allUstensilsTable.map((i) => {
      return i.toLowerCase();
    });

    // Enlever les doublons et passer les premières lettres en majuscule

    const ustensilsArray = [...new Set(ustensilsToLowerCase)];
    const ustensils = ustensilsArray.map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    });
    return ustensils;
  };

  getUstensilsArray();

  // Injecter les données du tableau des ustensils dans le HTML

  let listofustensils = document.getElementById("ustensilslist");
  listofustensils.innerHTML = "";

  getUstensilsArray().forEach((i) => {
    listofustensils.innerHTML += `<li class=ustensil>${i}</li>`;
  });

  //// gérer le clique sur les chevrons

  const chevronupgreen = document.getElementById("chevron-up-green");
  const chevronuporange = document.getElementById("chevron-up-orange");
  const chevronupblue = document.getElementById("chevron-up-blue");
  const chevrondownblue = document.getElementById("chevron-down-blue");
  const chevrondowngreen = document.getElementById("chevron-down-green");
  const chevrondownorange = document.getElementById("chevron-down-orange");
  const listingredients = document.getElementById("list--blue");
  const listdevices = document.getElementById("list--green");
  const listustensils = document.getElementById("list--orange");
  const inputingredients = document.getElementById("searchingredients");
  const inputdevices = document.getElementById("searchdevices");
  const inputustensils = document.getElementById("searchustensils");
  const titleingredients = document.getElementById("btn-ingredient-text");
  const titledevices = document.getElementById("btn-device-text");
  const titleustensils = document.getElementById("btn-ustensil-text");

  const clickOnChevron = (chevronup, chevrondown, input, list, title) => {
    chevrondown.addEventListener("click", () => {
      chevronup.style.display = "flex";
      list.style.display = "flex";
      chevrondown.style.display = "none";
      input.style.display = "flex";
      title.style.display = "none";
    });

    chevronup.addEventListener("click", () => {
      chevrondown.style.display = "flex";
      list.style.display = "none";
      chevronup.style.display = "none";
      input.style.display = "none";
      title.style.display = "flex";
    });
  };

  clickOnChevron(
    chevronupblue,
    chevrondownblue,
    inputingredients,
    listingredients,
    titleingredients
  );
  clickOnChevron(
    chevronupgreen,
    chevrondowngreen,
    inputdevices,
    listdevices,
    titledevices
  );
  clickOnChevron(
    chevronuporange,
    chevrondownorange,
    inputustensils,
    listustensils,
    titleustensils
  );

  FilterIngredientsList(recipeTable);
  FilterDevicesList(recipeTable);
  FilterUstensilsList(recipeTable);

  // const DisplayOrRemoveATag = (nodeList) => {
  //   let tagsArray = [];

  //   // Affichage des tags
  //   nodeList.forEach((element) => {
  //     element.addEventListener("click", () => {
  //       let tagName = element.textContent;
  //       let tagType = element.className;
  //       let found = tagsArray.find((tag) => tag === tagName);

  //       switch (tagType) {
  //         case "ingredient":
  //           if (!found) {
  //             tagsArray.push(tagName);
  //             sectiontag.innerHTML += `<button class="btntag btntag--blue"><span class="btntag--span">${tagName}</span>
  //               <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
  //             </button>`;
  //           } else {
  //             console.log("doublon");
  //           }
  //           break;

  //         case "device":
  //           if (!found) {
  //             tagsArray.push(tagName);
  //             sectiontag.innerHTML += `<button class="btntag btntag--green"><span class="btntag--span">${tagName}</span>
  //               <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
  //             </button>`;
  //           } else {
  //             console.log("doublon");
  //           }
  //           break;

  //         case "ustensil":
  //           if (!found) {
  //             tagsArray.push(tagName);
  //             sectiontag.innerHTML += `<button class="btntag btntag--orange"><span class="btntag--span">${tagName}</span>
  //               <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
  //             </button>`;
  //           } else {
  //             console.log("doublon");
  //           }
  //           break;

  //         default:
  //           console.log("error");
  //       }
  //     });
  //   });

  //   // Fermeture des tags
  //   closeTags.forEach((tag) => {
  //     tag.addEventListener("click", () => {
  //       console.log(tag);
  //       const tagTextContent = tag.parentNode.firstChild.textContent;
  //       let index = selectedTagsArray.indexOf(tagTextContent);
  //       selectedTagsArray.splice(index, 1);
  //       tag.parentNode.style.display = "none";
  //       return selectedTagsArray;
  //     });
  //   });
  // };

  // DisplayOrRemoveATag(ingredientblue);
  // DisplayOrRemoveATag(devicegreen);
  // DisplayOrRemoveATag(ustensilorange);

  return recipeTable;
};

renderRecipes(recipes);
