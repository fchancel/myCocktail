<script setup lang="ts">
import { ref } from "vue";
import type { Cocktail } from "@/shared/interfaces/cocktail";
import { theme } from "@/shared/hook/useTheme";
import { getListOfIngredients } from "@/shared/services/cocktailDb";
import DisplayIngredientsVue from "./DisplayIngredients.vue";
import VButton from "./VButton.vue";

const props = defineProps<{
  cocktail: Cocktail;
  animate: boolean;
}>();

const emits = defineEmits<{
  (e: "isLoad"): void;
  (e: "changeLock", id: string): void;
}>();

const ingredients: string[] = getListOfIngredients(props.cocktail); // list of cocktail ingredients
const showIngredients = ref<boolean>(false); //Boolean for know if we display ingredients list

function waitingImageIsLoad() {
  emits("isLoad");
}

function changeLock() {
  emits("changeLock", props.cocktail.idDrink!);
}
</script>

<template>
  <!-- Cards Cocktail -->
  <div
    class="relative border-4 dark:border-2 bg-white dark:bg-neutral-900 border-black dark:border-white flex flex-col justify-between transition-opacity duration-1000 pb-5 rounded-2xl h-full"
    :class="{ 'opacity-0': animate, 'opacity-100': !animate }"
  >
    <!-- btn lock  -->
    <button
      v-show="cocktail.lock"
      @click="changeLock"
      class="icofont-ui-lock absolute -top-3 -right-3 md:-top-5 md:-right-5 lg:-top-8 -lg:right-6 text-3xl md:text-4xl lg:text-5xl rotate-12 shadow z-10"
      :class="{
        'txt-shadow-black': theme === 'dark',
        'txt-shadow-white': theme === 'light',
      }"
    ></button>

    <!-- Main part - Image / Ingredients -->
    <div class="relative overflow-y-scroll sidebar">
      <img
        :src="cocktail.strDrinkThumb"
        class="h-72 sm:h-96 md:h-full w-full object-cover duration-300 rounded-t-xl"
        :class="{ 'opacity-10 dark:opacity-5': showIngredients }"
        @load="waitingImageIsLoad"
        :alt="cocktail.strDrinkThumb"
      />
      <DisplayIngredientsVue
        :ingredients="ingredients"
        :showIngredients="showIngredients"
      />
    </div>

    <!-- Title -->
    <h2 class="text-3xl text-center py-5 font-extrabold">
      {{ cocktail.strDrink }}
    </h2>

    <!-- Buttons -->
    <ul
      class="flex flex-col items-center w-full px-3 whitespace-nowrap space-y-3 xl:space-y-0 xl:flex-row xl:justify-around xl:space-x-3"
    >
      <li class="w-full">
        <VButton
          :title="
            showIngredients ? 'Hide me Ingredients' : 'Show me Ingredients'
          "
          :disabled="false"
          @click="showIngredients = !showIngredients"
        />
      </li>
      <li class="w-full">
        <VButton
          :title="cocktail.lock ? 'Unkeep this one' : 'Keep this one'"
          :disabled="false"
          @click="changeLock"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar::-webkit-scrollbar {
  width: 0 !important;
}
</style>
