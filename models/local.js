'use strict'

var connection = require('./connection');

var LocalModel = () => { };

LocalModel.getAll = (callback) => {
    var sql = "SELECT * FROM `local` WHERE `estado` = 'A';";
    connection.query(sql, callback);
}

LocalModel.get = (id, callback) => {
    var sql = "SELECT * FROM `local` WHERE `id` = ? AND `estado` = 'A';";
    connection.query(sql, [id], callback);
}

module.exports = LocalModel;