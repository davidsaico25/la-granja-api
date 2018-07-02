'use strict'

var ItemModel = require('../models/item');

var ItemController = () => { };

ItemController.get = (req, res) => {
    var id = req.params.id;

    ItemModel.get(id, (error, result) => {
        if (error) return res.status(500).send({ error });

        var item = result[0].i;
        item.unidad_medida = result[0].um;
        item.marca_item = result[0].mi;
        item.grupo_item = result[0].gi;

        return res.status(200).send({ item });
    });
}

ItemController.getList = (req, res) => {
    ItemModel.getList((error, result) => {
        if (error) return res.status(500).send({ error });

        var listItem = [];

        result.forEach(row => {
            row.i.unidad_medida = row.um;
            row.i.marca_item = row.mi;
            row.i.grupo_item = row.gi;
            listItem.push(row.i);
        });

        return res.status(200).send({ listItem });
    });
}

ItemController.getListByGrupoItem = (req, res) => {
    var grupo_item_id = req.params.grupo_item_id;

    ItemModel.getListByGrupoItem(grupo_item_id, (error, result) => {
        if (error) return res.status(500).send({ error });

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