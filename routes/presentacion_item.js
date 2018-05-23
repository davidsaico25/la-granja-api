'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

var api = express.Router();
var md_upload = multipart({uploadDir: './uploads/presentaciones_items'});

var PresentacionItemController = require('../controllers/presentacion_item');

api.get('/getList', md_auth.ensureAuth, PresentacionItemController.getList);
api.get('/getListByItem/:item_id', md_auth.ensureAuth, PresentacionItemController.getListByItem);
api.post('/create', md_auth.ensureAuth, PresentacionItemController.create);
api.put('/update/:id', md_auth.ensureAuth, PresentacionItemController.update);
api.delete('/delete/:id', md_auth.ensureAuth, PresentacionItemController.delete);
api.put('/activate/:id', md_auth.ensureAuth, PresentacionItemController.activate);
api.put('/deactivate/:id', md_auth.ensureAuth, PresentacionItemController.deactivate);
api.get('/get/:id', md_auth.ensureAuth, PresentacionItemController.get);
api.post('/upload-image/:id', [md_auth.ensureAuth, md_upload], PresentacionItemController.uploadImage);
api.get('/get-image/:imageFile', PresentacionItemController.getImageFile);

module.exports = api;