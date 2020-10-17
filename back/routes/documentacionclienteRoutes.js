'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/documentacionClienteController');

router.get('/documentacion_cliente/', controller.getAll);

router.get('/documentacion_cliente/:idDocumentacionCliente', controller.getByIdDocumentacionCliente);

router.get('/documentacion_cliente/prestamo_cliente/:idPrestamoCliente', controller.getAllByIdPrestamoCliente);

router.post('/documentacion_cliente', controller.create);



module.exports = router;