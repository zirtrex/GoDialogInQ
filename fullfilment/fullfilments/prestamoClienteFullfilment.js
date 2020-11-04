'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];	

	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');

	if (typeof setNombreClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setNombreClienteContext === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			agent.add(message);
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreClienteContext.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];

		var montoNecesitado = setTipoPrestamoContext.parameters['montoNecesitado.original'];
		var tiempoNegocio = setTipoPrestamoContext.parameters['tiempoNegocio.original'];
		var ingresosAnuales = setTipoPrestamoContext.parameters['ingresosAnuales.original'];
		var puntajeCredito = setTipoPrestamoContext.parameters['puntajeCredito.original'];
		var queNegocioTiene = setTipoPrestamoContext.parameters['queNegocioTiene.original'];
		var comoVaUsar = setTipoPrestamoContext.parameters['comoVaUsar.original'];
		var cuanRapidoNecesita = setTipoPrestamoContext.parameters['cuanRapidoNecesita.original'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"tiempoNegocio": tiempoNegocio,
			"ingresosAnuales": ingresosAnuales,
			"puntajeCredito": puntajeCredito,
			"queNegocioTiene": queNegocioTiene,
			"comoVaUsar": comoVaUsar,
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
				console.log(message);
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

	//var montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];

	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');

	if (typeof setNombreClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setNombreClienteContext === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			agent.add(message);
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreClienteContext.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];

		var montoNecesitado = setTipoPrestamoContext.parameters['montoNecesitado.original'];
		var tiempoNegocio = setTipoPrestamoContext.parameters['tiempoNegocio.original'];
		var ingresosAnuales = setTipoPrestamoContext.parameters['ingresosAnuales.original'];
		var puntajeCredito = setTipoPrestamoContext.parameters['puntajeCredito.original'];
		var queNegocioTiene = setTipoPrestamoContext.parameters['queNegocioTiene.original'];
		var comoVaUsar = setTipoPrestamoContext.parameters['comoVaUsar.original'];
		var cuanRapidoNecesita = setTipoPrestamoContext.parameters['cuanRapidoNecesita.original'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"tiempoNegocio": tiempoNegocio,
			"ingresosAnuales": ingresosAnuales,
			"puntajeCredito": puntajeCredito,
			"queNegocioTiene": queNegocioTiene,
			"comoVaUsar": comoVaUsar,
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
				console.log(message);
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

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');	

	if (typeof setNombreClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setNombreClienteContext === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			agent.add(message);
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreClienteContext.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];

		var montoNecesitado = setTipoPrestamoContext.parameters['montoNecesitado.original'];
		var tiempoNegocio = setTipoPrestamoContext.parameters['tiempoNegocio.original'];
		var ingresosAnuales = setTipoPrestamoContext.parameters['ingresosAnuales.original'];
		var puntajeCredito = setTipoPrestamoContext.parameters['puntajeCredito.original'];
		var queNegocioTiene = setTipoPrestamoContext.parameters['queNegocioTiene.original'];
		var comoVaUsar = setTipoPrestamoContext.parameters['comoVaUsar.original'];
		var cuanRapidoNecesita = setTipoPrestamoContext.parameters['cuanRapidoNecesita.original'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"tiempoNegocio": tiempoNegocio,
			"ingresosAnuales": ingresosAnuales,
			"puntajeCredito": puntajeCredito,
			"queNegocioTiene": queNegocioTiene,
			"comoVaUsar": comoVaUsar,
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
				console.log(message);
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error.");
			}
	
		} catch (error) {
			console.error(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');

	if (typeof setNombreClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setNombreClienteContext === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			agent.add(message);
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			agent.add(message);
		}
		
	} else {
		var idCliente = setNombreClienteContext.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];

		var montoNecesitado = setTipoPrestamoContext.parameters['montoNecesitado.original'];
		var tiempoNegocio = setTipoPrestamoContext.parameters['tiempoNegocio.original'];
		var ingresosAnuales = setTipoPrestamoContext.parameters['ingresosAnuales.original'];
		var puntajeCredito = setTipoPrestamoContext.parameters['puntajeCredito.original'];
		var queNegocioTiene = setTipoPrestamoContext.parameters['queNegocioTiene.original'];
		var comoVaUsar = setTipoPrestamoContext.parameters['comoVaUsar.original'];
		var cuanRapidoNecesita = setTipoPrestamoContext.parameters['cuanRapidoNecesita.original'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"tiempoNegocio": tiempoNegocio,
			"ingresosAnuales": ingresosAnuales,
			"puntajeCredito": puntajeCredito,
			"queNegocioTiene": queNegocioTiene,
			"comoVaUsar": comoVaUsar,
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
				console.log(message);
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