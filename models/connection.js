'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'db_la_granja'
});

connection.connect((err) => {
    if (err) console.log('Error connexion bd: ' + err.message);
    console.log('conexion a la bd correcta');
});

module.exports = connection;