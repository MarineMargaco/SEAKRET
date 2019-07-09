const util = require("util");
const mysql = require("mysql");

// Connection to the database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
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

// pool.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql =
//     "INSERT INTO spectacle(affiche, nom_artiste, nom_scene, adresse, date_heure, prix) VALUES ('', 'Lollapolooza', 'Hippidrome Longchamp', 'ahaha','','149€')";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

pool.query = util.promisify(pool.query);

// module.exports = getConnection;
module.exports = pool;
