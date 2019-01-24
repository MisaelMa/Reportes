<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <h1 class="display-1 font-weight-bold mb-3">Bienvenidos</h1>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Reportes Disponibles</h2>

        <v-layout row wrap justify-center>
          <v-flex xs12>
            <v-btn color="blue" dark block @click="open" :loading="loading">Por horas</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn color="green" dark block @click="open" :loading="loading">Por horas asignadas</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
const { app, BrowserWindow } = require("electron").remote;
const currentWindow = require("electron").remote.getCurrentWindow();

//
// Or use `remote` from the renderer process.
// const { BrowserWindow } = require('electron').remote
const modalPath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/#/hoursWorks"
    : `file://${__dirname}/index.html#hoursWorks`;
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public loading = false;

  public open() {
    /*console.log("a");
    this.loading = true;

    let win = new BrowserWindow({ width: 900, height: 600, show: false });
    win.loadURL(modalPath);
    win.webContents.on("did-finish-load", function() {
      currentWindow.hide();
      win.show();
      loading = false;
    });

    win.on("closed", () => {
      win = null;
      this.loading = false;
      currentWindow.show();
    });*/
  }
}
</script>
