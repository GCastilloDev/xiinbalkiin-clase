<template>
  <v-app>
    <BarraNavegacion />
    <router-view />
  </v-app>
</template>

<script>
import BarraNavegacion from "./components/BarraNavegacion";
import { db } from "./common/Firebase";
import { mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.listenerEstaciones();
  },
  components: {
    BarraNavegacion,
  },
  methods: {
    ...mapActions(["agregarEstacion", "pintaLosMarcadores"]),
    listenerEstaciones() {
      db.collection("estaciones").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach( change => {

          let latitud = change.doc.data().coordenadas.latitude;
          let longitud = change.doc.data().coordenadas.longitude;
          let nombre = change.doc.data().nombre;
          let imagen = change.doc.data().urlImagen;
          let idFirebase = change.doc.id;
          let rutaStorage = change.doc.data().rutaStorage || null;

          let estacion = {
            idFirebase,
            nombre,
            imagen,
            latitud,
            longitud,
            rutaStorage
          };

           if (change.type === "added") {
              this.agregarEstacion(estacion);
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        })
      })
    },
    async obtenerDataEstaciones() {
      try {
        const response = await db.collection("estaciones").get();

        response.docs.forEach((e) => {
          let latitud = e.data().coordenadas.latitude;
          let longitud = e.data().coordenadas.longitude;
          let nombre = e.data().nombre;
          let imagen = e.data().urlImagen;
          let idFirebase = e.id;
          let rutaStorage = e.data().rutaStorage || null;

          let estacion = {
            idFirebase,
            nombre,
            imagen,
            latitud,
            longitud,
            rutaStorage
          };
          
          this.agregarEstacion(estacion);
        });

        this.pintaLosMarcadores();
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>
