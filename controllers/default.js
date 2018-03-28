'use strict'

var DefaultController = () => { };

DefaultController.index = (req, res) => {
    return res.status(200).send({ message: 'Welcome to La Granja API v6' });
}

DefaultController.info = (req, res) => {
    return res.status(200).send({ message: 'Info La-Granja v6' });
}

module.exports = DefaultController;