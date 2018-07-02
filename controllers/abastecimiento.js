'use strict'

var connection = require('../models/connection');
var moment = require('moment');

var AbastecimientoModel = require('../models/abastecimiento');
var AbastecimientoHasItemModel = require('../models/abastecimiento_has_item');

var AbastecimientoController = () => { };

AbastecimientoController.get = (req, res) => {
    var abastecimiento_id = req.params.id;

    AbastecimientoModel.get(abastecimiento_id, (error, result) => {
        if (error) return res.status(500).send({ error });

        if (!result.length) {
            return res.status(500).send({ message: 'no existe abastecimiento' });
        }

        var abastecimiento = result[0].a;
        abastecimiento.local_origen = result[0].l1;
        abastecimiento.local_destino = result[0].l2;
        abastecimiento.estado_abastecimiento = result[0].ea;

        AbastecimientoHasItemModel.getList(abastecimiento_id, (error, result) => {
            if (error) return res.status(500).send({ error });

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

    if (params.observacion.length == 0) params.observacion = null;

    var abastecimiento = {
        observacion: params.observacion,
        //estado_abastecimiento_id: params.estado_abastecimiento_id,
        estado_abastecimiento_id: 1,
        local_id_origen: params.local_id_origen,
        local_id_destino: params.local_id_destino
    };

    connection.beginTransaction(function (error) {
        if (error) { throw error; }

        AbastecimientoModel.create(abastecimiento, (error, result) => {
            if (error) {
                return connection.rollback(function () {
                    return res.status(500).send({ error });
                });
            }

            abastecimiento.id = result.insertId;

            var array_abastecimiento_has_item = JSON.parse(params.json_abastecimiento_has_item);

            let array = [];

            array_abastecimiento_has_item.forEach(abastecimiento_has_item => {
                abastecimiento_has_item.abastecimiento_id = abastecimiento.id;
                abastecimiento_has_item.item_id = abastecimiento_has_item.item.id;
                delete abastecimiento_has_item.item;
                array.push(Object.values(abastecimiento_has_item));
            });

            let columns = Object.keys(array_abastecimiento_has_item[0]);

            AbastecimientoHasItemModel.create(columns, array, (error, result) => {
                if (error) {
                    return connection.rollback(function () {
                        return res.status(500).send({ error });
                    });
                }
                connection.commit(function (error) {
                    if (error) {
                        return connection.rollback(function () {
                            return res.status(500).send({ error });
                        });
                    }
                    return res.status(200).send({ abastecimiento });
                });
            });
        });
    });
};

module.exports = AbastecimientoController;