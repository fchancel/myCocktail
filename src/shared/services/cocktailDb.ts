import type { Cocktail } from "../interfaces/cocktail";

const URL = "https://www.thecocktaildb.com/api/json/v1/1";

/**
 * Call api for get a random cocktail
 *
 */
async function getRandomCocktailFromApi() {
  try {
    const response = await fetch(`${URL}/random.php`, {
      method: "GET",
    });
    return response;
  } catch (e) {
    throw e;
  }
}

/**
 * Check if cocktail already exist in cocktails list.
 *
 * @param {string} id The id of cocktail.
 * @param {Cocktail[]} cocktails  the cocktail list where you have to check the existence of the id.
 * @return {boolean} return true if id exist in cocktails, else return false.
 */
export function checkIfCocktailAlreadyExist(id: string, cocktails: Cocktail[]) {
  let response = false;
  cocktails.forEach((elt) => {
    if (Object.values(elt).includes(id)) {
      response = true;
    }
  });
  return response;
}

/**
 * Check if cocktail have a image.
 *
 * @param {Cocktail} cocktail  the cocktail where you have to check the existence of the image.
 * @return {boolean} return true if cocktail have an image, else return false.
 */
export function checkIfCocktailHaveAnImage(cocktail: Cocktail) {
  return cocktail.strDrinkThumb ? true : false;
}

/**
 * Retrieves a UNIQUE cocktail number corresponding to nb.
 *
 * @param {number} nb  The number of unique cocktails desired.
 * @return {Promise<Cocktail[] | null>} return a list of nb cocktails, Or null if the API request has a problem.
 */
export async function getRandomCocktails(
  nb: number,
  cocktails: Cocktail[] = []
): Promise<Cocktail[] | null> {
  let cocktailsResponse: Cocktail[] = [];

  while (cocktailsResponse.length < nb) {
    if (
      cocktails &&
      cocktails[cocktailsResponse.length] &&
      cocktails[cocktailsResponse.length].lock
    ) {
      cocktailsResponse.push(
        JSON.parse(JSON.stringify(cocktails[cocktailsResponse.length]))
      );
    } else {
      let response = await getRandomCocktailFromApi();
      if (response.ok) {
        response = await response.json();
        if (checkIfCocktailHaveAnImage(response.drinks["0"])) {
          if (
            !checkIfCocktailAlreadyExist(
              response.drinks["0"],
              cocktailsResponse
            ) &&
            !checkIfCocktailAlreadyExist(response.drinks["0"], cocktails)
          ) {
            cocktailsResponse.push({ ...response.drinks["0"], lock: false });
          }
        }
      } else {
        return null;
      }
    }
  }
  return cocktailsResponse;
}

/**
 * Retrieve the list of ingredients composing a cocktail.
 *
 * @param {Cocktail} cocktail  The cocktail requiring the extraction of the ingredients
 * @return {string[]} A list of ingredients.
 */
export function getListOfIngredients(cocktail: Cocktail): string[] {
  let lstIngredient: string[] = [];

  for (const [key, value] of Object.entries(cocktail)) {
    if (key.includes("Ingredient")) {
      value ? lstIngredient.push(value) : "";
    }
  }
  return lstIngredient;
}
