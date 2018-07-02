'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'db_la_granja',
    dateStrings: true
});

connection.connect((error) => {
    if (error) console.log('Error connexion bd: ' + error.message);
    console.log('conexion a la bd correcta');
});

module.exports = connection;

/*
var moment = require('moment');
var connection = require('knex')({
    client: 'mysql',
    connection: {
        host: db.host,
        user: db.user,
        password: db.password,
        database: db.database,
        timezone: 'UTC',
        typeCast: function (field, next) {
            if (field.type == 'DATETIME') {
                return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
            }
            return next();
        }
    }
});
*/
