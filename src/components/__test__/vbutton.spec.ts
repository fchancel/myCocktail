import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import VButton from "../VButton.vue";

describe("VButton.vue", () => {
  it("VButton, title is correct rendering", () => {
    const title = "test";
    const wrapper = mount(VButton, {
      props: { title: title },
    });

    expect(wrapper.text()).toBe(title);
  });

  it("VButton, button is correctly disabled", () => {
    const title = "test";
    const wrapper = mount(VButton, {
      props: { title: title, disabled: true },
    });

    expect(wrapper.attributes()).toHaveProperty('disabled');
  });
});
