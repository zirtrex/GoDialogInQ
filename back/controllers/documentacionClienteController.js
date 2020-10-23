'use strict';

var model = require('../models/documentacionClienteModel');

var documentacionClienteController = {};

documentacionClienteController.getAll = async function (req, res) {
  try {
    var documentacionCliente = await model.getAll();
    res.status(200).send(
      {
          status:'success',
          message: "",
          result: documentacionCliente
      }
      );

  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error.message      
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
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: null
        }
      );
    }else
    {
    res.status(200).send(
      {
        status:'success',
        message: "",
        result: documentacionCliente
      }
      );
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error.message      
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
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: null
        }
      );
    }else
    {
    res.status(200).send(
      {
        status:'success',
        message: "",
        result: documentacionCliente
      }
      );
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
      message: "Documentacion Cliente creado correctamente",
      result:result
      
    }); 
    }else
    {
      res.status(400).send({
        status:'failed',
        message: "La creación ha fallado",
        result:null
        
      });
      
    }

  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error.message      
    });  
  }  
}

module.exports = documentacionClienteController;
