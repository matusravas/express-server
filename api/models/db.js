const mysql = require("mysql");
const dbConfig = require("../configs/db.config")

const conn = mysql.createConnection(dbConfig);

conn.connect(err => {
    if (err) {
        console.log("Unable to connect to DB, ended with code " + err.code);
        // throw err.code;
        return;
    }
    console.log("Connected to DB: " + conn.config.database);
})

module.exports = conn;