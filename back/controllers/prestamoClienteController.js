'use strict';

var model = require('../models/prestamoClienteModel');

var prestamoClienteController = {};

prestamoClienteController.getAll = async function (req, res) {
  try {
    var prestamoCliente = await model.getAll();
    res.send(prestamoCliente);
    } catch (error) {
      res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
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
          status:'error',
          message: "No se pudo encontrar el recurso necesario",
        }
      );
    }else
    {
    res.send(prestamoCliente);
    }
  } catch (error) {
    res.status(500).send({
    status:'error',
    message: "Ha ocurrido un error",
    error: error.message      
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
          status:'error',
          message: "No se pudo encontrar el recurso necesario",
        }
      );
    }else
    {
    res.send(prestamoCliente);
    }
  } catch (error) {
    res.status(500).send({
    status:'error',
    message: "Ha ocurrido un error",
    error: error.message      
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
            status:'error',
            message: "No se pudo encontrar el recurso necesario",
          }
        );
      }else
      {
      res.send(prestamoCliente);
      }
    } catch (error) {
      res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
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
      result,
      message: "Prestamo Cliente creado correctamente"
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
module.exports = prestamoClienteController;
