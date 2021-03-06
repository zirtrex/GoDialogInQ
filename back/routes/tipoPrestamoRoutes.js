'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/tipoPrestamoController');

router.get('/tipo_prestamo', controller.getAll);

router.get('/tipo_prestamo/:idTipoPrestamo', controller.getByIdTipoPrestamo);

router.get('/tipo_prestamo/nombretipoprestamo/:nombreTipoPrestamo', controller.getIdTipoPrestamoByNombre);

router.get('/tipo_prestamo/nombre/:nombreTipoPrestamo', controller.getPrestamoByNombre);

router.post('/tipo_prestamo', controller.create);

router.put('/tipo_prestamo/:idTipoPrestamo', controller.update);

router.delete('/tipo_prestamo/:idTipoPrestamo', controller.delete);

module.exports = router;