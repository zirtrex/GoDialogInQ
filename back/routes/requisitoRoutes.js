'use strict';

var express = require('express');
var router = express.Router();

var controller = require('../controllers/requisitoController');

router.get('/requisito/', controller.getAll);

router.get('/requisito/:idRequisito', controller.getByIdRequisito);

router.get('/requisito/tipo_prestamo/:idTipoPrestamo', controller.getAllByIdTipoPrestamo);

router.post('/requisito', controller.create);

router.put('/requisito/:idRequisito', controller.update);

router.delete('/requisito/:idRequisito', controller.delete);


module.exports = router;