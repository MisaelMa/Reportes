<template>
  <v-app>
    <v-toolbar app color="grey darken-4" dark>
      <!-- class="headline text-uppercase" -->
      <v-toolbar-title>Generador</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn color="green" icon>
        <v-icon>signal_wifi_4_bar</v-icon>
      </v-btn>

      <v-btn color="green" icon>
        <v-icon class="white--text">warning</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
