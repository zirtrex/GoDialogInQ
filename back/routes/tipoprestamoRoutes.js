'use strict';

var express = require('express');
var router = express.Router();
var tipoprestamo = require('../controllers/tipoprestamoController');

router.get('/tipoprestamo', tipoprestamo.ObtenerTodo);
router.get('/tipoprestamo/:idTipoPrestamo', tipoprestamo.ObtenerPorId);

module.exports = router;

