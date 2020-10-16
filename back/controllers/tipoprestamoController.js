'use strict';

var model = require('../models/tipoPrestamoModel');

var tipoPrestamoController = {};

tipoPrestamoController.getAll = async function (req, res) {
  var tiposPrestamo = await model.getAll();
  res.send(tiposPrestamo);
}

tipoPrestamoController.getIdPrestamoByNombre = async function (req, res) {
  var nombreTipoPrestamo = req.params.nombreTipoPrestamo;
  var idTipoPrestamo = await model.getIdTipoPrestamoByNombre(nombreTipoPrestamo);
  res.send(idTipoPrestamo);
}

tipoPrestamoController.create = async function (req, res) {
  var tipoPrestamo = req.body;
  try {
    var result = await model.create(tipoPrestamo);
    res.send({
      status:'success',
      result,
      message: "Tipo de préstamo creado correctamente"
    });   
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha fallado la inserción",
      err      
    });  
  }  
}

tipoPrestamoController.update = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var tipoPrestamo = req.body;
  try {
    var result = await model.update(idTipoPrestamo, tipoPrestamo);
    res.send({
      status:'success',
      message: "Tipo de préstamo actualizado correctamente",
      result: result
    });
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha fallado la inserción",
      err      
    });  
  } 
}

tipoPrestamoController.delete = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  try {
    var result = await model.delete(idTipoPrestamo);
    res.send({
      status:'success',
      message: "Tipo de préstamo eliminado correctamente",
      result: result
    });
  } catch (error) {
    res.send({
      status:'failed',
      message: "Ha fallado la eliminación",
      err      
    });  
  } 
}

module.exports = tipoPrestamoController;