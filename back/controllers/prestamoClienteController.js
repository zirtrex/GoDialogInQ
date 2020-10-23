'use strict';

var model = require('../models/prestamoClienteModel');

var prestamoClienteController = {};

prestamoClienteController.getAll = async function (req, res) {
  try {
    var prestamoCliente = await model.getAll();
    res.send(
      {
        status:'success',
        message: "",
        result: prestamoCliente
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

prestamoClienteController.getByIdPrestamoCliente = async function (req, res) {
  var idPrestamoCliente = req.params.idPrestamoCliente;
  try {
    var prestamoCliente = await model.getByIdPrestamoCliente(idPrestamoCliente);
    if (Object.entries(prestamoCliente).length === 0) {
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
        result: prestamoCliente
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

prestamoClienteController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  try {
    var prestamoCliente = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
    if (Object.entries(prestamoCliente).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result:null
        }
      );
    }else
    {
      res.status(200).send(
        {
          status:'success',
          message: "",
          result: prestamoCliente
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

prestamoClienteController.getAllByIdCliente = async function (req, res) {
    var idCliente = req.params.idCliente;
    try {
      var prestamoCliente = await model.getAllByIdCliente(idCliente);
      if (Object.entries(prestamoCliente).length === 0) {
        res.status(404).send(
          {
            status:'failed',
            message: "No se pudo encontrar el recurso necesario",
            result:null
          }
        );
      }else
      {
        res.status(200).send(
          {
            status:'success',
            message: "",
            result: prestamoCliente
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


prestamoClienteController.create = async function (req, res) {
  var prestamoCliente = req.body;
  try {
    var result = await model.create(prestamoCliente);
    if(result.affectedRows>0)
    {
      res.status(201).send({
      status:'success',
      message: "Prestamo Cliente creado correctamente",
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

module.exports = prestamoClienteController;
