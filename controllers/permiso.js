'use strict'

var PermisoModel = require('../models/permiso');

var PermisoController = () => { };

PermisoController.getListPermiso = (req, res) => {
    var perfil_id = req.params.perfil_id;

    PermisoModel.getListPermiso(perfil_id, (err, listPermiso) => {
        if (err) return res.status(500).send({ err });
        res.status(200).send({ listPermiso });
    });
}

module.exports = PermisoController;