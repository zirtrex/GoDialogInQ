'use strict';
const fetch = require('node-fetch');

var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var prestamoClienteService = {};

const urlBase = 'https://godialoginq.herokuapp.com';

prestamoClienteService.saveOrUpdatePrestamoCliente = async function (idSession, PrestamoCliente) {
	try {		
		var request = await fetch(urlBase + '/prestamo_cliente/session/' + idSession);    
		var response = await request.json();

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
		logger.debug(error);
		throw new Error(error);
  	}
}

module.exports = prestamoClienteService;

