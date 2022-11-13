<script setup lang="ts">
defineProps<{ ingredients: string[]; showIngredients: boolean }>();
</script>

<template>
  <ul
    class="absolute top-0 left-0 duration-300 text-center w-full txtHandScript"
    :class="{
      hidden: !showIngredients,
      block: showIngredients,
    }"
  >
    <p class="py-5 text-2xl 2xl:text-3xl">Ingredients:</p>
    <li
      v-if="ingredients.length > 0"
      v-for="(ingredient, index) in ingredients"
      :key="index"
      class="text-xl 2xl:text-2xl"
    >
      {{ ingredient }}
    </li>
    <p v-else>We do not have any information</p>
  </ul>
</template>
