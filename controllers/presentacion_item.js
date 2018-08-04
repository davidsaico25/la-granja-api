'use strict'

var fs = require('fs');
var path = require('path');

var PresentacionItemModel = require('../models/presentacion_item');

var PresentacionItemController = () => { };

PresentacionItemController.get = (req, res) => {
    var id = req.params.id;
    PresentacionItemModel.get(id, (err, listPresentacionItem) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ presentacion_item: listPresentacionItem[0] });
    });
}

PresentacionItemController.getList = (req, res) => {
    PresentacionItemModel.getList((err, result) => {
        if (err) return res.status(500).send({ err });

        var listPresentacionItem = [];
        
        result.forEach(row => {
            row.pi.item = row.i;
            row.pi.item.unidad_medida = row.um;
            listPresentacionItem.push(row.pi);
        });

        return res.status(200).send({ listPresentacionItem });
    });
}

PresentacionItemController.getListByItem = (req, res) => {
    var item_id = req.params.item_id;
    PresentacionItemModel.getListByItem(item_id, (err, result) => {
        if (err) return res.status(500).send({ err });

        var listPresentacionItem = [];
        result.forEach(presentacionItem => {
            presentacionItem.pi.item = presentacionItem.i;
            presentacionItem.pi.item.unidad_medida = presentacionItem.um;
            listPresentacionItem.push(presentacionItem.pi);
        });

        return res.status(200).send({ listPresentacionItem });
    });
}

PresentacionItemController.create = (req, res) => {
    var params = req.body;
    params.imagen = 'item.png';

    var errors = [];

    validate_codigo_barra(params, errors)
        .then(() => {
            return validate_crud(params, errors);
        })
        .then(() => {
            if (errors.length > 0) return res.status(500).send({ errors });

            PresentacionItemModel.create(params, (err, result) => {
                if (err) return res.status(500).send({ err });

                params.id = result.insertId;

                return res.status(200).send({ presentacion_item: params });
            });
        });
}

PresentacionItemController.update = (req, res) => {
    var id = req.params.id;

    var params = req.body;

    var errors = [];

    validate_crud(params, errors)
        .then(() => {
            if (errors.length > 0) return res.status(500).send({ errors });

            PresentacionItemModel.update(id, params, (err, result) => {
                if (err) return res.status(500).send({ err });

                return res.status(200).send({ result });
            });
        });
}

PresentacionItemController.delete = (req, res) => {
    var id = req.params.id;

    PresentacionItemModel.delete(id, (err, result) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ result });
    });
}

PresentacionItemController.activate = (req, res) => {
    var id = req.params.id;

    var data = { estado: 'A' };

    PresentacionItemModel.update(id, data, (err, result) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ result });
    });
}

PresentacionItemController.deactivate = (req, res) => {
    var id = req.params.id;

    var data = { estado: 'D' };

    PresentacionItemModel.update(id, data, (err, result) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ result });
    });
}

PresentacionItemController.uploadImage = (req, res) => {
    var presentacion_item_id = req.params.id;
    var file_name = 'no subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            PresentacionItemModel.update(presentacion_item_id, { imagen: file_name }, (err, result) => {
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

PresentacionItemController.getImageFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/presentaciones_items/' + imageFile;

    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(500).send({ message: 'No existe la imagen' });
        }
    });
}

module.exports = PresentacionItemController;

//FUNCTIONS

function validate_codigo_barra(data, errors) {
    var codigo_barra = data.codigo_barra;

    var promise = new Promise(function (resolve, reject) {
        if (!codigo_barra) resolve(errors);

        PresentacionItemModel.getByCodigoBarra(codigo_barra, (err, listPresentacionItem) => {
            if (err) reject(err);

            if (listPresentacionItem.length > 0) {
                errors.push('codigo de barra ya existe');
                resolve(errors);
            } else {
                resolve(errors);
            }
        });
    });

    return promise;
}

function validate_crud(data, errors) {
    if (!data.codigo_barra) data.codigo_barra = null;
    var codigo_barra = data.codigo_barra;
    var nombre = data.nombre;

    var promise = new Promise(function (resolve, reject) {
        if (codigo_barra && codigo_barra.length != 13) {
            errors.push('codigo barra debe tener 13 caracteres');
        }

        if (!nombre) errors.push('la presentacion debe tener un nombre');

        resolve(errors);
    });

    return promise;
}