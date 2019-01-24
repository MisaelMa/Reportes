<template>
  <v-app>
    <v-toolbar app color="grey darken-4" dark>
      <!-- class="headline text-uppercase" -->
      <v-toolbar-title>Generador</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip v-if="conexion" bottom>
        <v-btn slot="activator" color="green" icon>
          <v-icon>signal_wifi_4_bar</v-icon>
        </v-btn>
        <span>Conectado</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <v-btn slot="activator" color="green" icon>
          <v-icon class="white--text">warning</v-icon>
        </v-btn>
        <span>Error</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <v-data-table :items="desserts" class="elevation-1" hide-headers>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.nombre }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import bd from "./services/mysql";
@Component
export default class App extends Vue {
  public conexion = false;
  public error: any;
  public desserts = [];
  public mounted() {
    let Option = {};
    bd.find("tie_productos", "all", Option)
      .then((res: any) => {
        this.conexion = true;
        this.desserts = res;
      })
      .catch((err: any) => {});
  }
}
</script>
