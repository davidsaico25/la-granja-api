'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'rds-mysql-instance.cbr5sl3fmc9c.us-east-1.rds.amazonaws.com',
    user: 'davisonsp',
    password: 'davisonsp',
    database: 'db_la_granja'
});

connection.connect((err) => {
    if (err) console.log('Error connexion bd: ' + err.message);
    console.log('conexion a la bd correcta');
});

module.exports = connection;