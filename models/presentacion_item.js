'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var PresentacionItemModel = () => { };

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

PresentacionItemModel.create = (presentacionItemData, callback) => {
    var sql = "INSERT INTO `presentacion_item` SET ?";
    connection.query(sql, [presentacionItemData], callback);
}

PresentacionItemModel.update = (presentacion_item_id, presentacionItemData, callback) => {
    var sql = "UPDATE `presentacion_item` SET ? WHERE `id`= ?";
    connection.query(sql, [presentacionItemData, presentacion_item_id], callback);
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