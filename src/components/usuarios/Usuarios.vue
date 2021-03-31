<template>
  <v-container>
    <h1 class="text-center my-5">Administrador de usuarios</h1>

    <v-card>
      <v-card-title>
        Usuarios
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
          @click="agregarUsuario"
          color="deep-purple darken-1"
          dark
          depressed
          >Agregar usuario<v-icon right>mdi-account-plus</v-icon></v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :loading="loading"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.acciones="{ item }">
          <!-- Boton de eliminar estacion -->
          <v-btn icon color="red" @click="eliminar(item)"
            ><v-icon small> mdi-delete </v-icon></v-btn
          >

          <!-- Boton de editar estacion -->
          <v-btn icon color="blue" @click="editar(item)"
            ><v-icon small> mdi-pencil </v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>

    <component
      v-if="dialog"
      :is="component"
      :dialog="dialog"
      :usuario="usuario"
      :isEdit="isEdit"
      @cancel="dialog = false"
      @delete="eliminarUsuarioFirestore"
      @refresh="refresh"
    ></component>
  </v-container>
</template>

<script>
import { db } from "../../common/Firebase";

export default {
  name: "Usuarios",
  mounted() {
    this.obtenerUsuarios();
  },
  components: {
    EliminarUsuario: () => import("./EliminarUsuario"),
    AgregarUsuario: () => import("./AgregarUsuario"),
  },
  data: () => ({
    search: "",
    component: "",
    isEdit: false,
    loading: false,
    dialog: false,
    usuario: {},
    headers: [
      {
        text: "Usuario",
        align: "start",
        value: "usuario",
      },
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      { text: "Apellidos", value: "apellidos" },
      { text: "Rol", value: "rol" },
      { text: "Acciones", value: "acciones" },
    ],
    items: [],
  }),
  methods: {
    async obtenerUsuarios() {
      try {
        this.loading = true;
        const response = await db.collection("usuarios").get();

        response.docs.forEach(async (e) => {
          const user = e.data();
          user.id = e.id;
          delete user.psw;
          this.items.push(user);
        });
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async eliminar(usuario) {
      this.component = "EliminarUsuario";
      this.usuario = usuario;
      this.dialog = true;
    },
    async eliminarUsuarioFirestore(id) {
      try {
        await db.collection("usuarios").doc(id).delete();
        this.items = [];
        await this.obtenerUsuarios();
        this.dialog = false;
      } catch (error) {
        console.warn(error);
      }
    },
    async editar(item) {
      const user = Object.assign({}, item);
      user.psw = "";
      this.usuario = user;
      this.isEdit = true;
      this.component = "AgregarUsuario";
      this.dialog = true;
    },
    agregarUsuario() {
      this.isEdit = false;
      this.component = "AgregarUsuario";
      this.dialog = true;
    },
    async refresh() {
      this.items = [];
      await this.obtenerUsuarios();
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>