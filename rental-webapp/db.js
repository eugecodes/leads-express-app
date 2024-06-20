const mysql = require('mysql2');
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
  prod: {
    host: "",
    user: "",
    database: "",
    password: "",
  }
};

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : parameters.dev.host,
  user            : parameters.dev.user,
  password        : parameters.dev.password,
  database        : parameters.dev.database
});

module.exports = pool;