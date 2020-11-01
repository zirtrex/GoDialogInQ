'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/prestamoClienteController');

router.get('/prestamo_cliente/', controller.getAll);

router.get('/prestamo_cliente/detalle/', controller.getAllClienteTipoPrestamo);

router.get('/prestamo_cliente/:idPrestamoCliente', controller.getByIdPrestamoCliente);

router.get('/prestamo_cliente/session/:idSession', controller.getByIdSession);

router.get('/prestamo_cliente/tipo_prestamo/:idTipoPrestamo', controller.getAllByIdTipoPrestamo);

router.get('/prestamo_cliente/cliente/:idCliente', controller.getAllByIdCliente);

router.post('/prestamo_cliente', controller.create);

router.put('/prestamo_cliente/session/:idSession', controller.updateIdSession);

module.exports = router;