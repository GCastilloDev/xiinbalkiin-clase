<template>
  <div ref="contenedorMapa" class="mapa"></div>
</template>

<script>
import L from "leaflet";
import { ruta } from "../common/Ruta";
import { mapState } from "vuex";

export default {
  name: "MapaComponent",
  mounted() {
    this.init();
  },
  data: () => ({
    mapa: null,
  }),
  methods: {
    async init() {
      await this.obtenerPosicion();
      await this.pintarMapa();
      await this.pintarRuta();
      // await this.pintarMarcadores();
    },
    pintarMarcadores() {
      this.estaciones.forEach((e) => {
        let latitud = e.latitud;
        let longitud = e.longitud;

        this.pintarMarcador([latitud, longitud]);
      });
    },
    pintarMapa() {
      const contenedorMapa = this.$refs.contenedorMapa;

      // instanciamos el mapa
      this.mapa = L.map(contenedorMapa, {
        center: [18.084646, -94.402678],
        zoom: 12,
      });

      // le agregamos la capa de personalizacion
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(this.mapa);
    },
    pintarMarcador(
      coordenadas,
      avatar = "https://firebasestorage.googleapis.com/v0/b/xiinbalkiin-4b927.appspot.com/o/markers%2Fparada-de-autobus.svg?alt=media&token=9142217d-914c-4e55-8206-dceeab2490ba"
    ) {
      let myIcon = L.icon({
        iconUrl: avatar,
        iconSize: [38, 95],
        popupAnchor: [-3, -76],
      });

      L.marker(coordenadas, { icon: myIcon }).addTo(this.mapa);
    },
    pintarRuta() {
      L.geoJSON(ruta, {
        style: {
          color: "#41B883",
          weight: 12,
        },
      }).addTo(this.mapa);
    },
    obtenerPosicion() {
      /**
       * Actualizar para hacer mas precisa la posicion
       * y actualizar el marcador cuando cambien las coordenadas
       */

      if (!navigator.geolocation) {
        alert("NO TIENES GPS");
        return true;
        // Mejorar la UI del mensaje
      }

      navigator.geolocation.getCurrentPosition((coordenadas) => {
        let latitud = coordenadas.coords.latitude;
        let longitud = coordenadas.coords.longitude;

        this.pintarMarcador(
          [latitud, longitud],
          "https://firebasestorage.googleapis.com/v0/b/xiinbalkiin-4b927.appspot.com/o/markers%2Fpersona.svg?alt=media&token=8e15f569-a31b-409b-95c3-3791824978d4"
        );
      });
    },
  },
  computed: {
    ...mapState(["estaciones", "pintaMarcadores"]),
  },
  watch: {
    pintaMarcadores: function() {
      if(this.pintaMarcadores == true) this.pintarMarcadores();
    }
  }
};
</script>

<style lang="scss" scoped>
.mapa {
  width: 100%;
  height: 70vh;
  z-index: 1;
}
</style>