<template>
  <div ref="contenedorMapa" class="mapa"></div>
</template>

<script>
import L from "leaflet";
import { ruta } from "../common/Ruta";
import { mapState } from "vuex";
import { db } from "../common/Firebase";

export default {
  name: "MapaComponent",
  mounted() {
    this.init();
  },
  data: () => ({
    mapa: null,
    markers: [],
    autobus: [],
    ubicacionUsuario: {
      latitud: 0,
      longitud: 0,
    },
    metrosPorMinuto: 348,
  }),
  methods: {
    async init() {
      await this.obtenerPosicion();
      await this.pintarMapa();
      await this.pintarRuta();
      this.listenerEstaciones();
      this.listenerAutobus();
      // await this.pintarMarcadores();
    },
    listenerAutobus() {
      db.collection("camiones").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.doc.data());
          let latitud = change.doc.data().latitud;
          let longitud = change.doc.data().longitud;
          let asientosDisponibles = change.doc.data().asientosDisponibles;
          let idFirebase = change.doc.id;

          if (change.type === "added") {
            this.pintarMarcadorAutobus(
              idFirebase,
              [latitud, longitud],
              asientosDisponibles
            );
          }
          if (change.type === "modified") {
            const index = this.autobus.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            const marker = this.autobus[index].marker;

            const distancia = this.mapa.distance(
              [latitud, longitud],
              [this.ubicacionUsuario.latitud, this.ubicacionUsuario.longitud]
            );
            const tiempo = (distancia / this.metrosPorMinuto).toFixed(2);

            const message =
              asientosDisponibles < 1
                ? "Sin asientos"
                : `Asientos disponibles: ${asientosDisponibles}`;

            marker
              .bindPopup(
                `<h1>${message}</h1>
             <h2>Tiempo aprox. ${tiempo} minutos</h2>`
              )
              .openPopup();
            marker.setLatLng([latitud, longitud]);
          }
          if (change.type === "removed") {
            const index = this.autobus.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            const marker = this.markers[index].marker;
            this.mapa.removeLayer(marker);
            this.autobus.splice(index, 1);
          }
        });
      });
    },
    listenerEstaciones() {
      db.collection("estaciones").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let latitud = change.doc.data().coordenadas.latitude;
          let longitud = change.doc.data().coordenadas.longitude;
          let nombre = change.doc.data().nombre;
          let imagen = change.doc.data().urlImagen;
          let idFirebase = change.doc.id;

          if (change.type === "added") {
            this.pintarMarcadorEstacion(
              idFirebase,
              [latitud, longitud],
              nombre,
              imagen
            );
          }
          if (change.type === "modified") {
            const index = this.markers.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            const marker = this.markers[index].marker;
            marker
              .bindPopup(
                `<h1>${nombre}</h1>  <br>
                     <img src="${imagen}" alt="${nombre}" width="100%">
                      `
              )
              .openPopup();
            marker.setLatLng([latitud, longitud]);
          }
          if (change.type === "removed") {
            const index = this.markers.findIndex(
              (e) => e.idFirebase == idFirebase
            );
            const marker = this.markers[index].marker;
            this.mapa.removeLayer(marker);
            this.markers.splice(index, 1);
          }
        });
      });
    },
    pintarMarcadores() {
      this.estaciones.forEach((e) => {
        let latitud = e.latitud;
        let longitud = e.longitud;

        this.pintarMarcador([latitud, longitud]);
      });
      console.log(this.map);
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
    pintarMarcadorAutobus(
      id,
      coordenadas,
      asientosDisponibles,
      avatar = "https://firebasestorage.googleapis.com/v0/b/xiinbalkiin-4b927.appspot.com/o/markers%2Fautobus.svg?alt=media&token=d0036c4b-4afd-429c-9c38-4dbdd0e24efd"
    ) {
      let myIcon = L.icon({
        iconUrl: avatar,
        iconSize: [38, 95],
        popupAnchor: [0, -13],
      });

      const distancia = this.mapa.distance(coordenadas, [
        this.ubicacionUsuario.latitud,
        this.ubicacionUsuario.longitud,
      ]);
      const tiempo = (distancia / this.metrosPorMinuto).toFixed(2);

      const message =
        asientosDisponibles < 1
          ? "Sin asientos"
          : `Asientos disponibles: ${asientosDisponibles}`;

      const marker = L.marker(coordenadas, { icon: myIcon });
      marker.addTo(this.mapa);
      marker
        .bindPopup(
          `<h1>${message}</h1>
        <h2>Tiempo aprox. ${tiempo} minutos</h2>`
        )
        .openPopup();

      const dataMarker = {
        idFirebase: id,
        marker: marker,
      };

      this.autobus.push(dataMarker);
    },
    pintarMarcadorEstacion(
      id,
      coordenadas,
      nombre,
      imagen,
      avatar = "https://firebasestorage.googleapis.com/v0/b/xiinbalkiin-4b927.appspot.com/o/markers%2Fparada-de-autobus.svg?alt=media&token=9142217d-914c-4e55-8206-dceeab2490ba"
    ) {
      let myIcon = L.icon({
        iconUrl: avatar,
        iconSize: [38, 95],
        popupAnchor: [0, -13],
      });

      const marker = L.marker(coordenadas, { icon: myIcon });
      marker
        .bindPopup(
          `<h1>${nombre}</h1>  <br>
      <img src="${imagen}" alt="${nombre}" width="100%">
      `
        )
        .openPopup();
      marker.addTo(this.mapa);

      const dataMarker = {
        idFirebase: id,
        marker: marker,
      };

      this.markers.push(dataMarker);
    },
    pintarMarcador(
      id,
      coordenadas,
      avatar = "https://firebasestorage.googleapis.com/v0/b/xiinbalkiin-4b927.appspot.com/o/markers%2Fparada-de-autobus.svg?alt=media&token=9142217d-914c-4e55-8206-dceeab2490ba"
    ) {
      let myIcon = L.icon({
        iconUrl: avatar,
        iconSize: [38, 95],
        popupAnchor: [0, -13],
      });

      const marker = L.marker(coordenadas, { icon: myIcon });
      marker.addTo(this.mapa);

      const dataMarker = {
        idFirebase: id,
        marker: marker,
      };

      this.markers.push(dataMarker);
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

        this.ubicacionUsuario.latitud = latitud;
        this.ubicacionUsuario.longitud = longitud;

        this.pintarMarcador(
          "user",
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
    estaciones: function () {
      console.log("CAMBIOOO");
    },
    pintaMarcadores: function () {
      if (this.pintaMarcadores == true) this.pintarMarcadores();
    },
  },
};
</script>

<style lang="scss" scoped>
.mapa {
  width: 100%;
  height: 70vh;
  z-index: 1;
}
</style>