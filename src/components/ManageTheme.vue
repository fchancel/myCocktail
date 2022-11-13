<script setup lang="ts">
import { setTheme, theme } from "@/shared/hook/useTheme";

function changeTheme() {
  if (theme.value === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}
</script>

<template>
  <button
    class="p-1.5 fixed z-40 bottom-5 right-5 rounded-full duration-300 text-2xl border hover:border-black border-black/40 dark:border-white/30 hover:dark:border-white hover:text-black text-black/40 hover:dark:text-white dark:text-white/30 bg-white dark:bg-black"
    :class="{
      'icofont-moon': theme === 'light',
      'icofont-sun': theme === 'dark',
    }"
    @click="changeTheme"
  ></button>
</template>
