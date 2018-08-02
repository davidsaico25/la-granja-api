'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var LocalHasItemModel = () => {};

LocalHasItemModel.getInventarioByLocal = (local_id, callback) => {
    var sql = "SELECT *" +
    " FROM `local_has_item` AS lhi" +
    " INNER JOIN `item` AS i" +
    " ON (i.`id` = lhi.`item_id`)" +
    " INNER JOIN `unidad_medida` AS um" +
    " ON (um.`id` = i.`unidad_medida_id`)" +
    " INNER JOIN `marca_item` AS mi" +
    " ON (mi.`id` = i.`marca_item_id`)" +
    " WHERE lhi.`local_id` = ?;";

    var params = [local_id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

LocalHasItemModel.getByLocalAndItem = (local_id, item_id, callback) => {
    let sql = "SELECT *" +
    " FROM `local_has_item` AS lhi" +
    " WHERE lhi.`local_id` = ?" +
    " AND lhi.`item_id` = ?;";

    let params = [local_id, item_id];

    sql = mysql.format(sql, params);

    connection.query(sql, callback);
}

module.exports = LocalHasItemModel;