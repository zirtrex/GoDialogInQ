'use strict';

var express = require('express');
var router = express.Router();
var tipoprestamo = require('../controllers/tipoprestamoController');

router.get('/tipoprestamo', tipoprestamo.ObtenerTodo);
router.get('/tipoprestamo/:nombreTipoPrestamo', tipoprestamo.obtenerIDPorNombre);

router.post('/tipoprestamo', tipoprestamo.crear);
router.put('/tipoprestamo/:idTipoPrestamo', tipoprestamo.actualizar);

router.delete('/tipoprestamo/:idTipoPrestamo', tipoprestamo.borrar);


module.exports = router;

