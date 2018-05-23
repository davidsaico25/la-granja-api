'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var AbastecimientoHasItemModel = () => { };

AbastecimientoHasItemModel.getList = (abastecimiento_id, callback) => {
    var sql = "SELECT *" +
        " FROM `abastecimiento_has_item` AS ahi" +
        " INNER JOIN `item` AS i" +
        " ON (i.`id` = ahi.`item_id`)" +
        " INNER JOIN `unidad_medida` um" +
        " ON (um.`id` = i.`unidad_medida_id`)" +
        " INNER JOIN `marca_item` AS `m`" +
        " ON (m.`id` = i.`marca_item_id`)" +
        " WHERE ahi.`abastecimiento_id` = ?;";

    var params = [abastecimiento_id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

AbastecimientoHasItemModel.create = (data, callback) => {
    var sql = "INSERT INTO `abastecimiento_has_item` SET ?";

    connection.query(sql, [data], callback);
}

module.exports = AbastecimientoHasItemModel;