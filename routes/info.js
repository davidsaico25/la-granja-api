'use strict'

var express = require('express');

var api = express.Router();

var InfoController = require('../controllers/info');

api.get('/info', InfoController.info);

module.exports = api;