<template>
  <div>
    <v-navigation-drawer
      v-model="localDrawer"
      @input="toggleDrawer()"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-img src="../assets/logo.png"></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link v-if="rol == 'admin'" to="/estaciones">
            <v-list-item-icon>
              <v-icon>mdi-file-table</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Estaciones de autobus</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            v-if="rol == 'admin' || rol == 'chofer'"
            to="/contador-asientos"
          >
            <v-list-item-icon>
              <v-icon>mdi-seat</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Contador de asientos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="cerrarSesion">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavigationDrawerComponent",
  props: {
    drawer: {
      type: Boolean,
    },
  },
  data() {
    return {
      rol: "",
      localDrawer: false,
    };
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer", this.localDrawer);
    },
    cerrarSesion() {
      this.localDrawer = false;
      this.toggleDrawer();
      sessionStorage.clear();
      if (this.$route.path != "/") this.$router.push("/");
      this.$store.state.session = false;
    },
  },
  computed: {
    ...mapState(["session"]),
  },
  watch: {
    drawer(val) {
      this.rol = sessionStorage.rol;
      console.log(val);
      this.localDrawer = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>