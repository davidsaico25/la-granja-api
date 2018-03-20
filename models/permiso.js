'use strict'

var connection = require('./connection');

var Permiso = () => { };

Permiso.getListPermiso = (perfil_id, callback) => {
    var sql = "SELECT sm.`id` AS 'submodulo_id', sm.`nombre` AS 'submodulo'" +
    " FROM `permiso`" +
    " LEFT JOIN `perfil` AS p" +
    " ON (p.`id` = permiso.`perfil_id`)" +
    " LEFT JOIN `submodulo` AS sm" +
    " ON (sm.`id` = permiso.`submodulo_id`)" +
    " WHERE permiso.`perfil_id` = ?"
    " ORDER BY sm.`submodulo_id` ASC";
    connection.query(sql, [perfil_id], callback);
};

module.exports = Permiso;