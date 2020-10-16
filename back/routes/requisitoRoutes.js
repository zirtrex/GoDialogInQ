'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/requisitoController');

router.get('/requisito/', controller.getAll);

router.get('/requisito/:idTipoPrestamo', controller.getAllByIdTipoPrestamo);

router.get('/requisito/:idRequisito', controller.getByIdRequisito);

router.post('/requisito', controller.create);

router.put('/requisito/:idTipoPrestamo', controller.update);

router.delete('/requisito/:idTipoPrestamo', controller.delete);


module.exports = router;