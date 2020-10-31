'use strict';


var model = require('../models/clienteModel');

var clienteController = {};

clienteController.getAll = async function (req, res) {
  try {
    var cliente = await model.getAll();

    res.status(200).send({
      status:'success',
      message: "",
      result: cliente
    });
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
  }
}

clienteController.getByIdCliente = async function (req, res) {
  var idCliente = req.params.idCliente;
  try {
  var cliente = await model.getByIdCliente(idCliente);
  if (Object.entries(cliente).length === 0) {
    res.status(404).send(
      {
        status:'failed',
        message: "No se pudo encontrar el recurso necesario",
        result: []
      }
    );
  }else
  {
    res.status(200).send({
      status:'success',
      message: "",
      result: cliente
    });
  }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error      
    });  
  }
}



clienteController.getByIdSession = async function (req, res) {
  var idSession = req.params.idSession;
  try {
  var cliente = await model.getByIdSession(idSession);
  if (Object.entries(cliente).length === 0) {
    res.status(404).send(
      {
        status:'failed',
        message: "No se pudo encontrar el recurso necesario",
        result: []
      }
    );
  }else
  {
    res.status(200).send({
      status:'success',
      message: "",
      result: cliente
    });
  }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error      
    });  
  }
}



clienteController.getByDocumento = async function (req, res) {
  var documento = req.params.documento;
  try {
  var cliente = await model.getByDocumento(documento);
  if (Object.entries(cliente).length === 0) {
    res.status(404).send(
      {
        status:'failed',
        message: "No se pudo encontrar el recurso necesario",
        result: []
      }
    );
  }else
  {
    res.status(200).send({
      status:'success',
      message: "",
      result: cliente
    });
  }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error      
    });  
  }
}


clienteController.create = async function (req, res) {
  var cliente = req.body;
  try {
    var result = await model.create(cliente);
    if(result.affectedRows>0)
    {
      res.status(201).send({
      status:'success',
      message: "Cliente creado correctamente",
      result:result
      
    });
    }else
    {
        res.status(400).send({
        status:'failed',
        message: "La creación ha fallado",
        result:[]
        
      });
      
    }   
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error            
    });  
  }  
}

clienteController.update = async function (req, res) {
  var idCliente = req.params.idCliente;
  var cliente = req.body;
  try {
    var result = await model.update(idCliente, cliente);
    if(result.affectedRows>0)
    {
      res.status(200).send({
      status:'success',
      message: "Cliente actualizado correctamente",
      result: result
    });
  }else
  {

      res.status(404).send({
      status:'failed',
      message: "La modificación ha fallado",
      result: []
    });
  }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
  } 
}

clienteController.delete = async function (req, res) {
  var idCliente = req.params.idCliente;
  try {
    var result = await model.delete(idCliente);
    if(result.affectedRows>0)
    {
      res.status(200).send({
      status:'success',
      message: "Cliente eliminado correctamente",
      result: result
    });
    }else
    {
        res.status(404).send({
        status:'failed',
        message: "No se pudo eliminar ningun registro",
        result:[]
      });
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error      
    });  
  } 
}

module.exports = clienteController;

