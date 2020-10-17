'use strict';

var model = require('../models/prestamoClienteModel');

var prestamoClienteController = {};

prestamoClienteController.getAll = async function (req, res) {
  var prestamoCliente = await model.getAll();
  res.send(prestamoCliente);
}

prestamoClienteController.getByIdPrestamoCliente = async function (req, res) {
  var idPrestamoCliente = req.params.idPrestamoCliente;
  var prestamoCliente = await model.getByIdPrestamoCliente(idPrestamoCliente);
  res.send(prestamoCliente);
}

prestamoClienteController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var prestamoCliente = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
  res.send(prestamoCliente);
}

prestamoClienteController.getAllByIdCliente = async function (req, res) {
    var idCliente = req.params.idCliente;
    var prestamoCliente = await model.getAllByIdCliente(idCliente);
    res.send(prestamoCliente);
  }


prestamoClienteController.create = async function (req, res) {
  var prestamoCliente = req.body;
  try {
    var result = await model.create(prestamoCliente);
    res.send({
      status:'success',
      result,
      message: "Prestamo Cliente creado correctamente"
    });   
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  }  
}
/* 
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
      error      
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
 */
module.exports = prestamoClienteController;
