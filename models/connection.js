'use strict'

var mysql = require('mysql');

/*
var connection = mysql.createConnection({
    host: '35.199.92.180',
    user: '',
    password: '',
    database: 'db_la_granja'
});
*/

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_la_granja',
    timezone: 'utc'
});

connection.connect((err) => {
    if (err) console.log('Error connexion bd: ' + err.message);
    console.log('conexion a la bd correcta');
});

module.exports = connection;