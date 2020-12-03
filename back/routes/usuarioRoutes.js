'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/usuarioController');

router.get('/usuario', controller.getByCorreo);

router.post('/usuario', controller.create);


module.exports = router;