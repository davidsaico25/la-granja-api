'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

var api = express.Router();
var md_upload = multipart({ uploadDir: './uploads/items' });

var ItemController = require('../controllers/item');

api.get('/get/:id', md_auth.ensureAuth, ItemController.get);
api.get('/get_list', md_auth.ensureAuth, ItemController.getList);
api.get('/get_list/:grupo_item_id', md_auth.ensureAuth, ItemController.getListByGrupoItem);

module.exports = api;