'use strict';

const fetch = require('node-fetch');
const logger = require("../utils/loggerUtil");

var config = require('../public/config.json');

var tipoPrestamoService = {};

const urlBase = config.ipServidor;

tipoPrestamoService.getAll = async function () {
	try {
		var request = await fetch(urlBase + '/tipo_prestamo');
		var response = await request.json();	
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  	}
}

tipoPrestamoService.getByNombre = async function (nombreTipoPrestamo) {
	try {
		var request = await fetch(urlBase + '/tipo_prestamo/nombre/' + nombreTipoPrestamo);
		var response = await request.json();
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  	}
}

module.exports = tipoPrestamoService;

