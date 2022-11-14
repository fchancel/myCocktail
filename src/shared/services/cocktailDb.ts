import type { Cocktail } from "../interfaces/cocktail";

const URL = "https://www.thecocktaildb.com/api/json/v1/1";

/**
 * Call api for get a random cocktail
 *
 */
export async function getRandomCocktailFromApi() {
  try {
    const response = await fetch(`${URL}/random.php`, {
      method: "GET",
    });
    return response;
  } catch (e) {
    return null;
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
  return cocktails.some((elt) => Object.values(elt).includes(id));
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
      const response = await getRandomCocktailFromApi();
      if (response && response.ok) {
        const data = await response.json();

        //Check if data has Image
        if (checkIfCocktailHaveAnImage(data.drinks[0])) {
          // Check for duplicates cocktails
          if (
            !checkIfCocktailAlreadyExist(
              data.drinks[0].idDrink,
              cocktailsResponse
            ) &&
            !checkIfCocktailAlreadyExist(data.drinks[0].idDrink, cocktails)
          ) {
            cocktailsResponse.push({ ...data.drinks[0], lock: false });
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
  return Object.entries(cocktail)
    .filter(([key, value]) => key.includes("Ingredient") && value)
    .map(([key, value]) => value);
}
