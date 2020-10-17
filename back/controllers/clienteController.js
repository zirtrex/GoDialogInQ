'use strict';


var model = require('../models/clienteModel');

var clienteController = {};

clienteController.getAll = async function (req, res) {
  var cliente = await model.getAll();
  res.send(cliente);
}

clienteController.getByIdCliente = async function (req, res) {
  var idCliente = req.params.idCliente;
  var cliente = await model.getByIdCliente(idCliente);
  res.send(cliente);
}


clienteController.create = async function (req, res) {
  var cliente = req.body;
  try {
    var result = await model.create(cliente);
    res.send({
      status:'success',
      result,
      message: "Cliente creado correctamente"
    });   
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha ocurrido un error",
      error      
    });  
  }  
}

clienteController.update = async function (req, res) {
  var idCliente = req.params.idCliente;
  var cliente = req.body;
  try {
    var result = await model.update(idCliente, cliente);
    res.send({
      status:'success',
      message: "Cliente actualizado correctamente",
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

clienteController.delete = async function (req, res) {
  var idCliente = req.params.idCliente;
  try {
    var result = await model.delete(idCliente);
    res.send({
      status:'success',
      message: "Cliente eliminado correctamente",
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

module.exports = clienteController;



/* 
var modelo = require('../models/clienteModel');

exports.getAll = async function (req, res) {

  res.send(modelo);
};

exports.ObtenerPorDocumento = async function (req, res) {

  res.send(modelo);

};

exports.Crear = function(req, res) {

  res.send(modelo);
  
};

 */
