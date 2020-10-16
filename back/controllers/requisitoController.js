'use strict';

var model = require('../models/requisitoModel');

var requisitoController = {};

requisitoController.getAll = async function (req, res) {  
  var result = await model.getAll();
  res.send(result);
}

requisitoController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var result = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
  res.send(result);
}

requisitoController.getByIdRequisito = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  res.send(modelo);
}

requisitoController.create = async function(req, res) {
  var requisito = req.body;
  try {
    var result = await model.create(requisito);
    res.send({
      status:'success',
      message: "Requisito creado correctamente.",
      result
    });
  } catch (error) {
    res.send({
      status: 'failed',
      message: "Ha ocurrido un error",
      error: error.message
    });
  }
}

requisitoController.update = function(req, res) {
  res.send(modelo);
}

requisitoController.delete = function(req, res) {
  res.send(modelo);
}

module.exports = requisitoController;