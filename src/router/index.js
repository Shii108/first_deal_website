import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/process",
      name: "process",
      component: () => import("../views/ProcessView.vue"),
    },
    {
      path: "/sectors",
      name: "sectors",
      component: () => import("../views/SectorsView.vue"),
    },
    {
      path: "/investors",
      name: "investors",
      component: () => import("../views/InvestorsView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
