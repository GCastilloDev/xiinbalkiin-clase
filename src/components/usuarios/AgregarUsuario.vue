<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline"> Agregar usuario </v-card-title>
      <v-card-text>
        <v-form class="my-5" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="data.nombre"
            label="Nombre"
            placeholder="Ingresa el nombre del usuario"
            outlined
            dense
            :rules="required"
          ></v-text-field>

          <v-text-field
            v-model="data.apellidos"
            label="Apellidos"
            placeholder="Ingresa los apellidos del usuario"
            outlined
            dense
            :rules="required"
          ></v-text-field>

          <v-text-field
            v-model="data.usuario"
            label="Usuario"
            placeholder="Ingresa usuario"
            outlined
            dense
            :rules="required"
          ></v-text-field>

          <v-text-field
            v-model="data.psw"
            label="Contraseña"
            placeholder="Ingresa la contraseña del usuario"
            type="password"
            outlined
            dense
            :rules="required"
          ></v-text-field>

          <v-select
            v-model="data.rol"
            :items="roles"
            label="Rol"
            placeholder="Selecciona el rol del usuario"
            dense
            outlined
            :rules="required"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="red darken-1" text @click="$emit('cancel')">
          cancelar
        </v-btn>
        <v-btn
          color="green darken-1"
          dark
          depressed
          @click="crearUsuario"
          :loading="loading"
        >
          {{ isEdit ? "Editar" : "Crear" }} usuario
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../common/Firebase";

export default {
  name: "AgregarUsuario",
  async mounted() {
    if (this.isEdit) this.initEdit();
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    usuario: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    valid: true,
    data: {
      nombre: "",
      apellidos: "",
      psw: "",
      rol: "",
      usuario: "",
    },
    roles: ["admin", "chofer"],
    loading: false,
    required: [(v) => !!v || "El campo es requerido"],
  }),
  methods: {
    async initEdit() {
      try {
        const response = await db
          .collection("usuarios")
          .doc(this.usuario.id)
          .get();

        this.data = response.data();
        this.data.id = response.id;
      } catch (error) {
        console.warn(error);
      }
    },
    async crearUsuario() {
      if (!this.$refs.form.validate()) return true;

      if (this.isEdit) {
        this.edit();
        return true;
      }

      try {
        this.loading = true;
        await db.collection("usuarios").doc().set(this.data);
        this.$emit("refresh");
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async edit() {
      try {
        this.loading = true;
        await db.collection("usuarios").doc(this.data.id).update(this.data);
        this.$emit("refresh");
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>