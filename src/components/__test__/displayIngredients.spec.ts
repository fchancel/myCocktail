import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DisplayIngredients from "../DisplayIngredients.vue";

const lstIngredients = ["test", "test1"];

describe("DisplayIngredients.vue", () => {
  it("DisplayIngredients, ingredients list is display", () => {
    const wrapper = mount(DisplayIngredients, {
      props: { ingredients: lstIngredients, showIngredients: true },
    });

    expect(wrapper.text()).toBe(
      `Ingredients:${lstIngredients[0]}${lstIngredients[1]}`
    );
  });

  it("DisplayIngredients, displayed error message if there is no ingredient", () => {
    const wrapper = mount(DisplayIngredients, {
      props: { ingredients: [], showIngredients: true },
    });

    expect(wrapper.text()).toBe(`Ingredients:We do not have any information`);
  });
});
