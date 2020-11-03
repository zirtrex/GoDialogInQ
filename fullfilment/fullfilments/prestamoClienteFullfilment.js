'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const messagesUtil = require("../utils/messagesUtil");

var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	let montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];

	const setNombreCliente = agent.context.get('setnombrecliente');	
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	
	var frasesResponsesNombres = [];
	frasesResponsesNombres.push("Hola, indicanos tu nombre por favor.");
	frasesResponsesNombres.push("Por favor indicanos tu nombre.");
	var frasesResponsesTipoPrestamo = [];
	frasesResponsesTipoPrestamo.push("Hola, indicanos el préstamo de tu interés.");
	frasesResponsesTipoPrestamo.push("Por favor indicanos el préstamo de tu interés.");

	if (typeof setNombreCliente === 'undefined' || typeof setTipoPrestamo === 'undefined') {

		if (typeof setNombreCliente === 'undefined') {
			var indexRandom = Math.floor(Math.random() * frasesResponsesNombres.length);
			var message = frasesResponsesNombres[indexRandom];
			agent.add(message);
		} else {
			var indexRandom = Math.floor(Math.random() * frasesResponsesTipoPrestamo.length);
			var message = frasesResponsesTipoPrestamo[indexRandom];
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreCliente.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};	
		console.log(TipoPrestamo);
	
		try {
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);
	
			if (result.affectedRows == 1) {
				agent.add('Gracias');
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession);
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error.");
			}
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	let tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio'];

	const setNombreCliente = agent.context.get('setnombrecliente');	
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	
	var frasesResponsesNombres = [];
	frasesResponsesNombres.push("Hola, indicanos tu nombre por favor.");
	frasesResponsesNombres.push("Por favor indicanos tu nombre.");
	var frasesResponsesTipoPrestamo = [];
	frasesResponsesTipoPrestamo.push("Hola, indicanos el préstamo de tu interés.");
	frasesResponsesTipoPrestamo.push("Por favor indicanos el préstamo de tu interés.");

	if (typeof setNombreCliente === 'undefined' || typeof setTipoPrestamo === 'undefined') {

		if (typeof setNombreCliente === 'undefined') {
			var indexRandom = Math.floor(Math.random() * frasesResponsesNombres.length);
			var message = frasesResponsesNombres[indexRandom];
			agent.add(message);
		} else {
			var indexRandom = Math.floor(Math.random() * frasesResponsesTipoPrestamo.length);
			var message = frasesResponsesTipoPrestamo[indexRandom];
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreCliente.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];

		TipoPrestamo = {
			"idSession": idSession,
			"tiempoNegocio": tiempoNegocio,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};	
		console.log(TipoPrestamo);
	
		try {
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);
	
			if (result.affectedRows == 1) {
				agent.add('Gracias');
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession);
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error.");
			}
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	let cuanRapidoNecesita = agent.request_.body.queryResult.outputContexts[0].parameters['cuanRapidoNecesita'];

	const setNombreCliente = agent.context.get('setnombrecliente');	
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	
	var frasesResponsesNombres = [];
	frasesResponsesNombres.push("Hola, indicanos tu nombre por favor.");
	frasesResponsesNombres.push("Por favor indicanos tu nombre.");
	var frasesResponsesTipoPrestamo = [];
	frasesResponsesTipoPrestamo.push("Hola, indicanos el préstamo de tu interés.");
	frasesResponsesTipoPrestamo.push("Por favor indicanos el préstamo de tu interés.");

	if (typeof setNombreCliente === 'undefined' || typeof setTipoPrestamo === 'undefined') {

		if (typeof setNombreCliente === 'undefined') {
			var indexRandom = Math.floor(Math.random() * frasesResponsesNombres.length);
			var message = frasesResponsesNombres[indexRandom];
			agent.add(message);
		} else {
			var indexRandom = Math.floor(Math.random() * frasesResponsesTipoPrestamo.length);
			var message = frasesResponsesTipoPrestamo[indexRandom];
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreCliente.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];

		TipoPrestamo = {
			"idSession": idSession,
			"cuanRapidoNecesita": cuanRapidoNecesita,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};	
		console.log(TipoPrestamo);
	
		try {
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);
	
			if (result.affectedRows == 1) {
				agent.add('Gracias');
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession);
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error.");
			}
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}       	

}

module.exports = prestamoClienteFullfilment;