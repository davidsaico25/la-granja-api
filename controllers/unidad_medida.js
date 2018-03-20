'use strict'

var UnidadMedidaModel = require('../models/unidad_medida');

var UnidadMedidaController = () => { };

UnidadMedidaController.get = (req, res) => {
    var id = req.params.id;

    UnidadMedidaModel.get(id, (err, listUnidadMedida) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ unidadMedida: listUnidadMedida[0] });
    });
}

module.exports = UnidadMedidaController;