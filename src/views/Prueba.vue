<template>
  <v-container>
    <h1>Prueba</h1>
    <v-btn @click="iniciar">Iniciar</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Prueba",
  data: () => ({
    coordenadas: [
      {
        latitud: 18.030169,
        longitud: -94.393897,
      },
      {
        latitud: 18.030025,
        longitud: -94.393789,
      },
      {
        latitud: 18.029894,
        longitud: -94.393777,
      },
      {
        latitud: 18.029751,
        longitud: -94.393789,
      },
      {
        latitud: 18.02959,
        longitud: -94.393789,
      },
      {
        latitud: 18.029436,
        longitud: -94.393765,
      },
      {
        latitud: 18.02931,
        longitud: -94.393837,
      },
      {
        latitud: 18.029195,
        longitud: -94.393771,
      },
      {
        latitud: 18.029018,
        longitud: -94.393783,
      },
      {
        latitud: 18.028903,
        longitud: -94.393801,
      },
      {
        latitud: 18.028749,
        longitud: -94.393795,
      },
      {
        latitud: 18.028588,
        longitud: -94.393801,
      },
      {
        latitud: 18.028462,
        longitud: -94.393795,
      },
      {
        latitud: 18.028343,
        longitud: -94.393896,
      },
      {
        latitud: 18.028248,
        longitud: -94.393958,
      },
      {
        latitud: 18.028198,
        longitud: -94.393994,
      },
      {
        latitud: 18.028137,
        longitud: -94.394044,
      },
      {
        latitud: 18.028074,
        longitud: -94.394094,
      },
      {
        latitud: 18.028033,
        longitud: -94.394137,
      },
      {
        latitud: 18.027982,
        longitud: -94.39419,
      },
      {
        latitud: 18.027968,
        longitud: -94.394344,
      },
      {
        latitud: 18.027944,
        longitud: -94.394442,
      },
    ],
  }),
  methods: {
    iniciar() {
      const max = this.coordenadas.length;
      let contador = 0;
      const prueba = setInterval(() => {
        if (contador < max) {
          let latitud = this.coordenadas[contador].latitud;
          let longitud = this.coordenadas[contador].longitud;
          fetch(
            `https://backend-xiinbalkiin.herokuapp.com/api/v1/bus/?idBus=10&latitud=${latitud}&longitud=${longitud}`
          )
            .then((response) => response.json())
            .then((data) => console.log(data));
          contador++;
        } else {
          console.log("TERMINE");
          clearInterval(prueba);
        }
      }, 1500);

      console.log(prueba);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>