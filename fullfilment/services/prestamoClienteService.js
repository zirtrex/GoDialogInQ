'use strict';

const fetch = require('node-fetch');
const logger = require("../utils/loggerUtil");
const { performance, PerformanceObserver } = require('perf_hooks');

var prestamoClienteService = {};

const {
	BACK_PROTOCOL,
    BACK_HOST,
    BACK_PORT
} = process.env;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

prestamoClienteService.saveOrUpdatePrestamoCliente = async function (idSession, PrestamoCliente) {
	try {		
		var request = await fetch(urlBase + '/prestamo_cliente/session/' + 1);
		var response = await request.json();
		console.log(response);
		if (response.status == "success") {
			var request = await fetch(urlBase + '/prestamo_cliente/session/' + idSession, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(PrestamoCliente)
			});
			var response = await request.json();
			return response;
		} else {
			var request = await fetch(urlBase + '/prestamo_cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(PrestamoCliente)
			});
			var response = await request.json();
			return response;
		}
	} catch (error) {
		console.log(response);
		logger.debug(error);
		throw new Error(error);
  	}
}

prestamoClienteService.getPrestamoCliente = async function (idSession) {
	try {		
		var request = await fetch(urlBase + '/prestamo_cliente/session/' + idSession);
		var response = await request.json();
		return response;
	} catch (error) {
		console.log(response);
		logger.debug(error);
		throw new Error(error);
  	}
}

module.exports = prestamoClienteService;

