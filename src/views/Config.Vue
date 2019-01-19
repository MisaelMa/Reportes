<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const db = require("electron-db");
const electron = require("electron");
const app = electron.app || electron.remote.app;

@Component
export default class Config extends Vue {
  public mounted() {
    db.createTable("customers", (succ: any, msg: any) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  }
}
</script>
