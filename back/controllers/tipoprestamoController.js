'use strict';

var modelo = require('../models/tipoPrestamoModel');

exports.ObtenerTodo = async function (req, res) {
  res.send(modelo);
};

exports.obtenerIDPorNombre = async function (req, res) {
  res.send(modelo);
};

exports.crear = function(req, res) {
  res.send(modelo);
};

exports.actualizar = function(req, res) {
  res.send(modelo);
};

exports.borrar = function(req, res) {
  res.send(modelo);
};

module.exports = modelo;

