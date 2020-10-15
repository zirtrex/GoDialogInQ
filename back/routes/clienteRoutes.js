'use strict';

var express = require('express');
var router = express.Router();
var cliente = require('../controllers/clienteController');

router.get('/cliente', cliente.getAll);
router.get('/cliente/:Documento', cliente.obtenerPorDocumento);
router.post('/cliente', cliente.crear);


module.exports = router;

