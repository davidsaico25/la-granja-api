'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var GrupoItemController = require('../controllers/grupo_item');

api.get('/get_list', md_auth.ensureAuth, GrupoItemController.getAll);
api.get('/get/:id', md_auth.ensureAuth, GrupoItemController.get);

module.exports = api;