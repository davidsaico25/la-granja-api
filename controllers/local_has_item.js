'use strict'

var LocalHasItemModel = require('../models/local_has_item');

var LocalHasInsumoController = () => { };

LocalHasInsumoController.getInventarioByLocal = (req, res) => {
    var local_id = req.params.local_id;

    if (local_id != req.usuario.local.id) {
        return res.status(500).send({ message: "usted no esta autorizado para ver este inventario" });
    }

    LocalHasItemModel.getInventarioByLocal(local_id, (err, result) => {
        if (err) return res.status(500).send({ err });

        var listLocalHasItem = [];
        result.forEach(local_has_item => {
            local_has_item.lhi.item = local_has_item.i;
            local_has_item.lhi.item.unidad_medida = local_has_item.um;
            local_has_item.lhi.item.marca_item = local_has_item.mi;
            listLocalHasItem.push(local_has_item.lhi);
        });

        return res.status(200).send({ listLocalHasItem });
    });
}

module.exports = LocalHasInsumoController;