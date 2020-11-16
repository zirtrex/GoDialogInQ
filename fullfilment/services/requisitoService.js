'use strict';

const fetch   = require('node-fetch');
const logger = require("../utils/loggerUtil");

const config = require('config');

var requisitoService = {};

const urlBase = config.get("ipServidor");

requisitoService.getRequisitosByIdTipoPrestamo = async function (idTipoPrestamo) {
  	try {
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/' + idTipoPrestamo);
		var response = await request.json();
		
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  }
}

module.exports = requisitoService;

