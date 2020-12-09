<template>
  <div>
    <Mapa />
    <SeccionPrincipal />
  </div>
</template>

<script>
import Mapa from "../components/Mapa";
import SeccionPrincipal from "../components/SeccionPrincipal";

import { db } from "../common/Firebase";

export default {
  name: "Home",
  mounted() {
    console.log(this.$route.query.id);
    this.saveData();
  },
  components: {
    Mapa,
    SeccionPrincipal,
  },
  methods: {
    saveData() {
      const data = {
        prueba: this.$route.query.id
      };

      db.collection("pruebas")
        .add(data)
        .then(() => {
          console.log("Guardado con éxito!");
        });
    }
  }
};
</script>
