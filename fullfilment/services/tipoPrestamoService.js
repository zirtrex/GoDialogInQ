'use strict';

const fetch = require('node-fetch');
const logger = require("../utils/loggerUtil");
const { performance, PerformanceObserver } = require('perf_hooks');
const config = require('config');

var tipoPrestamoService = {};

const urlBase =  process.env.BACK_HOST || config.get("ipServidor");

tipoPrestamoService.getAll = async function () {
	try {
		const t0 = performance.now();
		var request = await fetch(urlBase + '/tipo_prestamo');
		var response = await request.json();
		const t1 = performance.now();
		console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
		return response;
				
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  	}
}

tipoPrestamoService.getByNombre = async function (nombreTipoPrestamo) {
	try {
		const t0 = performance.now();
		var request = await fetch(urlBase + '/tipo_prestamo/nombre/' + nombreTipoPrestamo);
		var response = await request.json();
		const t1 = performance.now();
		console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  	}
}

module.exports = tipoPrestamoService;

