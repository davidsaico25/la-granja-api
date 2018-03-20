'use strict'

var connection = require('./connection');

var UnidadMedidaModel = () => { };

UnidadMedidaModel.get = (unidad_medida_id, callback) => {
    var sql = "SELECT * FROM `unidad_medida` WHERE `id` = ?;";
    connection.query(sql, [unidad_medida_id], callback);
}

module.exports = UnidadMedidaModel;