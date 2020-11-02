'use strict';
const fetch = require('node-fetch');
var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var requisitoService = {};

const urlBase = 'http://localhost:8081';

requisitoService.getRequisitosByIdTipoPrestamo = async function (idTipoPrestamo) {
  try {
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/' + idTipoPrestamo);
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

module.exports = requisitoService;

