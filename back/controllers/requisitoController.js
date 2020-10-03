'use strict';

var modelo = require('../models/requisitoModel');

exports.ObtenerPorId = async function (req, res) {
  res.send(modelo);
};

exports.obtenerRequisitosPorIdTipoPrestamo = async function (req, res) {
  res.send(modelo);
};

module.exports = modelo;

