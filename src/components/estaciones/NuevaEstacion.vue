<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline"> Agregar nueva estación </v-card-title>
        <v-card-text>
          <pre>
                {{ estacion }}
          </pre>
          <v-col cols="12" class="mb-0 pb-0">
            <v-text-field
              label="Ingresa el nombre de la estación"
              placeholder="Nombre de estación"
              outlined
              dense
              v-model="estacion.nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-text-field
              label="Ingresa la latitud estación"
              placeholder="Latitud"
              outlined
              dense
              v-model="estacion.latitud"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-text-field
              label="Ingresa la longitud estación"
              placeholder="Longitud"
              outlined
              dense
              v-model="estacion.longitud"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-btn
              class="mb-5"
              block
              color="purple darken-4"
              dark
              @click="$refs.boton.click()"
            >
              <v-icon left>mdi-image-outline</v-icon>Adjuntar foto de de la
              estación
            </v-btn>

            <input
              type="file"
              accept="image/*"
              ref="boton"
              @change="processImage($event)"
              class="d-none"
            />
            <v-img v-if="image != ''" :src="image"></v-img>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" dark depressed @click="$emit('cancel')">
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            dark
            depressed
            @click="enviarDatosFirebase"
          >
            Guardar estación
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db, storage } from "../../common/Firebase";
import { firestore } from "firebase/app";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    estacion: {
      nombre: "",
      latitud: "",
      longitud: "",
      imgUrl: "",
    },
    image: "",
    imageFile: "",
  }),
  methods: {
    async enviarDatosFirebase() {
    
      await this.subirImagen();

      const coordenadas = new firestore.GeoPoint(
        parseFloat(this.estacion.latitud),
        parseFloat(this.estacion.longitud)
      );

      const data = {
        nombre: this.estacion.nombre,
        coordenadas: coordenadas,
        urlImagen: this.estacion.imgUrl,
      };

      db.collection("estaciones")
        .add(data)
        .then(() => {
          this.$emit("cancel");
        });
    },
    processImage(e) {
      this.imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = async (e) => {
        this.image = await e.target.result;
      };
    },
    async subirImagen() {
      try {
        const upload = await storage
          .child(`estaciones/${this.imageFile.name}`)
          .put(this.imageFile);
        const urlImg = await upload.ref.getDownloadURL();
        this.estacion.imgUrl = urlImg;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>