var mysql = require("mysql");
// Initialize pool
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "srv1132.hstgr.io",
    user: "u160357475_firensafety",
    password: "123abcAB@",
    database: "u160357475_firensafety",
});

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected to Mysql database");
    connection.release();
});

module.exports = pool;
