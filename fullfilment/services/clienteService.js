'use strict';
const fetch = require('node-fetch');
var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var config = require('../public/config.json');

var clienteService = {};

const urlBase = config.ipServidor;

clienteService.saveOrUpdateCliente = async function (idSession, Cliente) {
  try {
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
			return response;
		}
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  }
}

module.exports = clienteService;

