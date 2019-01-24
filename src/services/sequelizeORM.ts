const config = require("../../db.json");
const Sequelize = require("sequelize");
class SequelizeOrm {
  public sequelize: any;

  constructor() {
    this.sequelize = new Sequelize(
      config.connections[0].database,
      config.connections[0].username,
      config.connections[0].password,
      {
        host: config.connections[0].host,
        dialect: "mysql",
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  }
  public checkConection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err: any) => {
        console.error("Unable to connect to the database:", err);
      });
  }
}

const Orm = new SequelizeOrm();
export default Orm;
