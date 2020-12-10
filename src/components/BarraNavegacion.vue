<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon
        v-if="session"
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>Xiinbalkin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text dark to="/login" v-if="!session">Iniciar sesión</v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-google-translate</v-icon>
        ES
      </v-btn> -->
    </v-app-bar>

    <NavigationDrawer
      :drawer="mostrarNavigationDrawer"
      @toggleDrawer="mostrarNavigationDrawer = $event"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "./NavigationDrawer";

export default {
  components: {
    NavigationDrawer,
  },
  data: () => ({
    sessionStart: sessionStorage.sessionStart,
    mostrarNavigationDrawer: false,
  }),
  computed: {
    ...mapState(["session"]),
  },
};
</script>

<style lang="scss" scoped>
</style>