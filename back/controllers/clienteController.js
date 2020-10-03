'use strict';

var modelo = require('../models/clienteModel');

exports.ObtenerPorDocumento = async function (req, res) {
  res.send(modelo);
};

exports.Crear = function(req, res) {
  res.send(modelo);
};


module.exports = modelo;

