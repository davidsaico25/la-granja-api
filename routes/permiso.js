'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');
var PermisoController = require('../controllers/permiso');

var api = express.Router();

api.get('/getPermisos/:perfil_id', md_auth.ensureAuth, PermisoController.getListPermiso);

module.exports = api;