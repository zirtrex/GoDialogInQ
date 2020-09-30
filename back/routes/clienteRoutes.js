'use strict';

var express = require('express');
var router = express.Router();
var cliente = require('../controllers/clienteController');

router.get('/cliente/:Documento', cliente.ObtenerPorDocumento);
router.post('/cliente', cliente.Crear);


module.exports = router;

