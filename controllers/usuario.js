'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var moment = require('moment');

////
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./services/aws_config.json');
var http = require('http');
var util = require('util');
////
const request = require('request');
////

var UsuarioModel = require('../models/usuario');

var UsuarioController = () => { };

UsuarioController.login = (req, res) => {
    var params = req.body;

    var username = params.username;
    var password = params.password;

    UsuarioModel.getOne(username, (err, result) => {
        if (err) return res.status(500).send({ err });

        if (result.length == 0) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        var usuario = result[0].usuario;
        usuario.persona = result[0].persona;
        usuario.perfil = result[0].perfil;
        usuario.local = result[0].local;

        bcrypt.compare(password, usuario.password, (err, check) => {
            if (err) return res.status(500).send({ err });

            if (check) {
                if (params.getToken) {
                    return res.status(200).send({
                        token: jwt.createToken(usuario)
                    });
                } else {
                    delete usuario.password;
                    return res.status(200).send({ usuario });
                }
            } else {
                return res.status(500).send({ message: 'credenciales incorrectas' });
            }
        });
    });
}

UsuarioController.getAll = (req, res) => {
    UsuarioModel.getAll((err, listUsuario) => {
        if (err) return res.status(500).send({ err });
        return res.status(200).send({ listUsuario });
    });
}

UsuarioController.create = (req, res) => {
    var params = req.body;

    if (params.username != null && params.password != null) {
        //encriptar password
        bcrypt.hash(params.password, null, null, (err, hash) => {
            if (err) return res.status(500).send({ err });

            params.password = hash;
            //verificar que no exista user con el mismo username
            UsuarioModel.getOne(params.username, (err, listUsuario) => {
                if (err) return res.status(500).send({ err });

                if (listUsuario.length) {
                    return res.status(404).send({ message: 'username existe' });
                }
                //crear usuario
                UsuarioModel.create(params, (err, result) => {
                    if (err) return res.status(500).send({ err });

                    return res.status(200).send({ id: result.insertId });
                });
            });
        });
    } else {
        return res.status(500).send({ message: 'faltan parametros' });
    }
}

UsuarioController.update = (req, res) => {
    var username = req.params.username;
    var params = req.body;

    if (username != req.usuario.username) {
        return res.status(500).send({ message: 'No tiene permiso para acceder a la informacion de este usuario' });
    }

    //Update usuario
    UsuarioModel.update(username, params, (err, result) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ result });
    });
}

UsuarioController.uploadImage = (req, res) => {
    var username = req.params.username;
    var file_name = 'No subido...';

    if (username != req.usuario.username) {
        return res.status(500).send({ message: 'No tiene permiso para acceder a la informacion de este usuario' });
    }

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var file_split = file_name.split('\.');
        var file_ext = file_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            ////
            var image_name = req.files.image.name;
            var s3 = new AWS.S3();
            /*
            var bucketParams = { Bucket: 'davisonsp-media' };
            s3.createBucket(bucketParams);*/

            var CODE_PATH = './uploads/usuarios/';
            var fileBuffer = fs.readFileSync(CODE_PATH + file_name);
            var REMOTE_CODE_PATH = 'la-granja/personas/';
            var data = {
                ACL: 'public-read',
                Bucket: 'davisonsp-media',
                Key: REMOTE_CODE_PATH + image_name,
                Body: fileBuffer,
                ContentType: 'image'
            };
            s3.putObject(data, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succesfully uploaded the image! ');
                }
            });

            ////
            UsuarioModel.update(username, { image: file_name }, (err, result) => {
                if (err) return res.status(500).send({ err });

                res.status(200).send({ result });
            });
        } else {
            return res.status(200).send({ message: 'Extension del archivo no valida' });
        }
    } else {
        return res.status(200).send({ message: 'No has subido ninguna imagen...' });
    }
}

UsuarioController.getImageFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/usuarios/' + imageFile;

    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(200).send({ message: 'No existe la imagen' });
        }
    });
}

UsuarioController.getImageAWS = (req, res) => {
    var imageFile = req.params.imageFile;

    var requestSettings = {
        url: 'https://s3.amazonaws.com/davisonsp-media/la-granja/personas/' + imageFile,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
}

UsuarioController.getURLImageAWS = (req, res) => {
    var imageFile = req.params.imageFile;

    var s3 = new AWS.S3();
    var urlParams = { Bucket: 'davisonsp-media', Key: 'la-granja/personas/' + imageFile };
    s3.getSignedUrl('getObject', urlParams, function (err, url) {
        if (err) return res.status(500).send({ err });

        res.status(200).send({ url });
    });
}

UsuarioController.deleteImageAWS = (req, res) => {
    var params = { Bucket: 'davisonsp-media', Key: 'la-granja/personas/' + imageFile };
    s3.deleteObject(params, function (err, params) {
        if (err) return res.status(500).send({ err });

        res.status(200).send({ params });
    });
}

module.exports = UsuarioController;