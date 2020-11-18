'use strict';

const fetch   = require('node-fetch');
const logger = require("../utils/loggerUtil");
const { performance, PerformanceObserver } = require('perf_hooks');

var requisitoService = {};

const {
	BACK_PROTOCOL,
    BACK_HOST,
    BACK_PORT
} = process.env;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

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

