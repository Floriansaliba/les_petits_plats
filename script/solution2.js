import recipes from "./recipes.js";

export const renderRecipes = (recipeTable) => {
  // Get DOM elements to insert recipes

  const recipesSection = document.getElementsByClassName("recipes")[0];

  recipesSection.innerHTML = "";

  // Insérer dynamiquement le code html des recettes

  for (let i = 0; i < recipeTable.length; i++) {
    recipesSection.innerHTML += `<div class="recipe">
    <div class="recipe__picturecontainer"></div>
    <div class="recipe__description">
        <div class="recipe__description__titlecontainer">
            <h2 class="title">${recipeTable[i].name}</h2>
            <div class="recipe__description__timecontainer">
                <span class="recipe__description__time"><i class="far fa-clock"></i> ${recipeTable[i].time} min</span>
            </div>
        </div>
        <div class="recipe__description__detailscontainer">
            <ul class="recipe__description__detailscontainer__ingredients"></ul>
            <p class="recipe__description__detailscontainer__cooking">${recipeTable[i].description}</p>
        </div>
    </div>
</div>`;
  }

  // Récupérer le tableau d'ingrédients pour chaque recette

  const ingredientTables = [];
  for (let i = 0; i < recipeTable.length; i++) {
    const ingredients = recipeTable[i].ingredients;
    ingredientTables.push([]);
    for (let y = 0; y < ingredients.length; y++) {
      if (ingredients[y].quantity === undefined) {
        ingredientTables[i].push(
          `<li>${ingredients[y].ingredient.replace(/ *\([^)]*\) */g, "")}</li>`
        );
      } else if (ingredients[y].unit === undefined) {
        ingredientTables[i].push(
          `<li>${ingredients[y].ingredient.replace(
            / *\([^)]*\) */g,
            ""
          )}: <span class="nobold">${ingredients[y].quantity}</span></li>`
        );
      } else {
        ingredientTables[i].push(
          `<li>${ingredients[y].ingredient.replace(
            / *\([^)]*\) */g,
            ""
          )}: <span class="nobold">${ingredients[y].quantity}${
            ingredients[y].unit
          }</span></li>`
        );
      }
    }
  }

  // Injecter les ingrédients, quantités et unités sous forme de balise <i> dans le code HTML

  const ingredientsLists = document.getElementsByClassName(
    "recipe__description__detailscontainer__ingredients"
  );
  ingredientsLists.innerHTML = "";

  for (let i = 0; i < ingredientsLists.length; i++) {
    ingredientsLists[i].innerHTML += ingredientTables[i].join("");
  }

  // Récupérer la liste de tous les ingrédients sans doublons

  const getIngredientArray = () => {
    const allIngredientsTable = [];

    const ingredientsByRecipeTable = [];
    for (let i = 0; i < recipeTable.length; i++) {
      const ingredients = recipeTable[i].ingredients;
      ingredientsByRecipeTable.push([]);
      for (let y = 0; y < ingredients.length; y++) {
        ingredientsByRecipeTable[i].push(
          ingredients[y].ingredient.replace(/ *\([^)]*\) */g, "")
        );
      }
    }

    for (let i = 0; i < ingredientsByRecipeTable.length; i++) {
      const ingredients = ingredientsByRecipeTable[i];
      for (let y = 0; y < ingredients.length; y++) {
        allIngredientsTable.push(ingredients[y]);
      }
    }

    // Passer les ingrédients en minuscule

    const ingretiensToLowerCase = [];
    for (let i = 0; i < allIngredientsTable.length; i++) {
      ingretiensToLowerCase.push(allIngredientsTable[i].toLowerCase());
    }

    // Enlever les doublons et passer les premières lettres en majuscule

    const ingredientsArray = [...new Set(ingretiensToLowerCase)];

    const ingredients = [];
    for (let i = 0; i < ingredientsArray.length; i++) {
      ingredients.push(
        ingredientsArray[i].charAt(0).toUpperCase() +
          ingredientsArray[i].slice(1)
      );
    }

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

  for (let i = 0; i < getIngredientsShortListed().length; i++) {
    listofingredients.innerHTML += `<li class=ingredient>${
      getIngredientsShortListed()[i]
    }</li>`;
  }

  // Récupérer la liste de tous les appareils sans doublons
  const getDevicesArray = () => {
    const allDevicesTable = [];

    const devicesByRecipeTable = [];
    for (let i = 0; i < recipeTable.length; i++) {
      const device = recipeTable[i].appliance;
      devicesByRecipeTable.push(device);
    }

    for (let i = 0; i < devicesByRecipeTable.length; i++) {
      allDevicesTable.push(devicesByRecipeTable[i]);
    }

    // Passer les appareils en minuscule

    const devicesToLowerCase = [];
    for (let i = 0; i < allDevicesTable.length; i++) {
      devicesToLowerCase.push(allDevicesTable[i].toLowerCase());
    }

    // Enlever les doublons et passer les premières lettres en majuscule

    const devicesArray = [...new Set(devicesToLowerCase)];

    const devices = [];
    for (let i = 0; i < devicesArray.length; i++) {
      devices.push(
        devicesArray[i].charAt(0).toUpperCase() + devicesArray[i].slice(1)
      );
    }

    return devices;
  };

  getDevicesArray();

  // Injecter les données du tableau des appareils dans le HTML

  let listofdevices = document.getElementById("deviceslist");
  listofdevices.innerHTML = "";

  for (let i = 0; i < getDevicesArray().length; i++) {
    listofdevices.innerHTML += `<li class=device>${getDevicesArray()[i]}</li>`;
  }

  // Récupérer la liste de tous les ustensils sans doublons
  const getUstensilsArray = () => {
    const allUstensilsTable = [];

    const ustensilsByRecipeTable = [];
    for (let i = 0; i < recipeTable.length; i++) {
      const ustensils = recipeTable[i].ustensils;
      ustensilsByRecipeTable.push(ustensils);
    }

    for (let i = 0; i < ustensilsByRecipeTable.length; i++) {
      const ustensils = ustensilsByRecipeTable[i];
      for (let y = 0; y < ustensils.length; y++) {
        allUstensilsTable.push(ustensils[y].replace(/ *\([^)]*\) */g, ""));
      }
    }

    // Passer les ustensils en minuscule

    const ustensilsToLowerCase = [];
    for (let i = 0; i < allUstensilsTable.length; i++) {
      ustensilsToLowerCase.push(allUstensilsTable[i].toLowerCase());
    }

    // Enlever les doublons et passer les premières lettres en majuscule

    const ustensilsArray = [...new Set(ustensilsToLowerCase)];

    const ustensils = [];
    for (let i = 0; i < ustensilsArray.length; i++) {
      ustensils.push(
        ustensilsArray[i].charAt(0).toUpperCase() + ustensilsArray[i].slice(1)
      );
    }

    return ustensils;
  };

  getUstensilsArray();

  // Injecter les données du tableau des ustensils dans le HTML

  let listofustensils = document.getElementById("ustensilslist");
  listofustensils.innerHTML = "";

  for (let i = 0; i < getUstensilsArray().length; i++) {
    listofustensils.innerHTML += `<li class=ustensil>${
      getUstensilsArray()[i]
    }</li>`;
  }

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

  // Fonction de filtrage des ingrédients lorsque l'utilisateur tappe un ingrédient dans la barre de recherche
  //*Input : Tableau de recettes
  //*Output : Mise à jour des ingrédients affichés
  // Test de la fonction : ok

  const FilterIngredientsList = (recipeTable) => {
    let ingredientword = "";
    let ingredientarray = [];
    let ingredientlist = document.getElementsByClassName("list--blue__ul")[0];
    const searchbaringredients = document.getElementById("searchingredients");

    searchbaringredients.addEventListener("input", () => {
      // Si le mot tappé est > à 1 caractère : on créé un tableau de recettes
      if (searchbaringredients.value.length >= 1) {
        const ingredientTables = [];
        for (let i = 0; i < recipeTable.length; i++) {
          const ingredients = recipeTable[i].ingredients;
          ingredientTables.push([]);
          for (let y = 0; y < ingredients.length; y++) {
            ingredientTables[i].push(ingredients[y].ingredient);
          }
        }

        // Récupérer les ingrédients en minuscules dans un tableau

        for (let i = 0; i < ingredientTables.length; i++) {
          const ingredients = ingredientTables[i];
          for (let y = 0; y < ingredients.length; y++) {
            ingredientarray.push(ingredients[y].toLowerCase());
          }
        }

        // Modifier le tableau pour avoir la première lettre des ingrédients en majuscule

        const firstuppercaseletter = [];
        for (let i = 0; i < ingredientarray.length; i++) {
          firstuppercaseletter.push(
            ingredientarray[i].charAt(0).toUpperCase() +
              ingredientarray[i].slice(1)
          );
        }

        // Enlever les doublons pour récupérer les 123 ingrédients

        const ingredients = [...new Set(firstuppercaseletter)];

        // La variable ingredientword récupère la valeur de l'input en minuscule
        ingredientword = searchbaringredients.value.toLowerCase();

        // Créer un tableau d'ingrédient qui match la recherche

        const matchsearcharray = [];
        for (let i = 0; i < ingredients.length; i++) {
          if (matchInput(ingredients[i], ingredientword)) {
            matchsearcharray.push(ingredients[i]);
          }
        }

        // si le tableau présente plus de 30 ingrédients, raccourcir la liste à 30 max
        matchsearcharray.length > 30
          ? matchsearcharray.slice(0, 30)
          : matchsearcharray;

        ingredientlist.innerHTML = "";

        for (let i = 0; i < matchsearcharray.length; i++) {
          ingredientlist.innerHTML += `<li class="ingredient">${matchsearcharray[i]}</li>`;
        }
      }
    });
  };

  // Fonction de filtrage des Devices lorsque l'utilisateur tappe un appareil dans la barre de recherche
  // *Input : Tableau de recette
  // *Output : Mise à jour des appareils affichés
  // Test de la fonction : ok

  const FilterDevicesList = (recipeTable) => {
    // Recherche complémentaire
    // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
    let deviceword = "";
    let devicearray = [];
    let devicelist = document.getElementsByClassName("list--green__ul")[0];
    const searchbardevices = document.getElementById("searchdevices");

    searchbardevices.addEventListener("input", () => {
      if (searchbardevices.value.length >= 1) {
        const deviceTables = [];
        for (let i = 0; i < recipeTable.length; i++) {
          deviceTables.push(recipeTable[i].appliance);
        }

        // Récupérer les appareils en minuscules dans un tableau

        for (let i = 0; i < deviceTables.length; i++) {
          devicearray.push(deviceTables[i].toLowerCase());
        }

        // Modifier le tableau pour avoir la première lettre des appareils en majuscule

        const firstuppercaseletter = [];
        for (let i = 0; i < devicearray.length; i++) {
          firstuppercaseletter.push(
            devicearray[i].charAt(0).toUpperCase() + devicearray[i].slice(1)
          );
        }

        // Enlever les doublons

        const devices = [...new Set(firstuppercaseletter)];

        // La variable ingredientword récupère la valeur de l'input en minuscule
        deviceword = searchbardevices.value.toLowerCase();

        // Créer un tableau d'appareils qui matchent la recherche

        const matchsearcharray = [];
        for (let i = 0; i < devices.length; i++) {
          if (matchInput(devices[i], deviceword)) {
            matchsearcharray.push(devices[i]);
          }
        }

        // si le tableau présente plus de 30 appareils, raccourcir la liste à 30 max
        matchsearcharray.length > 30
          ? matchsearcharray.slice(0, 30)
          : matchsearcharray;

        devicelist.innerHTML = "";

        for (let i = 0; i < matchsearcharray.length; i++) {
          devicelist.innerHTML += `<li class="device">${matchsearcharray[i]}</li>`;
        }
      }
    });
  };

  // Fonction de filtrages des ustensils lorsque l'utilisateur tappe un appareil dans la barre de recherche
  // *Input : Tableau de recette
  // *Output : Mise à jour des ustensils affichés
  // Test de la fonction : ok

  const FilterUstensilsList = (recipeTable) => {
    // Recherche complémentaire
    // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
    let ustensilword = "";
    let ustensilarray = [];
    let ustensillist = document.getElementsByClassName("list--orange__ul")[0];
    const searchbarustensils = document.getElementById("searchustensils");

    searchbarustensils.addEventListener("input", () => {
      if (searchbarustensils.value.length >= 1) {
        const ustensilTables = [];
        for (let i = 0; i < recipeTable.length; i++) {
          ustensilTables.push(recipeTable[i].ustensils);
        }

        // Récupérer les appareils en minuscules dans un tableau

        for (let i = 0; i < ustensilTables.length; i++) {
          const ustensils = ustensilTables[i];
          for (let y = 0; y < ustensils.length; y++) {
            ustensilarray.push(ustensils[y].toLowerCase());
          }
        }

        // Modifier le tableau pour avoir la première lettre des appareils en majuscule

        const firstuppercaseletter = [];
        for (let i = 0; i < ustensilarray.length; i++) {
          firstuppercaseletter.push(
            ustensilarray[i].charAt(0).toUpperCase() + ustensilarray[i].slice(1)
          );
        }

        // Enlever les doublons

        const ustensils = [...new Set(firstuppercaseletter)];

        // La variable ingredientword récupère la valeur de l'input en minuscule
        ustensilword = searchbarustensils.value.toLowerCase();

        // Créer un tableau d'appareils qui matchent la recherche

        const matchsearcharray = [];
        for (let i = 0; i < ustensils.length; i++) {
          if (matchInput(ustensils[i], ustensilword)) {
            matchsearcharray.push(ustensils[i]);
          }
        }

        // si le tableau présente plus de 30 ustenils, raccourcir la liste à 30 max
        matchsearcharray.length > 30
          ? matchsearcharray.slice(0, 30)
          : matchsearcharray;

        ustensillist.innerHTML = "";

        for (let i = 0; i < matchsearcharray.length; i++) {
          ustensillist.innerHTML += `<li class="ustensil">${matchsearcharray[i]}</li>`;
        }
      }
    });
  };

  FilterIngredientsList(recipeTable);
  FilterDevicesList(recipeTable);
  FilterUstensilsList(recipeTable);

  return recipeTable;
};

renderRecipes(recipes);

// Fonction permettant de filtrer un tableau de recettes si le titre, la description ou les ingrédients correspondent à un mot donné
// Inputs : un mot et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : OK

const MainFilter = (wordToFind, recipeArray) => {
  const filteredArray = [];
  for (let i = 0; i < recipeArray.length; i++) {
    const ingredients = recipeArray[i].ingredients;
    const ingredientTable = [];
    for (let y = 0; y < ingredients.length; y++) {
      ingredientTable.push(ingredients[y].ingredient);
    }
    if (
      matchInput(recipeArray[i].name, wordToFind) ||
      matchInput(recipeArray[i].description, wordToFind) ||
      matchWithTable(ingredientTable, wordToFind)
    ) {
      filteredArray.push(recipeArray[i]);
    } else {
      console.log("no match");
    }
  }
  console.log(filteredArray);
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les ingrédients correspondent à un mot donné
// Inputs : le nom de l'ingrédient et un tableau de recette
// Outputs : un tableau de recette filtré
// Test de la fonction : OK

const FilterRecipesByIngredient = (ingredientName, recipeArray) => {
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
const FilterRecipesByDevice = (deviceName, recipeArray) => {
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
const FilterRecipesByUstensil = (ustensilName, recipeArray) => {
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
const matchInput = (string, inputword) => {
  return string.toLowerCase().match(inputword.toLowerCase()) ? true : false;
};

// Fonction match (entre un mot et un tableau de stings), renvoit true ou false
// Inputs : Un tableau de strings et une string de référence
// Ouputs : retourne true ou false
// Test de la fonction : OK

const matchWithTable = (tableOfStrings, inputword) => {
  let newTable = [];

  for (let i = 0; i < tableOfStrings.length; i++) {
    newTable.push(tableOfStrings[i].toLowerCase());
  }

  let found = [];
  for (let i = 0; i < newTable.length; i++) {
    if (newTable[i].match(inputword.toLowerCase())) {
      found.push(newTable[i]);
    }
    if (found.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

// Fonction permettant de récupérer le click sur un mot clef et filtrer un tableau de recette en fonction du nom du mot clef cliqué
// Inputs : Un tableau de recette et une nodeList d'ingrédients, appareils ou ustensils
// Outputs : retoure un Tableau Filtré et affiche les recettes correspondantes
// Test de la fonction : OK

const FilterbyClick = (targetNodeList, recipeTable) => {
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

// Récupérer les éléments du DOM

const searchbar = document.getElementsByClassName("search__input")[0];
const recipesection = document.getElementsByClassName("recipes")[0];
const sectiontag = document.getElementById("tags");
let filteredTable = null;
let tagsTable = [];

// Fonction de rendu en fonction du tableau de tags
let RenderByTag = () => {
  if (filteredTable === null && tagsTable.length > 0) {
    filteredTable = recipes;
    tagsTable.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = null;
  } else if (filteredTable === null && tagsTable.length === 0) {
    renderRecipes(recipes);
  } else if (filteredTable.length > 0 && tagsTable.length > 0) {
    const rootTable = filteredTable;
    tagsTable.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = rootTable;
  } else {
    renderRecipes(filteredTable);
  }
};

// Fonction de fermeture des Tags
const ClosureOfTags = () => {
  const closeBtn = document.querySelectorAll(".btntag__cross-container");
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tagBtn = e.target.parentNode.parentNode;
      const tagNameTrimed = tagBtn.textContent.trim();
      console.log(tagNameTrimed);
      if (tagBtn.className === "btntag btntag--blue") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ingredient") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else if (tagBtn.className === "btntag btntag--green") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "device") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ustensil") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      }
      tagBtn.style.display = "none";
      RenderByTag();
    });
  });
};

// Gestion de l'affichage des Tags

document.querySelector("#ingredientslist").addEventListener("click", (e) => {
  const tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "ingredient")) {
      return tag;
    }
  });
  console.log(FoundInTable);
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag--blue"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "ingredient" });
    // Permettre la fermeture des tags
    ClosureOfTags();
  } else {
    console.log("doublon");
  }
  RenderByTag();
});

document.querySelector("#deviceslist").addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "device")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag--green"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "device" });
    console.log(tagsTable);
    // Fermeture des Tags
    ClosureOfTags();
  }
  RenderByTag();
});

document.querySelector("#ustensilslist").addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "ustensil")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag--orange"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross-container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "ustensil" });
    console.log(tagsTable);
    // Fermeture des Tags
    ClosureOfTags();
  }
  RenderByTag();
});

// Début du Scénario principal

searchbar.addEventListener("input", (e) => {
  let input = e.target.value;
  if (input.length >= 3) {
    filteredTable = MainFilter(input, recipes);
    if (!filteredTable.length) {
      recipesection.innerHTML = "";
      recipesection.innerHTML += `<p class="error"> Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc</p>`;
      return recipes;
    } else {
      renderRecipes(filteredTable);
    }
  } else if (input.length < 3) {
    filteredTable = recipes;
    renderRecipes(filteredTable);
  }
});
