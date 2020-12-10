<template>
  <v-container>
    <h1 class="text-center">Administrador de estaciones</h1>
    <Estaciones />
  </v-container>
</template>

<script>
import Estaciones from "../components/estaciones/Estaciones";
export default {
  name: "AdminView",
  components: {
    Estaciones,
  },
};
</script>

<style lang="scss" scoped>
</style>