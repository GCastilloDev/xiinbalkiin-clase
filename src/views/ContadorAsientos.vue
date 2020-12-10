<template>
  <v-container class="contenedor--principal">
    <h1>Contador de asientos</h1>
    <v-row class="contenedor d-flex align-center">
      <v-col cols="4" class="d-flex justify-center">
        <v-btn
          x-large
          block
          color="primary"
          class="pb-9 pt-9"
          @click="subioPasaje"
        >
          Subio pasaje
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <h2>{{ contador }}</h2>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn
          @click="bajoPasaje"
          x-large
          block
          color="primary"
          class="pb-9 pt-9"
        >
          Bajo pasaje
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../common/Firebase";

export default {
  name: "ContadorAsientos",
  mounted() {
    this.traerAsientosDisponibles();
  },
  data: () => ({
    contador: 0,
  }),
  methods: {
    traerAsientosDisponibles() {
      db.collection("camiones")
        .doc("10")
        .get()
        .then((doc) => {
          this.contador = doc.data().asientosDisponibles;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    actualizarFirebase(asientos) {
      db.collection("camiones")
        .doc("10")
        .update({
          asientosDisponibles: asientos,
        })
        .then(() => {
          console.log("Actualizacion exitosa!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    subioPasaje() {
      this.contador--;
      this.actualizarFirebase(this.contador);
    },
    bajoPasaje() {
      this.contador++;
      this.actualizarFirebase(this.contador);
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedor--principal,
.contenedor {
  height: 100%;
}
</style>