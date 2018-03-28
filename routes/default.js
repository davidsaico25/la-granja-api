'use strict'

var express = require('express');

var api = express.Router();

var DefaultController = require('../controllers/default');

api.get('/', DefaultController.index);
api.get('/info', DefaultController.info);

module.exports = api;