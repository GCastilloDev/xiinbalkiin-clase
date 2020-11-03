<template>
  <v-container>
    <v-card>
      <v-card-title>
        Estaciones
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = true"
          color="deep-purple darken-1"
          dark
          depressed
          >Agregar estación<v-icon right>mdi-map-marker-plus</v-icon></v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="estaciones" :search="search">
        <template v-slot:item.detalles="{ item }">
          <v-btn icon color="red" @click="eliminarEstacion(item)"
            ><v-icon small> mdi-delete </v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <NuevaEstacion v-if="dialog" :dialog="dialog" @cancel="dialog = false" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NuevaEstacion from "../estaciones/NuevaEstacion";
import { db, storage } from "../../common/Firebase";

export default {
  name: "EstacionesComponent",
  components: {
    NuevaEstacion,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Latitud", value: "latitud" },
        { text: "Longitud", value: "longitud" },
        { text: "Detalles", value: "detalles" },
      ],
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["eliminarEstacionStorage"]),
    async eliminarEstacion(item) {
      const { rutaStorage } = item;
      const { idFirebase } = item;

      try {
        await this.eliminarFoto(rutaStorage);
        await this.eliminarRegistroFirebase(idFirebase);
        const index = await this.buscarEstacion(idFirebase);
        await this.eliminarEstacionStorage(index);
        alert("Eliminado de forma correcta");
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarFoto(rutaStorage) {
      try {
        await storage.child(rutaStorage).delete();
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarRegistroFirebase(idFirebase) {
      try {
        const response = await db
          .collection("estaciones")
          .doc(idFirebase)
          .delete();
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("NO SE HA PODIDO ELIMINAR");
      }
    },
    buscarEstacion(idFirebase) {
      return this.estaciones.findIndex(
        (estacion) => estacion.idFirebase == idFirebase
      );
    },
  },
  computed: {
    ...mapState(["estaciones"]),
  },
};
</script>

<style lang="scss" scoped>
</style>