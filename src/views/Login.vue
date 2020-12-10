<template>
  <v-container>
    <v-row class="login d-flex justify-center align-center">
      <v-col cols="6">
        <v-card>
          <v-card-title> Login </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              dense
              label="Usuario"
              placeholder="Ingresa tu usuario"
              v-model="user.user"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              v-model="user.psw"
            ></v-text-field>

            <v-alert dense outlined type="error" v-if="error">
              {{ errorMessage }}
            </v-alert>
            <v-btn block @click="iniciarSesion">Ingresar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      user: "",
      psw: "",
    },
    error: false,
    errorMessage: "",
  }),
  methods: {
    iniciarSesion() {
      if (this.user.user == "admin" && this.user.psw == "admin") {
        sessionStorage.setItem("sessionStart", true);
        sessionStorage.setItem("rol", "admin");
        this.$store.state.session = true;
        this.$router.push("/");
        return;
      }

      if (this.user.user == "chofer" && this.user.psw == "chofer") {
        sessionStorage.setItem("sessionStart", true);
        sessionStorage.setItem("rol", "chofer");
        this.$store.state.session = true;
        this.$router.push("/");
        return;
      }

      this.error = true;
      this.errorMessage = "Usuario y/o contraseña son incorrectas";

      setTimeout(() => {
        this.error = false;
        this.errorMessage = "";
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 85vh;
  color: red;
}
</style>