'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var LocalHasItemController = require('../controllers/local_has_item');

api.get('/get/:local_id', md_auth.ensureAuth, LocalHasItemController.getInventarioByLocal);

module.exports = api;