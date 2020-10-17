'use strict';

var model = require('../models/prestamoclienteModel');

var prestamoclienteController = {};

prestamoclienteController.getAll = async function (req, res) {
  var prestamocliente = await model.getAll();
  res.send(prestamocliente);
}

prestamoclienteController.getByIdPrestamosCliente = async function (req, res) {
  var idPrestamosCliente = req.params.idPrestamosCliente;
  var prestamocliente = await model.getByIdPrestamosCliente(idPrestamosCliente);
  res.send(prestamocliente);
}

prestamoclienteController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var prestamocliente = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
  res.send(prestamocliente);
}

prestamoclienteController.getAllByIdCliente = async function (req, res) {
    var idCliente = req.params.idCliente;
    var prestamocliente = await model.getAllByIdCliente(idCliente);
    res.send(prestamocliente);
  }


prestamoclienteController.create = async function (req, res) {
  var prestamocliente = req.body;
  try {
    var result = await model.create(prestamocliente);
    res.send({
      status:'success',
      result,
      message: "Prestamo Cliente creado correctamente"
    });   
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error      
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
module.exports = prestamoclienteController;
