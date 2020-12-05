'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/mensajeClienteController');

router.get('/mensaje_cliente/', controller.getAll);

/*router.get('/documentacion_cliente/:idDocumentacionCliente', controller.getByIdDocumentacionCliente);

router.get('/documentacion_cliente/prestamo_cliente/:idPrestamoCliente', controller.getAllByIdPrestamoCliente);
*/

router.post('/mensaje_cliente', controller.create);



module.exports = router;