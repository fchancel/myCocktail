<script setup lang="ts">
import { theme } from "@/shared/hook/useTheme";
import { useRoute } from "vue-router";
import ManageTheme from "./components/ManageTheme.vue";

const route = useRoute();
</script>

<template>
  <div :class="theme">
    <div
      class="flex overflow-x-hidden min-h-screen dark:bg-neutral-900 bg-white dark:text-white txtRegular bg-[url('/images/patternBgLight.png')] dark:bg-[url('/images/patternBgDark.png')]"
    >
      <!-- Button for Manage Theme -->
      <ManageTheme />

      <!-- Component Display -->
      <router-view v-slot="{ Component }" :key="route.path">
        <template v-if="Component">
          <Transition>
            <Suspense>
              <Component :is="Component" />
            </Suspense>
          </Transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<style>
.v-enter-active {
  transition: opacity 1s ease;
}
.v-enter-from {
  opacity: 0;
}
</style>
