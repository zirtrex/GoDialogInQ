'use strict';

const fetch   = require('node-fetch');
const logger = require("../utils/loggerUtil");

var config = require('../public/config.json');

var requisitoService = {};

const urlBase = config.ipServidor;

requisitoService.getRequisitosByIdTipoPrestamo = async function (idTipoPrestamo) {
  	try {
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/' + idTipoPrestamo);
		var response = await request.json();
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  }
}

module.exports = requisitoService;

