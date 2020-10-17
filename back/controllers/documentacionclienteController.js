'use strict';

var model = require('../models/documentacionClienteModel');

var documentacionClienteController = {};

documentacionClienteController.getAll = async function (req, res) {
  var documentacionCliente = await model.getAll();
  res.send(documentacionCliente);
}

documentacionClienteController.getByIdDocumentacionCliente = async function (req, res) {
  var idDocumentacionCliente = req.params.idDocumentacionCliente;
  var documentacionCliente = await model.getByIdDocumentacionCliente(idDocumentacionCliente);
  res.send(documentacionCliente);
}

documentacionClienteController.getAllByIdPrestamoCliente = async function (req, res) {
  var idPrestamoCliente = req.params.idPrestamoCliente;
  var documentacionCliente = await model.getAllByIdPrestamoCliente(idPrestamoCliente);
  res.send(documentacionCliente);
}

  documentacionClienteController.create = async function (req, res) {
  var documentacionCliente = req.body;
  try {
    var result = await model.create(documentacionCliente);
    res.send({
      status:'success',
      result,
      message: "Documentacion Cliente creado correctamente"
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
module.exports = documentacionClienteController;
