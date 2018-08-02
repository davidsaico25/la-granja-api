'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var AbastecimientoController = require('../controllers/abastecimiento');

api.get('/get/:id', md_auth.ensureAuth, AbastecimientoController.get);
api.get('/get_list_by_estado/:id?', md_auth.ensureAuth, AbastecimientoController.getListByEstado);
api.post('/create', md_auth.ensureAuth, AbastecimientoController.create);
api.put('/update/:id', md_auth.ensureAuth, AbastecimientoController.update);
api.put('/confirmar/:id', md_auth.ensureAuth, AbastecimientoController.confirmar);

module.exports = api;