'use strict'

var GrupoItemModel = require('../models/grupo_item');

var GrupoItemController = () => { };

GrupoItemController.getAll = (req, res) => {
    GrupoItemModel.getAll((err, listGrupoItem) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ listGrupoItem });
    });
}

GrupoItemController.get = (req, res) => {
    var id = req.params.id;

    GrupoItemModel.get(id, (err, listGrupoItem) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ grupoItem: listGrupoItem[0] });
    });
}

module.exports = GrupoItemController;