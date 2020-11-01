const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//luodaan DB connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

//avataan MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("connected to the DB")
});

module.exports = connection;
