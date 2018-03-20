'use strict'

var mysql = require('mysql');
var connection = require('./connection');

var UsuarioModel = () => { };

UsuarioModel.getAll = (callback) => {
    var sql = "SELECT * FROM `usuarios`";
    connection.query(sql, callback);
}

UsuarioModel.getOne = (username, callback) => {
    var sql = "SELECT *" +
    " FROM `usuario` AS usuario" +
    " INNER JOIN `persona` AS persona" +
    " ON (persona.`id` = usuario.`persona_id`)" +
    " INNER JOIN `perfil` AS perfil" +
    " ON (perfil.`id` = usuario.`perfil_id`)" +
    " INNER JOIN `local` AS local" +
    " ON (local.`id` = usuario.`local_id`)" +
    " WHERE usuario.`username` = ?;";

    var params = [username];

    sql = mysql.format(sql, params);

    var options = { sql: sql, nestTables: true };
    connection.query(options, callback);
}

UsuarioModel.create = (usuarioData, callback) => {
    var sql = "INSERT INTO `usuario` SET ?";
    connection.query(sql, usuarioData, callback);
}

UsuarioModel.update = (username, usuarioData, callback) => {
    var sql = "UPDATE `usuario` SET ? WHERE `username`= ?";
    connection.query(sql, [usuarioData, username], callback);
}

module.exports = UsuarioModel;