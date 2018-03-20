'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var LocalController = require('../controllers/local');

api.get('/getAll', md_auth.ensureAuth, LocalController.getAll);
api.get('/get/:id?', md_auth.ensureAuth, LocalController.get);

module.exports = api;