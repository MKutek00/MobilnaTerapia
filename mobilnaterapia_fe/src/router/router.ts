import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Login from "../view/login.vue";
import Register from "../view/register.vue";
import Home from "../view/home.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home },
];

export const router = createRouter({
  history: createWebHashHistory(""),
  routes,
});
