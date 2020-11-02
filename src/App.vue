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
    this.obtenerDataEstaciones();
  },
  components: {
    BarraNavegacion,
  },
  methods: {
    ...mapActions(["agregarEstacion", "pintaLosMarcadores"]),
    async obtenerDataEstaciones() {
      try {
        const response = await db.collection("estaciones").get();

        response.docs.forEach((e) => {
          let latitud = e.data().coordenadas.latitude;
          let longitud = e.data().coordenadas.longitude;
          let nombre = e.data().nombre;
          let imagen = e.data().urlImagen;
          let idFirebase = e.id;

          let estacion = {
            idFirebase,
            nombre,
            imagen,
            latitud,
            longitud,
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
