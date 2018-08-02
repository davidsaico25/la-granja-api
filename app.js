'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var abastecimiento_routes = require('./routes/abastecimiento');
var grupo_item_routes = require('./routes/grupo_item');
var default_routes = require('./routes/default');
var item_routes = require('./routes/item');
var local_routes = require('./routes/local');
var local_has_item_routes = require('./routes/local_has_item');
var permiso_routes = require('./routes/permiso');
var presentacion_item_routes = require('./routes/presentacion_item');
var test_routes = require('./routes/test');
var unidad_medida_routes = require('./routes/unidad_medida');
var usuario_routes = require('./routes/usuario');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, cache-control, x-requested-with');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	
	next();
});

app.use('/', default_routes);
app.use('/api/abastecimiento', abastecimiento_routes);
app.use('/api/grupo_item', grupo_item_routes);
app.use('/api/item', item_routes);
app.use('/api/local', local_routes);
app.use('/api/local_has_item', local_has_item_routes);
app.use('/api/permiso', permiso_routes);
app.use('/api/presentacion_item', presentacion_item_routes);
app.use('/api/test', test_routes);
app.use('/api/unidad_medida', unidad_medida_routes);
app.use('/api/usuario', usuario_routes);

module.exports = app;