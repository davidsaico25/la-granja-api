'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var UnidadMedidaController = require('../controllers/unidad_medida');

api.get('/get/:id', md_auth.ensureAuth, UnidadMedidaController.get);

module.exports = api;