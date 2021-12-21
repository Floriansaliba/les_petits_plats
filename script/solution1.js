import recipes from "./recipes.js";

export const renderRecipes = (recipeTable) => {
  // Get DOM elements to insert recipes

  const recipesSection = document.getElementsByClassName("recipes")[0];

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
        return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}</li>`;
      } else if (i.unit === undefined) {
        return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}: ${
          i.quantity
        }</li>`;
      } else {
        return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}: ${
          i.quantity
        }${i.unit}</li>`;
      }
    });
  });

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

    const ingredientsByRecipeTable = recipeTable.map((element) => {
      return element.ingredients.map((i) => {
        return i.ingredient.replace(/ *\([^)]*\) */g, "");
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
        return allUstensilsTable.push(u.replace(/ *\([^)]*\) */g, ""));
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

  const FilterDevicesList = (recipeTable) => {
    // Recherche complémentaire
    // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
    let deviceword = "";
    let devicearray = [];
    let devicelist = document.getElementsByClassName("list--green__ul")[0];
    const searchbardevices = document.getElementById("searchdevices");

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

  const FilterUstensilsList = (recipeTable) => {
    // Recherche complémentaire
    // Si l'utilisateur recherche un  appareil dans la barre de recherche appareil, on modifie le tableau des recettes déjà affiché avec le tableau des recettes modifié
    let ustensilword = "";
    let ustensilarray = [];
    let ustensillist = document.getElementsByClassName("list--orange__ul")[0];
    const searchbarustensils = document.getElementById("searchustensils");

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
