'use strict'

var ItemModel = require('../models/item');

var ItemController = () => { };

ItemController.get = (req, res) => {
    var id = req.params.id;

    ItemModel.get(id, (err, result) => {
        if (err) return res.status(500).send({ err });

        var item = result[0].i;
        item.unidad_medida = result[0].um;
        item.marca_item = result[0].mi;
        item.grupo_item = result[0].gi;

        return res.status(200).send({ item });
    });
}

ItemController.getListByGrupoItem = (req, res) => {
    var grupo_item_id = req.params.grupo_item_id;
    
    ItemModel.getListByGrupoItem(grupo_item_id, (err, result) => {
        if (err) return res.status(500).send({ err });

        var listItem = [];
        result.forEach(item => {
            item.i.unidad_medida = item.um;
            item.i.marca_item = item.mi;
            listItem.push(item.i);
        });

        return res.status(200).send({ listItem });
    });
}

module.exports = ItemController;