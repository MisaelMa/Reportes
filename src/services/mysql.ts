import { promises } from "fs";

const config = require("../../db.json");
const mysql = require("mysql");
class Mysql {
  public connection: any;
  public online = false;
  public error = false;
  public result: any;
  constructor() {
    this.connection = mysql.createConnection({
      host: config.connections[0].host,
      user: config.connections[0].username,
      password: config.connections[0].password,
      database: config.connections[0].database
    });

    this.conection()
      .then((res: any) => {
        this.online = true;
      })
      .catch((err: any) => {
        this.online = false;

        this.error = err;
      });
  }
  public conection() {
    let local = this;
    return new Promise((resolve, reject) => {
      this.connection.connect(function(err: any) {
        if (err) {
          reject(err.stack);
          console.error("error connecting: " + err.stack);
          return;
        }

        local.connection;
        resolve(local.connection);
        //.threadId);
      });
    });
  }
  public Online() {
    return this.online;
  }
  public GetError() {
    return this.error;
  }

  /**
   * Método find
   *
   * Método que sirve para hacer consultas a la base de datos
   *
   * @param string $table nombe de la tabla a consultar
   * @param string $query tipo de consulta
   *  - all
   *  - first
   *  - count
   * @param array $options restriciones en la consulta
   *  - fields
   *  - conditions
   *  - group
   *  - order
   *  - limit
   * @return object
   */
  public async find(table: any, query: any, options: any) {
    let fields = "*";
    let parameters = "";
    let sql: string;
    if (options.fields) {
      fields = options.fields;
    }
    if (options.conditions) {
      parameters = " WHERE " + options.conditions;
    }
    if (options.group) {
      parameters += " GROUP BY " + options.group;
    }
    if (options.order) {
      parameters += " ORDER BY " + options.order;
    }
    if (options.limit) {
      parameters += " LIMIT " + options.limit;
    }
    switch (query) {
      case "all": {
        sql = "SELECT " + fields + " FROM " + table + " " + parameters;
        // $this -> result = $this -> connection -> query($sql);
        break;
      }
      case "count": {
        sql = "SELECT COUNT(*) FROM " + table + " " + parameters;
        // $result = $this -> connection -> query($sql);
        // $this -> result = $result -> fetchColumn();
        break;
      }
      case "first": {
        sql = "SELECT " + fields + " FROM " + table + " " + parameters;
        // $result = $this -> connection -> query($sql);
        // $this -> result = $result -> fetch();
        break;
      }

      default:
        sql = "SELECT " + fields + " FROM " + table + " " + parameters;
        // $this -> result = $this -> connection -> query($sql);
        break;
    }

    const result = new Promise((resolve, reject) => {
      this.connection.query(sql, function(
        error: any,
        results: any,
        fields: any
      ) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });

    let rows = await result;
    return rows;
  }
}

const bd = new Mysql();
export default bd;

/*
 if (bd.Online()) {
      this.conexion = true;
    } else {
      this.conexion = false;
      this.error = bd.GetError();
    }
    let query = {
      conditions: "tvd.id_tie_venta=tv.id and tp.id = tvd.id_producto",
      group: "",
      order: "",
      limit: "100"
    };
    bd.find(
      "tie_ventas tv,tie_venta_detalle tvd, tie_productos tp",
      "all",
      query
    )
      .then((response: any) => {
        this.desserts = response;
        console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
      }); */
