<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>Xiinbalkin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-google-translate</v-icon>
        ES
      </v-btn>
    </v-app-bar>

    <NavigationDrawer
      :drawer="mostrarNavigationDrawer" 
      @cerrar="mostrarNavigationDrawer = false"
    />
  </div>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";

export default {
  components: {
    NavigationDrawer,
  },
  data: () => ({
    mostrarNavigationDrawer: false,
  }),
};
</script>

<style lang="scss" scoped>
</style>