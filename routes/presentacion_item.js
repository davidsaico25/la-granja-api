'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

var api = express.Router();
var md_upload = multipart({uploadDir: './uploads/presentaciones_items'});

var PresentacionItemController = require('../controllers/presentacion_item');

api.get('/getListByItem/:item_id', md_auth.ensureAuth, PresentacionItemController.getListByItem);
api.post('/create', md_auth.ensureAuth, PresentacionItemController.create);
api.post('/update', md_auth.ensureAuth, PresentacionItemController.create);
api.get('/get/:id', md_auth.ensureAuth, PresentacionItemController.get);
api.post('/upload-image/:id', [md_auth.ensureAuth, md_upload], PresentacionItemController.uploadImage);
api.get('/get-image/:imageFile', PresentacionItemController.getImageFile);

module.exports = api;