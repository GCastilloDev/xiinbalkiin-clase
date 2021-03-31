import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// Autenticación
const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.sessionStart) {
    if (to.name == "Estaciones" && sessionStorage.rol == "chofer") next("/");
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/estaciones",
    name: "Estaciones",
    component: () =>
      import(/* webpackChunkName: "Estaciones" */ "../views/Admin.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () =>
      import(/* webpackChunkName: "Usuarios" */ "../components/usuarios/Usuarios.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/contador-asientos",
    name: "ContadorAsientos",
    component: () =>
      import(
        /* webpackChunkName: "ContadorAsientos" */ "../views/ContadorAsientos.vue"
      ),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/prueba",
    name: "Prueba",
    component: () =>
      import(/* webpackChunkName: "Prueba" */ "../views/Prueba.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
