const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
export class dbJson {
  public static user() {
    return db.has("users").value();
  }

  public static getUsers() {
    return new Promise((resolve, reject) => {
      if (this.user()) {
        resolve(db.get("users").value());
      } else {
        reject("Error ");
      }
    });
  }

  public static UpdateUsers() {}

  public static connection() {
    return db.has("connections").value();
  }

  public static getConections() {
    return new Promise((resolve, reject) => {
      if (this.connection()) {
        resolve(db.get("connections").value());
      } else {
        reject("Error ");
      }
    });
  }
  public static UpdateConections() {}
}
