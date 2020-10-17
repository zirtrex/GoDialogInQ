'use strict';

var model = require('../models/requisitoModel');

var requisitoController = {};

requisitoController.getAll = async function (req, res) {
  var requisito = await model.getAll();
  res.send(requisito);
}

requisitoController.getByIdRequisito = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  var requisito = await model.getByIdRequisito(idRequisito);
  res.send(requisito);
}

requisitoController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var requisito = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
  res.send(requisito);
}


requisitoController.create = async function (req, res) {
  var requisito = req.body;
  try {
    var result = await model.create(requisito);
    res.send({
      status:'success',
      result,
      message: "Requisito creado correctamente"
    });   
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  }  
}

requisitoController.update = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  var requisito = req.body;
  try {
    var result = await model.update(idRequisito, requisito);
    res.send({
      status:'success',
      message: "Requisito actualizado correctamente",
      result: result
    });
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  } 
}

requisitoController.delete = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  try {
    var result = await model.delete(idRequisito);
    res.send({
      status:'success',
      message: "Requisito eliminado correctamente",
      result: result
    });
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error      
    });  
  } 
}

module.exports = requisitoController;
