const util = require("util");
const mysql = require("mysql");

// Connection to the database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "admin",
  password: "root",
  database: "www"
});

var getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    if (err) console.error("Something went wrong connecting to the database..");
    if (connection) connection.release();
    return;
  });
};

pool.query = util.promisify(pool.query);

// module.exports = getConnection;
module.exports = pool;
