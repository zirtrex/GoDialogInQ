'use strict';

var model = require('../models/documentacionclienteModel');

var documentacionclienteController = {};

documentacionclienteController.getAll = async function (req, res) {
  var documentacioncliente = await model.getAll();
  res.send(documentacioncliente);
}

documentacionclienteController.getByIdDocumentacionCliente = async function (req, res) {
  var idDocumentacionCliente = req.params.idDocumentacionCliente;
  var documentacioncliente = await model.getByIdDocumentacionCliente(idDocumentacionCliente);
  res.send(documentacioncliente);
}

documentacionclienteController.getAllByIdPrestamosCliente = async function (req, res) {
  var idPrestamosCliente = req.params.idPrestamosCliente;
  var documentacioncliente = await model.getAllByIdPrestamosCliente(idPrestamosCliente);
  res.send(documentacioncliente);
}

  documentacionclienteController.create = async function (req, res) {
  var documentacioncliente = req.body;
  try {
    var result = await model.create(documentacioncliente);
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
module.exports = documentacionclienteController;
