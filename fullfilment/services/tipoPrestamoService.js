'use strict';
const fetch = require('node-fetch');

var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var tipoPrestamoService = {};

const urlBase = 'http://localhost:8081';

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

module.exports = tipoPrestamoService;

