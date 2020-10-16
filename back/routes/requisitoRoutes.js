'use strict';

var express = require('express');
var router = express.Router();
var requisito = require('../controllers/requisitoController');


router.get('/requisito/', requisito.getAll);
//router.get('/requisito/:idRequisito', requisito.getById);
router.get('/requisito/:idTipoPrestamo', requisito.getByIdTipoPrestamo);

router.post('/requisito', requisito.crear);

router.post('/requisito', requisito.crear);
router.put('/requisito/:idTipoPrestamo', requisito.actualizar);
router.delete('/requisito/:idTipoPrestamo', requisito.borrar);


module.exports = router;

