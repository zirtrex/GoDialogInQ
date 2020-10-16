'use strict';

var express = require('express');
var router = express.Router();
var tipoPrestamoController = require('../controllers/tipoPrestamoController');

router.get('/tipo_prestamo', tipoPrestamoController.obtenerTodo);


router.get('/tipo_prestamo/:nombreTipoPrestamo', tipoPrestamo.obtenerIDPorNombre);

router.post('/tipo_prestamo', tipoPrestamo.crear);
router.put('/tipo_prestamo/:idTipoPrestamo', tipoPrestamo.actualizar);
router.delete('/tipo_prestamo/:idTipoPrestamo', tipoPrestamo.borrar);


module.exports = router;

