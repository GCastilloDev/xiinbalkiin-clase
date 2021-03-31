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
          <!-- Boton de eliminar estacion -->
          <v-btn icon color="red" @click="eliminarEstacion(item)"
            ><v-icon small> mdi-delete </v-icon></v-btn
          >

          <!-- Boton de editar estacion -->
          <v-btn icon color="blue" @click="editarEstacion(item)"
            ><v-icon small> mdi-pencil </v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>

    <NuevaEstacion v-if="dialog" :dialog="dialog" @cancel="dialog = false" />

    <EditarEstacion
      v-if="dialogEdit"
      :dialogEdit="dialogEdit"
      :estacion="estacion"
      @cancel="dialogEdit = false"
    />
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { db, storage } from "../../common/Firebase";

// Componentes
import NuevaEstacion from "../estaciones/NuevaEstacion";
import EditarEstacion from "../estaciones/EditarEstacion";

export default {
  name: "EstacionesComponent",
  mounted() {
    this.listenerEstaciones();
  },
  components: {
    NuevaEstacion,
    EditarEstacion,
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
        { text: "Creado por", value: "creado" },
        { text: "Detalles", value: "detalles" },
      ],
      dialog: false,
      dialogEdit: false,
      estacion: {},
      estaciones: [],
    };
  },
  methods: {
    ...mapActions(["eliminarEstacionStorage"]),
    async eliminarEstacion(item) {
      const isDelete = confirm(
        "¿Desea eliminar esta estación? Esta acción no podrá deshacerse."
      );

      if (!isDelete) return;

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
    editarEstacion(estacion) {
      this.estacion = Object.assign({}, estacion);
      this.dialogEdit = true;
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
    listenerEstaciones() {
      db.collection("estaciones").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const latitud = change.doc.data().coordenadas.latitude;
          const longitud = change.doc.data().coordenadas.longitude;
          const nombre = change.doc.data().nombre;
          const imagen = change.doc.data().urlImagen;
          const idFirebase = change.doc.id;
          const rutaStorage = change.doc.data().rutaStorage || null;
          const creado = change.doc.data().creado;

          const estacion = {
            idFirebase,
            nombre,
            imagen,
            latitud,
            longitud,
            rutaStorage,
            creado,
          };

          if (change.type === "added") {
            this.estaciones.unshift(estacion);
          }
          if (change.type === "modified") {
            const index = this.estaciones.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            this.estaciones[index] = "";
            this.estaciones[index] = estacion;
          }
          if (change.type === "removed") {
            const index = this.estaciones.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            this.estaciones.splice(index, 1);
          }
        });
      });
    },
  },
  computed: {
    // ...mapState(["estaciones"]),
  },
};
</script>

<style lang="scss" scoped>
</style>