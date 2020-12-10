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
            Sistema de ubicación de transporte público
          </h2>
          <p>
            Xiinbalkiin es un sistema de monitoreo para el transporte público en
            la modalidad de autobuses; que tiene como objetivo automatizar los
            procesos de la toma de autobuses.
          </p>
          <p>
            En el sur de Veracruz la mayoría de las personas no tienen una buena
            administración del tiempo, debido a eso, tienden a perder el
            transporte y se ven obligados a esperar él siguiente, y como
            consecuencia permanecer en espera por un poco más de tiempo, les
            ocasiona un sentido de frustración o molestia, hasta que el autobús
            próximo pueda abordarlos, entre tanto al estar esperando son
            expuestos y son vulnerables a ser asaltados, hurtados o secuestrados
            y a las inclemencias del tiempo(clima).
          </p>
        </v-col>
        <v-col cols="12">
          <p>
            <strong>Xiinbalkiin</strong> brindará la visualización de la ruta
            Coatzacoalcos-Ixhuatlán, la ubicación del usuario,el aproximado
            numero de asientos, las estaciones y el tiempo aproximado del
            autobús hacia la estación más cercana. Todo esto con ayuda de un
            dispositivo Arduino que a su vez llevará como complemento un módulo
            GPS qué nos brindará las coordenadas del autobús para conocer su
            ubicación y reflejándose de manera visible mediante un mapa en la
            aplicación web.
          </p>
        </v-col>
        <v-col cols="8">
          <p>
            Con esto pretendemos aumentar la eficiencia en relación a los
            traslados cotidianos y contribuir en la seguridad e integridad de
            cada individuo que hacen uso del transporte público, estas personas
            podrán planificar y administrar su tiempo con mejores resultados en
            su día a día. De igual forma se contribuirá en la prevención de
            robos y asaltos en las paradas de autobuses, se fomenta el cuidado
            de salud, tratando de evitar el menor tiempo posible en cuanto a la
            exposición al sol, previniendo así, una posible enfermedad de cáncer
            en la piel.
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