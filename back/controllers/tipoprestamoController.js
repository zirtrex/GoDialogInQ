'use strict';

var modelo = require('../models/tipoprestamoModel');

exports.ObtenerTodo = async function (req, res) {
  res.send(modelo);
};

exports.ObtenerPorId = async function (req, res) {
  res.send(modelo);
};

module.exports = modelo;

