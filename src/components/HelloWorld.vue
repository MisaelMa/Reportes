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
<style lang="css">
::-webkit-scrollbar {
  width: 0px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #039be5;
  border-radius: 0px;
}
</style>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    open: function() {
      /*console.log("a");
      this.loading = true;
      const { app, BrowserWindow } = require("electron").remote;
      const currentWindow = require("electron").remote.getCurrentWindow();

      //
      // Or use `remote` from the renderer process.
      // const { BrowserWindow } = require('electron').remote
      const modalPath =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8080/#/hoursWorks"
          : `file://${__dirname}/index.html#hoursWorks`;
      let win = new BrowserWindow({ width: 900, height: 600, show: false });
      win.loadURL(modalPath);
      win.webContents.on("did-finish-load", function() {
        currentWindow.hide();
        win.show();
        this.loading = false;
      });

      win.on("closed", () => {
        win = null;
        this.loading = false;
        currentWindow.show();
      });*/
    }
  }
};
</script>