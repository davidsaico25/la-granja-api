'use strict'

var connection = require('../models/connection');

var AbastecimientoModel = require('../models/abastecimiento');
var AbastecimientoHasItemModel = require('../models/abastecimiento_has_item');

var AbastecimientoController = () => { };

AbastecimientoController.get = (req, res) => {
    var abastecimiento_id = req.params.id;

    AbastecimientoModel.get(abastecimiento_id, (err, result) => {
        if (err) return res.status(500).send({ err });

        if (!result.length) {
            return res.status(500).send({ message: 'no existe abastecimiento' });
        }

        var abastecimiento = result[0].a;
        abastecimiento.local_origen = result[0].l1;
        abastecimiento.local_destino = result[0].l2;
        abastecimiento.estado_abastecimiento = result[0].ea;

        AbastecimientoHasItemModel.getList(abastecimiento_id, (err, result) => {
            if (err) return res.status(500).send({ err });

            abastecimiento.listAbastecimientoHasItem = listAbastecimientoHasItem;

            var listAbastecimientoHasItem = [];
            result.forEach(row => {
                row.ahi.item = row.i;
                row.ahi.item.unidad_medida = row.um;
                row.ahi.item.marca_item = row.m;
                listAbastecimientoHasItem.push(row.ahi);
            });

            abastecimiento.listAbastecimientoHasItem = listAbastecimientoHasItem;

            return res.status(200).send({ abastecimiento });
        });
    });
}

AbastecimientoController.create = (req, res) => {
    var params = req.body;

    var abastecimiento = {
        estado_abastecimiento_id: params.estado_abastecimiento_id,
        local_id_origen: params.local_id_origen,
        local_id_destino: params.local_id_destino
    };

    connection.beginTransaction((err) => {
        if (err) return res.status(500).send({ err });

        AbastecimientoModel.create(abastecimiento, (err, result) => {
            if (err) {
                connection.rollback(() => {
                    return res.status(500).send({ err });
                });
            }

            var array_abastecimiento_has_item = JSON.parse(params.abastecimiento_has_item);

            array_abastecimiento_has_item.forEach(abastecimiento_has_item => {
                abastecimiento_has_item.abastecimiento_id = result.insertId;

                AbastecimientoHasItemModel.create(abastecimiento_has_item, (err, result) => {
                    if (err) {
                        connection.rollback(() => {
                            return res.status(500).send({ err });
                        });
                    }
                });
            });

            connection.commit((err) => {
                if (err) {
                    connection.rollback(() => {
                        return res.status(500).send({ err });
                    });
                }
                return res.status(200).send({ id: result.insertId });
            });
        });
    });
};

module.exports = AbastecimientoController;