'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var TestController = require('../controllers/test');

api.post('/test_promise', md_auth.ensureAuth, TestController.testPromise);
api.post('/test_promiseAll', md_auth.ensureAuth, TestController.testPromiseAll);

module.exports = api;