'use strict';

var express = require('express');
var router = express.Router();
var cliente = require('../controllers/clienteController');

router.get('/cliente', cliente.getAll);
router.get('/cliente/:documento', cliente.getByDocument);

router.post('/cliente', cliente.create);
router.put('/cliente/:idCliente', cliente.update);
router.delete('/cliente/:idCliente', cliente.delete);

module.exports = router;

