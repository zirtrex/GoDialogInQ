'use strict';
const fetch = require('node-fetch');

var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var tipoPrestamoService = {};

const urlBase = 'https://godialoginq.herokuapp.com';

tipoPrestamoService.getAll = async function () {
	try {
		var request = await fetch(urlBase + '/tipo_prestamo');
		var response = await request.json();
		console.log(response);
		logger.debug(response);
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
		logger.debug(response);
		return response;
	} catch (error) {
		console.log(error);
		logger.debug(error);
		throw new Error(error);
  	}
}

module.exports = tipoPrestamoService;

