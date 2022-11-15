<script setup lang="ts">
import DisplayCocktail from "@/components/DisplayCocktail.vue";
import IconsAnimation from "@/components/IconsAnimation.vue";
import { theme } from "@/shared/hook/useTheme";
import VButton from "@/components/VButton.vue";
import type { Cocktail } from "@/shared/interfaces/cocktail";
import { getRandomCocktails } from "@/shared/services/cocktailDb";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const nbCocktail = 3; //Nb coktail wanted
const cardLoaded = ref(false); //Check if all cocktail card is loading
let nbCardLock = ref(0); //Nb of card Locked
const cocktails = ref<Cocktail[] | null>(); //List of cocktails

async function changeCocktails() {
  cardLoaded.value = false;
  cocktails.value = await getRandomCocktails(nbCocktail, cocktails.value!);
  if (!cocktails.value) {
    router.push({ name: "error500" });
  }
}

function cocktailsImageIsLoad() {
  cardLoaded.value = true;
}

/**
 * Change the lock value of one Cocktail
 *
 * @param {string} id The id of cocktail.
 *
 */
function changeLock(id: string) {
  cocktails.value?.forEach((cocktail) => {
    if (cocktail.idDrink === id) {
      cocktail.lock = !cocktail.lock;
      cocktail.lock ? (nbCardLock.value += 1) : (nbCardLock.value -= 1);
    }
  });
}

await changeCocktails();
</script>

<template>
  <div class="py-5">
    <!-- Header -->

    <header class="w-screen flex justify-center">
      <div class="flex space-x-2 items-center">
        <h1 class="text-6xl sm:text-8xl">
          <span
            class="text-black dark:text-yellow-300"
            :class="{ 'txt-shadow': theme === 'dark' }"
            >My</span
          >
          <span
            class="text-black dark:text-pink-500"
            :class="{ 'txt-shadow': theme === 'dark' }"
            >Cocktail</span
          >
        </h1>
        <IconsAnimation class="hidden sm:inline-block" />
      </div>
    </header>

    <section class="flex flex-col items-center space-y-10 py-10">
      <!-- Button change Cocktails -->
      <VButton
        title="Give me new cocktails"
        class="w-max"
        :class="{
          'hover:scale-110 hover:rotate-12':
            cardLoaded && nbCardLock !== nbCocktail,
        }"
        :disabled="!cardLoaded || nbCardLock === nbCocktail"
        @click="changeCocktails"
      />

      <!-- Cocktails -->
      <div
        class="flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-5 md:px-5 lg:gap-10 lg:px-10 xl:gap-20 xl:px-20 2xl:gap-32 2xl:px-32 min-h-[500px]"
      >
        <template v-for="cocktail in cocktails" :key="cocktail.idDrink">
          <DisplayCocktail
            :id="cocktail.idDrink"
            :cocktail="cocktail"
            :animate="!cardLoaded && !cocktail.lock"
            @is-load="cocktailsImageIsLoad"
            @change-lock="
              (id) => {
                changeLock(id);
              }
            "
          />
        </template>
      </div>
    </section>
  </div>
</template>
