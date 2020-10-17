'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/documentacionclienteController');

router.get('/documentacion_cliente/', controller.getAll);

router.get('/documentacion_cliente/:idDocumentacionCliente', controller.getByIdDocumentacionCliente);

router.get('/documentacion_cliente/prestamo_cliente/:idPrestamosCliente', controller.getAllByIdPrestamosCliente);

router.post('/documentacion_cliente', controller.create);



module.exports = router;