<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline"> Eliminar usuario </v-card-title>
      <v-card-text
        >Esta seguro que, ¿desea eliminar al usuario

        <strong> {{ usuario.nombre }} {{ usuario.apellidos }} </strong>
        ?
        <p>Esta acción no podrá ser revertida.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="eliminar" :loading="loading">
          Sí, eliminar
        </v-btn>
        <v-btn color="green darken-1" dark depressed @click="$emit('cancel')">
          No, cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EliminarUsuario",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    usuario: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    eliminar() {
      this.loading = true;
      this.$emit("delete", this.usuario.id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>