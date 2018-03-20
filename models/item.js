'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var ItemModel = () => { };

ItemModel.get = (id, callback) => {
    var sql = "SELECT *" +
    " FROM `item` AS i" +
    " INNER JOIN `unidad_medida` AS um" +
    " ON (um.`id` = i.`unidad_medida_id`)" +
    " INNER JOIN `marca_item` as mi" +
    " ON (mi.`id` = i.`marca_item_id`)" +
    " INNER JOIN `grupo_item` as gi" +
    " ON (gi.`id` = i.`grupo_item_id`)" +
    " WHERE i.`id` = ?" + 
    " AND i.`estado` = 'A';";

    var params = [id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

ItemModel.getListByGrupoItem = (grupo_item_id, callback) => {    
    var sql = "SELECT *" +
    " FROM `item` AS i" +
    " INNER JOIN `unidad_medida` AS um" +
    " ON (um.`id` = i.`unidad_medida_id`)" +
    " INNER JOIN `marca_item` as mi" +
    " ON (mi.`id` = i.`marca_item_id`)" +
    " WHERE i.`grupo_item_id` = ?" + 
    " AND i.`estado` = 'A'";

    var params = [grupo_item_id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

module.exports = ItemModel;