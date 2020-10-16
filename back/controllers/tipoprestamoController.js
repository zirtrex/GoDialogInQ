'use strict';

var tipoPrestamoModel = require('../models/tipoPrestamoModel');


async function obtenerTodo (req, res) {
  var tiposDePrestamo = tipoPrestamoModel.ObtenerTodo();
  res.send(tiposDePrestamo);
}

async function obtenerIDPorNombre (req, res) {
  res.send(modelo);
}

async function crear (req, res) {
  res.send(modelo);
}

async function actualizar (req, res) {
  res.send(modelo);
}

async function borrar (req, res) {
  res.send(modelo);
}



