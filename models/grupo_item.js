'use strict'

var connection = require('./connection');

var GrupoItemModel = () => { };

GrupoItemModel.getAll = (callback) => {
    var sql = "SELECT * FROM `grupo_item`";
    connection.query(sql, callback);
}

GrupoItemModel.get = (grupo_item_id, callback) => {
    var sql = "SELECT * FROM `grupo_item` WHERE `id` = ?;";
    connection.query(sql, [grupo_item_id], callback);
}

module.exports = GrupoItemModel;