import { ref } from "vue";

export let theme = ref(getTheme());

/**
 * Check the name of the theme selected by the user.
 *
 * @return {'dark' | 'light'} return dark or light.
 */
function getTheme(): "dark" | "light" {
  if (localStorage.theme) {
    return localStorage.theme;
  } else {
    return "dark";
  }
}

/**
 * Set the name of the theme selected by the user.
 *
 */
export function setTheme(newTheme: "dark" | "light") {
  localStorage.theme = newTheme;
  theme.value = newTheme;
}
