'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/usuarioController');

router.post('/usuario/login', controller.getByCorreo);

router.post('/usuario/registro', controller.create);


module.exports = router;