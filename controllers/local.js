'use strict'

var LocalModel = require('../models/local');

var LocalController = () => { };

LocalController.getAll = (req, res) => {
    LocalModel.getAll((err, listLocal) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ listLocal });
    });
}

LocalController.get = (req, res) => {
    var id = req.params.id;

    if (id == null) {
        LocalModel.getAll((err, listLocal) => {
            if (err) return res.status(500).send({ err });

            return res.status(200).send({ listLocal });
        });
    } else {
        LocalModel.get(id, (err, listLocal) => {
            if (err) return res.status(500).send({ err });
    
            return res.status(200).send({ local: listLocal[0] });
        });
    }
}

module.exports = LocalController;