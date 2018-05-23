'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var AbastecimientoController = require('../controllers/abastecimiento');

api.get('/get/:id', md_auth.ensureAuth, AbastecimientoController.get);
api.post('/create', md_auth.ensureAuth, AbastecimientoController.create);

module.exports = api;