import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: () => import("@/views/HomePageView.vue"),
      meta: {
        title: "Home",
      },
    },
    {
      path: "/error-500",
      name: "error500",
      component: () => import("@/views/Error500View.vue"),
      meta: {
        title: "Error Server",
      },
    },
  ],
});

export default router;
