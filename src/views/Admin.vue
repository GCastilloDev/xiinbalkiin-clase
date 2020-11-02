<template>
  <div>
    <h1>Administrador</h1>
    <Estaciones />
  </div>
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