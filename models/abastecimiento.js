'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var AbastecimientoModel = () => { };

AbastecimientoModel.get = (id, callback) => {
    var sql = "SELECT *" +
    " FROM `abastecimiento` AS a" +
    " INNER JOIN `local` AS l1" +
    " ON (a.`local_id_origen` = l1.`id`)" +
    " INNER JOIN `local` AS l2" +
    " ON (a.`local_id_destino` = l2.`id`)" +
    " INNER JOIN `estado_abastecimiento` AS ea" +
    " ON (ea.`id` = a.`estado_abastecimiento_id`)" +
    " WHERE a.`id` = ?;";

    var params = [id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

AbastecimientoModel.create = (data, callback) => {
    var sql = "INSERT INTO `abastecimiento` SET ?";
    connection.query(sql, [data], callback);
}

module.exports = AbastecimientoModel;