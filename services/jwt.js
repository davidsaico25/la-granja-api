'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = (usuario) => {
    var payload = {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        image: usuario.image,
        persona: usuario.persona,
        perfil: usuario.perfil,
        local: usuario.local,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};