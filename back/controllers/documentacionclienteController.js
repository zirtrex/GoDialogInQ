'use strict';

var model = require('../models/documentacionClienteModel');

var documentacionClienteController = {};

documentacionClienteController.getAll = async function (req, res) {
  try {
    var documentacionCliente = await model.getAll();
    res.send(documentacionCliente);
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  } 
}

documentacionClienteController.getByIdDocumentacionCliente = async function (req, res) {
  var idDocumentacionCliente = req.params.idDocumentacionCliente;
  try {
    var documentacionCliente = await model.getByIdDocumentacionCliente(idDocumentacionCliente);
    if (Object.entries(documentacionCliente).length === 0) {
      res.status(404).send(
        {
          status:'error',
          message: "No se pudo encontrar el recurso necesario",
        }
      );
    }else
    {
    res.send(documentacionCliente);
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  } 
}

documentacionClienteController.getAllByIdPrestamoCliente = async function (req, res) {
  var idPrestamoCliente = req.params.idPrestamoCliente;
  try {
    var documentacionCliente = await model.getAllByIdPrestamoCliente(idPrestamoCliente);
    if (Object.entries(documentacionCliente).length === 0) {
      res.status(404).send(
        {
          status:'error',
          message: "No se pudo encontrar el recurso necesario",
        }
      );
    }else
    {
    res.send(documentacionCliente);
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  } 
}


documentacionClienteController.create = async function (req, res) {
  var documentacionCliente = req.body;
  try {
    var result = await model.create(documentacionCliente);
    if(result.affectedRows>0)
    {
      res.status(201).send({
      status:'success',
      result,
      message: "Documentacion Cliente creado correctamente"
    }); 
    }else
    {
      res.status(400).send({
        status:'failed',
        result,
        message: "La creación ha fallado"
      });
      
    }

  } catch (error) {
    res.status(500).send({
      status:'error',
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
module.exports = documentacionClienteController;
