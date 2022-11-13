import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DisplayCocktail from "../DisplayCocktail.vue";

const cocktail = {
  idDrink: "3",
  strDrink: "Test3",
  strDrinkThumb: "ImageTest3",
  lock: true,
  strIngredient1: "Ingredient1",
  strIngredient2: "Ingredient1",
  strIngredient3: "Ingredient1",
};

describe("VDisplayCocktail.vue", () => {
  it("VDisplayCocktail, name of Cocktail is displayed", () => {
    const wrapper = mount(DisplayCocktail, {
      props: { cocktail: cocktail, animate: false },
    });
    expect(wrapper.find(cocktail.strDrink)).toBeTruthy();
  });

  it("VDisplayCocktail, button click on icon Lock emit changeLock", () => {
    const wrapper = mount(DisplayCocktail, {
      props: { cocktail: cocktail, animate: false },
    });
    wrapper.findAll("button")[0].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("changeLock");
  });

  it("VDisplayCocktail, button click on 'Keep this one' emit changeLock", () => {
    const wrapper = mount(DisplayCocktail, {
      props: { cocktail: cocktail, animate: false },
    });
    wrapper.findAll("button")[2].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("changeLock");
  });
});
