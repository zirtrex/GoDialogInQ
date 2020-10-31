'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/clienteController');

router.get('/cliente/', controller.getAll);

router.get('/cliente/:idCliente', controller.getByIdCliente);

router.get('/cliente/session/:idSession', controller.getByIdSession);

router.get('/cliente/documento/:documento', controller.getByDocumento);

router.post('/cliente', controller.create);

router.put('/cliente/:idCliente', controller.update);

router.delete('/cliente/:idCliente', controller.delete);

module.exports = router;


/* 
var express = require('express');
var router = express.Router();
var cliente = require('../controllers/clienteController');

router.get('/cliente', cliente.getAll);
router.get('/cliente/:documento', cliente.getByDocument);

router.post('/cliente', cliente.create);
router.put('/cliente/:idCliente', cliente.update);
router.delete('/cliente/:idCliente', cliente.delete);

module.exports = router; */

