<script setup lang="ts"></script>

<template>
  <div class="overflow-hidden h-[98px]">
    <ul class="flex flex-col text-8xl">
      <i class="icofont-cocktail text-black dark:text-purple-500"></i>
      <i class="icofont-soft-drinks text-black dark:text-yellow-300"></i>
      <i class="icofont-juice text-black dark:text-green-400"></i>
      <i class="icofont-glass text-black dark:text-orange-400"></i>
      <i class="icofont-coconut-water text-black dark:text-white"></i>
      <i class="icofont-beer text-black dark:text-yellow-200"></i>
    </ul>
  </div>
</template>

<style scoped>
ul {
  -webkit-animation: slideAnim 10s ease 0s infinite;
  -moz-animation: slideAnim 10s ease 0s infinite;
  -ms-animation: slideAnim 10s ease 0s infinite;
  -o-animation: slideAnim 10s ease 0s infinite;
  animation: slideAnim 10s ease 0s infinite;
}

@keyframes slideAnim {
  from,
  12%,
  to {
    margin-top: 98px;
  }
  15%,
  25% {
    margin-top: 0px;
  }
  28%,
  38% {
    margin-top: -96px;
  }
  41%,
  51% {
    margin-top: -192px;
  }
  55%,
  65% {
    margin-top: -288px;
  }
  68%,
  78% {
    margin-top: -384px;
  }
  80%,
  90% {
    margin-top: -480px;
  }
  92%,
  100% {
    margin-top: -576px;
  }
}
</style>
