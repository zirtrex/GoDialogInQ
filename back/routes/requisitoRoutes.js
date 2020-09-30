'use strict';

var express = require('express');
var router = express.Router();
var requisito = require('../controllers/requisitoController');

router.get('/requisito/:idRequisito', requisito.ObtenerPorId);

module.exports = router;

