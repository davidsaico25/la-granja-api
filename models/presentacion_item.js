'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var PresentacionItemModel = () => { };

PresentacionItemModel.getList = (callback) => {
    var sql = "SELECT *" +
    " FROM `presentacion_item` AS pi" +
    " INNER JOIN `item` AS i" +
    " ON (i.`id` = pi.`item_id`)" +
    " INNER JOIN `unidad_medida` AS um" +
    " ON (um.`id` = i.`unidad_medida_id`)" +
    " WHERE pi.`estado` = 'A';";

    sql = mysql.format(sql);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

PresentacionItemModel.getListByItem = (item_id, callback) => {
    var sql = "SELECT *" +
    " FROM `presentacion_item` AS pi" +
    " INNER JOIN `item` AS i" +
    " ON (i.`id` = pi.`item_id`)" +
    " WHERE pi.`item_id` = ?" +
    " AND pi.`estado` = 'A';";

    var params = [item_id];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

PresentacionItemModel.create = (data, callback) => {
    var sql = "INSERT INTO `presentacion_item` SET ?";
    connection.query(sql, [data], callback);
}

PresentacionItemModel.update = (id, data, callback) => {
    var sql = "UPDATE `presentacion_item` SET ? WHERE `id`= ?";
    connection.query(sql, [data, id], callback);
}

PresentacionItemModel.delete = (id, callback) => {
    var sql = "DELETE FROM `presentacion_item` WHERE `id`= ?";
    connection.query(sql, [id], callback);
}

PresentacionItemModel.get = (id, callback) => {
    var sql = "SELECT * FROM `presentacion_item` WHERE `id` = ?;";
    connection.query(sql, [id], callback);
}

PresentacionItemModel.getByCodigoBarra = (codigo_barra, callback) => {
    var sql = "SELECT * FROM `presentacion_item` WHERE `codigo_barra` = ?;";
    connection.query(sql, [codigo_barra], callback);
}

module.exports = PresentacionItemModel;