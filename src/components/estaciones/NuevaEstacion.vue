<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <v-card-title class="headline"> Agregar nueva estación </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" class="mb-0 pb-0">
                <v-text-field
                  :rules="campoNecesario"
                  class="font-weight-bold"
                  label="Ingresa el nombre de la estación"
                  placeholder="Nombre de estación"
                  outlined
                  dense
                  v-model="estacion.nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mb-0 mt-0 pb-0 pt-0">
                <v-text-field
                  disabled
                  class="font-weight-bold"
                  label="Latitud estación"
                  placeholder="Latitud"
                  outlined
                  dense
                  v-model="estacion.latitud"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mb-0 mt-0 pb-0 pt-0">
                <v-text-field
                  disabled
                  class="font-weight-bold"
                  label="Longitud estación"
                  placeholder="Longitud"
                  outlined
                  dense
                  v-model="estacion.longitud"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <!-- Mapa -->
          <v-col cols="12">
            <div ref="mapaNuevaEstacion" class="mapa"></div>
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
          <v-btn color="green darken-1" dark depressed @click="guardar">
            Guardar estación
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Overlay -->
    <v-overlay :value="loading" z-index="999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
import { db, storage } from "../../common/Firebase";
import { firestore } from "firebase/app";

//Libreria LeaftLet
import L from "leaflet";

export default {
  mounted() {
    this.init();
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    valid: true,
    mapa: "",
    estacion: {
      nombre: "",
      latitud: 18.064681,
      longitud: -94.406837,
      imgUrl: "",
      rutaStorage: "",
    },
    image: "",
    imageFile: "",
    campoNecesario: [
      (v) => !!v || "El campo es requerido",
      (v) => (v && v.length >= 5) || "El campo requiere al menos 5 caracteres",
    ],
  }),
  methods: {
    async init() {
      await this.pintarMapa();
      await this.inicarMarcador();
    },
    pintarMapa() {
      const contenedorMapa = this.$refs.mapaNuevaEstacion;

      // instanciamos el mapa
      this.mapa = L.map(contenedorMapa, {
        center: [18.064681, -94.406837],
        zoom: 12,
      });

      // le agregamos la capa de personalizacion
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(this.mapa);
    },
    inicarMarcador() {
      // Pintamos el marcador y le pasamos la opcion para que se pueda arrastar
      const marcador = L.marker([18.064681, -94.406837], {
        draggable: true,
      }).addTo(this.mapa);

      //Listener o evento del marcador
      marcador.on("drag", (e) => {
        this.estacion.latitud = e.latlng.lat;
        this.estacion.longitud = e.latlng.lng;
      });
    },
    async guardar() {
      //Validamos las reglas del nombre de la estacion
      if (!this.$refs.form.validate()) return true;

      //Validamos que contenga una imagen el campo
      if (this.image === "") {
        alert("LA IMAGEN ES NECESARIA");
        return true;
      }

      try {
        this.loading = true;
        await this.subirImagen();
        await this.enviarDatosFirebase();
        this.image = "";
        this.$refs.form.reset();
        this.$emit("cancel");
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async enviarDatosFirebase() {
      const coordenadas = new firestore.GeoPoint(
        parseFloat(this.estacion.latitud),
        parseFloat(this.estacion.longitud)
      );

      const data = {
        nombre: this.estacion.nombre,
        coordenadas: coordenadas,
        urlImagen: this.estacion.imgUrl,
        rutaStorage: this.estacion.rutaStorage,
      };

      db.collection("estaciones")
        .add(data)
        .then(() => {});
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
      const ruta = `estaciones/${this.imageFile.name}`;

      try {
        const upload = await storage.child(ruta).put(this.imageFile);
        const urlImg = await upload.ref.getDownloadURL();
        this.estacion.imgUrl = urlImg;
        this.estacion.rutaStorage = ruta;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.mapa {
  width: 100%;
  height: 40vh;
  z-index: 1;
}
</style>