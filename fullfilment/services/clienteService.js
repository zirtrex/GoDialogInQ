'use strict';

const fetch = require('node-fetch');
const logger = require("../utils/loggerUtil");
const { performance, PerformanceObserver } = require('perf_hooks');
const config = require('config');

var clienteService = {};

const urlBase =  process.env.BACK_HOST || config.get("ipServidor");

clienteService.saveOrUpdateCliente = async function (idSession, Cliente) {
  	try {
		const t0 = performance.now();
		var request = await fetch(urlBase + '/cliente/session/' + idSession);
		var response = await request.json();
		console.log(response);
		if (response.status == "success") {
			var idCliente = response.result[0].idCliente;
			var request = await fetch(urlBase + '/cliente/session/' + idSession, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Cliente)
			});
			var response = await request.json();
			response.result.idCliente = idCliente;
			console.log(response);
			const t1 = performance.now();
			console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
			return response;
		} else {
			var request = await fetch(urlBase + '/cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Cliente)
			});
			var response = await request.json();
			console.log(response);
			const t1 = performance.now();
			console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
			return response;
		}
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  }
}

module.exports = clienteService;

