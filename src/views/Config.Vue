<template>
  <v-container>
    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content>
        <div slot="header">Usuarios</div>
        <v-card>
          <v-card-text>
            <v-data-table :items="users" hide-actions hide-headers>
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.password }}</td>
                <td class="text-xs-right">
                  <v-btn fab dark icon small color="cyan">
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Conexiones</div>
        <v-card>
          <v-card-text>
            <v-data-table :items="connections" hide-actions hide-headers>
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.ip }}</td>
                <td class="text-xs-right">{{ props.item.username }}</td>
                <td class="text-xs-right">{{ props.item.password }}</td>
                <td class="text-xs-right">
                  <v-btn fab dark icon small color="cyan">
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dbJson } from "@/services/dbJson";

@Component
export default class Config extends Vue {
  panel = [true, true, true];
  users = [];
  user = {};
  connections = [];
  connection = {};
  public mounted() {
    this.getUsers();
    this.getConections();
  }

  public getUsers() {
    dbJson
      .getUsers()
      .then((res: any) => {
        console.log(res);
        this.users = res;
        this.user = res[0];
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  public getConections() {
    dbJson
      .getConections()
      .then((res: any) => {
        console.log(res);
        this.connections = res;
        this.connection = res[0];
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
</script>
