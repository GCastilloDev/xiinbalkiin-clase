<template>
  <div class="grey lighten-5">
    <v-container>
      <v-row>
        <v-col cols="4" class="pa-0 ma-0 d-flex align-center">
          <img src="../assets/logo.png" alt="" class="logo" />
        </v-col>
        <v-col cols="8">
          <h1 class="text-center">Xiinbalkiin</h1>
          <h2 class="text-center mb-3">
            Prototipo de monitoreo del transporte público
          </h2>
          <p>
            Xiinbalkiin es un prototipo de sistema de monitoreo para el
            transporte público en la modalidad de autobuses; orientado a conocer
            la ubicación del autobús y el tiempo aproximado hacia el usuario,
            utilizando un módulo sim808 que estará vinculado a una placa Arduino
            UNO.
          </p>
          <p>
            Parte de la ciudadanía en general experimenta una problemática común
            a la hora de tomar el transporte público; al no conocer los tiempos
            de llegada o ubicación de este, repercute en el objetivo principal
            de los ciudadanos que es lograr llegar a su destino a tiempo.
          </p>
        </v-col>
        <v-col cols="12">
          <p>
            <strong>Xiinbalkiin</strong> brindará la visualización de la ruta
            Coatzacoalcos-Ixhuatlán, la ubicación del usuario, el aproximado
            número de asientos disponibles, las paradas y el tiempo aproximado
            del autobús hacia el usuario. Todo esto con ayuda de un dispositivo
            Arduino que a su vez llevará como complemento un módulo GPS qué nos
            brindará las coordenadas del autobús para conocer su ubicación y
            reflejándose de manera visible mediante un mapa en la aplicación
            web.
          </p>
        </v-col>
        <v-col cols="8">
          <p>
            El objetivo deseado es bajar el índice de ataques o robos a
            transeúntes, reducir el riesgo de exposición de los pasajeros a los
            distintos cambios climáticos que pueden ser perjudiciales para ellos
            en las distintas paradas del transporte público y que los ayudará a
            llegar a tiempo a sus destinos de una forma más eficiente.
          </p>
        </v-col>
        <v-col cols="4">
          <v-img src="../assets/seccion-principal.jpg"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  padding-left: 10px;
  padding-right: 10px;
  max-width: 100%;
}
</style>