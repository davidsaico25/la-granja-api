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

PresentacionItemController.getListByItem = (req, res) => {
    var item_id = req.params.item_id;
    PresentacionItemModel.getListByItem(item_id, (err, result) => {
        if (err) return res.status(500).send({ err });

        var listPresentacionItem = [];
        result.forEach(presentacionItem => {
            presentacionItem.pi.item = presentacionItem.i;
            listPresentacionItem.push(presentacionItem.pi);
        });

        return res.status(200).send({ listPresentacionItem });
    });
}

PresentacionItemController.create = (req, res) => {
    var params = req.body;

    var codigo_barra = params.codigo_barra;

    var create_pi = false;

    if (codigo_barra) {
        PresentacionItemModel.getByCodigoBarra(codigo_barra, (err, listPresentacionItem) => {
            if (err) return res.status(500).send({ err });

            if (listPresentacionItem.length > 0) {
                return res.status(500).send({ message: 'El codigo de barra ya es usado' });
            } else {
                create_pi = true;
            }
        });
    } else {
        create_pi = true;
    }

    if (create_pi) {
        PresentacionItemModel.create(params, (err, result) => {
            if (err) return res.status(500).send({ message: err });

            return res.status(200).send({ id: result.insertId });
        });
    }
}

PresentacionItemController.update = (req, res) => {
    var params = req.body;

    var codigo_barra = params.codigo_barra;
    /*
        PresentacionItemModel.getByCodigoBarra(codigo_barra, (err, listPresentacionItem) => {
            if (err) return res.status(500).send({ err });
    
            if (listPresentacionItem.length > 0) {
                return res.status(500).send({ message: 'El codigo de barra ya es usado' });
            } else {
                PresentacionItemModel.create(params, (err, result) => {
                    if (err) return res.status(500).send({ message: err });
            
                    res.status(200).send({ id: result.insertId });
                });
            }
        });*/
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