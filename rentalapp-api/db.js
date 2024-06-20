const mysql = require("mysql2");

/* parameters */
const parameters = {
  dev: {
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database: "rentalapp", // DATABASE NAME
    password: "", // DATABASE PASSWORD
  },
  test: {
    host: "freedb.tech", // HOST NAME
    user: "freedbtech_anythingblabla", // USER NAME
    database: "freedbtech_anythingblabla", // DATABASE NAME
    password: "anythingblabla", // DATABASE PASSWORD
  },
  /*
  test: {
    host: "db4free.net", // HOST NAME
    user: "rentalappapi", // USER NAME
    database: "rentalappapi", // DATABASE NAME
    password: "Testing2021!$", // DATABASE PASSWORD
  },
  */
  prod: {
    host: "",
    user: "",
    database: "",
    password: "",
  }
};

const db_connection = mysql.createConnection(parameters.dev).on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;