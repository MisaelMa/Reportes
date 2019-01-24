<template>
  <v-container row wrap child-flex fluid>
    <v-dialog v-model="loading" fullscreen content-class="loading-dialog">
      <v-container fill-height row justify-center align-center>
        <v-card color="primary" dark width="300">
          <v-card-actions class="pb-0">
            <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text class="pt-0">Cargando....
            <v-progress-linear indeterminate color="white" class="mb-0 mt-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>
    <v-flex xs12>
      <v-card color class="white--text">
        <v-card-title>
          <v-flex xs12 sm3 pr-3>
            <v-select
              :items="usuarios"
              v-model="consulta.idusuario"
              item-text="nombre"
              item-value="id"
              label="Cajeras"
            ></v-select>
          </v-flex>

          <v-flex xs12 sm3>
            <v-menu
              :close-on-content-click="false"
              v-model="calendario1"
              lazy
              transition="scale-transition"
            >
              <v-text-field
                slot="activator"
                v-model="consulta.inicio"
                label="Fecha de Inicio"
                prepend-icon="event"
                @blur="date = parseDate(consulta.inicio)"
                readonly
              ></v-text-field>
              <v-date-picker v-model="consulta.inicio" no-title @input="calendario1 = false"></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm3>
            <v-menu
              :close-on-content-click="false"
              v-model="calendario2"
              lazy
              transition="scale-transition"
            >
              <v-text-field
                slot="activator"
                v-model="consulta.fin"
                label="Fecha de Fin"
                prepend-icon="event"
                @blur="date = parseDate(consulta.fin)"
              ></v-text-field>
              <v-date-picker v-model="consulta.fin" no-title @input="calendario2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex>
            <v-btn style="float: right; margin-right: 10px;" color="primary" dark>Buscar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
    <br>
    <v-flex xs12>
      <v-card>
        <v-toolbar-title>
          <v-tooltip top>
            <a
              :href="excelfile"
              target="_blank"
              id="re"
              download="reportes.xlsx"
              slot="activator"
              class="v-btn theme--dark green"
              style="min-width: 2px; margin: 0px;"
              dark
            >
              <v-icon>grid_on</v-icon>
            </a>
            <span>Export Excel</span>
          </v-tooltip>
        </v-toolbar-title>
        <v-layout row wrap>
          <v-flex xs4></v-flex>
          <v-flex xs8></v-flex>
        </v-layout>

        <!--<v-layout justify-space-around>
    <v-flex    xs12>
    
          <v-list >
            <v-list-tile>
              <v-list-tile-content></v-list-tile-content>
              <v-list-tile-content class="align-end"></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content></v-list-tile-content>
              <v-list-tile-content ></v-list-tile-content>
            </v-list-tile>
     
          </v-list>
    </v-flex>

    <v-flex  xs12>
           <div  style="float: right;">
           <table>
            <tr>
              <th>SubTotal</th>
              <th class="pl-5">{{ventacantidad.sub}}</th>
            </tr>

            <tr>
              <th>Iva</th>
              <th class="pl-5">{{ventacantidad.iva}}</th>
            </tr>

            <tr>
              <th>Total</th>
              <th class="pl-5">{{ventacantidad.total}}</th>
            </tr>
          </table>
          </div>
    </v-flex>
        </v-layout>-->
        <v-card-text>
          <v-data-table :headers="HeadTablaRoles" :items="ventas" expand item-key="id">
            <template slot="items" slot-scope="props" color="gray">
              <tr>
                <td class="margin-table">{{ props.item.vendedor.nombre }}</td>
                <td class="margin-table">{{ props.item.folio }}</td>
                <td class="margin-table">
                  {{ props.item.matricula }}
                  <span
                    v-if="props.item.id_modalidad==1"
                  >{{ props.item.alumnos.matricula }}</span>
                  <span v-if="props.item.id_modalidad==2">{{ props.item.externos.matricula }}</span>
                </td>
                <td class="margin-table">
                  <span
                    v-if="props.item.id_modalidad==1"
                  >{{ props.item.alumnos.nombre }} {{ props.item.alumnos.ap_paterno }} {{ props.item.alumnos.ap_materno }}</span>
                  <span
                    v-if="props.item.id_modalidad==2"
                  >{{ props.item.externos.nombre }} {{ props.item.externos.ap_paterno }} {{ props.item.externos.ap_materno }}</span>
                </td>
                <td class="margin-table">
                  <!--<v-list dense>
                     <span v-for="(pro,i) in props.item.productos">
                     <v-list-tile-title>
                        {{ pro.producto.nombre}} {{formatoprecio(pro.producto.precio*1.16) }}
                     </v-list-tile-title>

                     </span>
                  </v-list>-->
                  <table style="width:100%">
                    <tbody>
                      <tr v-for="(prod,i) in props.item.productos" :key="i">
                        <td style="padding: 0 24px; margin:0px; ">{{ prod.cantidad}}</td>
                        <td style="padding: 0 24px; margin:0px 0px; ">{{ prod.producto.nombre}}</td>
                        <td
                          style="padding: 0 24px; margin:0px; "
                        >{{ formatoprecio(prod.cantidad * (prod.producto.precio*1.16))}}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td style="height: 18px; padding-top:0px;" colspan="2">
                          <strong>Total</strong>
                        </td>
                        <td style="height: 18px; padding-top:0px;">{{suma(props.item.productos) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </td>
                <td class="margin-table" style="padding:5px;">
                  <table style="width:100%">
                    <tr v-for="(formp,i) in props.item.formaspago" :key="i">
                      <td
                        class="ingreso"
                        style="padding:0px; font-size:10px;"
                      >{{ formp.formasdepago.nombre }}</td>
                      <td class="ingreso" style="padding:0px;">
                        <span v-if="formp.id_forma_pago==1">{{ formp.cantidad - props.item.cambio }}</span>
                        <span v-else>{{formp.cantidad}}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td>{{ props.item.observaciones}}</td>

                <td class="margin-table">
                  {{ props.item.created_at}}
                  <span v-if="props.item.formaspago.length==1">
                    <span v-if="props.item.formaspago[0].id_forma_pago!=1">
                      <span v-if="props.item.cambio>0">
                        <v-alert type="primary" color="red" :value="true">Erorr</v-alert>
                      </span>
                    </span>
                  </span>
                </td>
              </tr>
            </template>
            <template slot="no-data">No data available</template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<style >
.loading-dialog {
  background-color: rgba(255, 255, 255, 0.5);
}

table tbody td.ingreso,
table tbody th.ingreso {
  height: 10px;
}

table.v-table tfoot tr {
  height: 25px;
}
</style>

<script>
export default {
  name: "Roles",
  data() {
    return {
      loading: false,
      usuarios: [],
      consulta: {
        idusuario: "all",
        inicio: null,
        fin: null
      },
      dateFormatted: null,
      calendario1: false,
      calendario2: false,
      total: 0,
      ingresouser: [],
      ventas: [],
      ventacantidad: {
        sub: 0,
        iva: 0,
        total: 0
      },
      excelfile: null,
      HeadTablaRoles: [
        { text: "vendedor", sortable: false },
        { text: "folio", sortable: false },
        { text: "matricula", sortable: false },
        { text: "alumno", sortable: false },
        { text: "concepto", sortable: false },
        { text: "Forma de pago", sortable: false },
        { text: "Observaciones", sortable: false },
        { text: "fecha", sortable: false }
      ]
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted: function() {
    this.getusuarioscaja();
  },
  methods: {}
};
/*
Quien cobro
concepto
*/
</script>
