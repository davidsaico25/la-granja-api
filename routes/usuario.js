'use strict'

var express = require('express');

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

var api = express.Router();
var md_upload = multipart({ uploadDir: './uploads/usuarios' });

var UsuarioController = require('../controllers/usuario');

api.post('/login', UsuarioController.login);
api.get('/getAll', UsuarioController.getAll);
api.post('/create', UsuarioController.create);
api.put('/update/:username', md_auth.ensureAuth, UsuarioController.update);
api.post('/upload-image/:username', [md_auth.ensureAuth, md_upload], UsuarioController.uploadImage);
api.get('/get-image/:imageFile', UsuarioController.getImageFile);

api.get('/get-image-aws/:imageFile', UsuarioController.getImageAWS);
api.get('/get-url-image-aws/:imageFile', UsuarioController.getURLImageAWS);

module.exports = api;