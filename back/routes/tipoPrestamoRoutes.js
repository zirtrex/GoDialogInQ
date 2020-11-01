'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/tipoPrestamoController');

router.get('/tipo_prestamo', controller.getAll);

router.get('/tipo_prestamo/:nombreTipoPrestamo', controller.getIdTipoPrestamoByNombre);

router.get('/tipo_prestamo/nombre/:nombreTipoPrestamo', controller.getAllPrestamoByNombre);

router.post('/tipo_prestamo', controller.create);

router.put('/tipo_prestamo/:idTipoPrestamo', controller.update);

router.delete('/tipo_prestamo/:idTipoPrestamo', controller.delete);

module.exports = router;