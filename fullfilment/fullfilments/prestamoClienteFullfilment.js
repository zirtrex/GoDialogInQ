'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");

var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.verifyAndSave = async function (agent, requisito) {
    
    const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setMontoNecesitadoContext = agent.context.get('setmontonecesitado');
	const setTiempoNegocioContext = agent.context.get('settiemponegocio');
	const setIngresosAnualesContext = agent.context.get('setingresosanuales');
	const setPuntajeCreditoContext = agent.context.get('setpuntajecredito');
	const setQueNegocioTieneContext = agent.context.get('setquenegociotiene');	
	const setComoVaUsarContext = agent.context.get('setcomovausar');
	const setCuanRapidoNecesitaContext = agent.context.get('setcuanrapidonecesita');

	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	if (typeof setClienteContext === 'undefined') {
		
		var message = messagesUtil.getMessageForNombres();
		return message;
		
	} else if (typeof setTipoPrestamoContext === 'undefined'){

		var message = messagesUtil.getMessageForTipoPrestamo();
		return message;

	} else {
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
		var idCliente = setClienteContext.parameters['idCliente'];

		var montoNecesitado = null;
		var tiempoNegocio = null;
		var ingresosAnuales = null;
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
			queNegocioTiene = setPrestamoClienteContext.parameters['queNegocioTiene'];
			comoVaUsar = setPrestamoClienteContext.parameters['comoVaUsar'];
			cuanRapidoNecesita = setPrestamoClienteContext.parameters['cuanRapidoNecesita'];
		}

		if (typeof setMontoNecesitadoContext !== 'undefined') {
			montoNecesitado = setMontoNecesitadoContext.parameters['montoNecesitado.original'];
		}	
		if (typeof setTiempoNegocioContext !== 'undefined') {
			tiempoNegocio = setTiempoNegocioContext.parameters['tiempoNegocio.original'];
		}
		if (typeof setIngresosAnualesContext !== 'undefined') {
			ingresosAnuales = setIngresosAnualesContext.parameters['ingresosAnuales.original'];
		}	
		if (typeof setPuntajeCreditoContext !== 'undefined') {
			puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito.original'];
		}
		if (typeof setQueNegocioTieneContext !== 'undefined') {
			queNegocioTiene = setQueNegocioTieneContext.parameters['queNegocioTiene.original'];
		}	
		if (typeof setComoVaUsarContext !== 'undefined') {
			comoVaUsar = setComoVaUsarContext.parameters['comoVaUsar.original'];
		}
		if (typeof setCuanRapidoNecesitaContext !== 'undefined') {
			cuanRapidoNecesita = setCuanRapidoNecesitaContext.parameters['cuanRapidoNecesita.original'];
		}

		const TipoPrestamo = {
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

			agent.context.set({
				'name': "setprestamocliente",
				'lifespan': 50,
				'parameters' : {
					"montoNecesitado": montoNecesitado,
					"tiempoNegocio": tiempoNegocio,
					"ingresosAnuales": ingresosAnuales,
					"puntajeCredito": puntajeCredito,
					"queNegocioTiene": queNegocioTiene,
					"comoVaUsar": comoVaUsar,
					"cuanRapidoNecesita": cuanRapidoNecesita,
					"idTipoPrestamo": idTipoPrestamo,
					"idCliente": idCliente
				}
			});

			var tipoPrestamoArray = (Object.values(TipoPrestamo));

			console.log(tipoPrestamoArray);

			let newArray = [];

			tipoPrestamoArray.forEach(element => {
				if (element == null || element == '') {
					newArray.push(tipoPrestamoArray);
				}	
			});

			if (newArray.length > 0 ) {
				
				return message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);

			} else {
				var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
				var result = response.result;
				console.log(response);
	
				if (result.affectedRows == 1) {
					
					return "success";
					
				} else {
					console.log("No se han guardado los datos");
					return "Ha ocurrido un error al guardar su información.";					
				}
			}		
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			return "Estamos experimentando problemas, intenta de nuevo por favor.";
		}
	}

}

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));
		
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {
   
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "");

	const idSession = agent.session.split("/").reverse()[0];
	
	const setTiempoNegocioContext = agent.context.get('settiemponegocio');

	if (typeof setTiempoNegocioContext !== 'undefined') {

		var tiempoNegocio = setTiempoNegocioContext.parameters['tiempoNegocio'];

		if (tiempoNegocio  == '' || tiempoNegocio == null) {
			agent.add("El tiempo en el negocio debe ser mayor a 1 año.");
		} else {

			if (message === "success") {

				agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));

			} else {

				agent.add(message);
			}
		}
	}
}

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));
		
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerPuntajeCredito = async function (agent) {

	const idSession = agent.session.split("/").reverse()[0];
	
	const setPuntajeCreditoContext = agent.context.get('setpuntajecredito');

	if (typeof setPuntajeCreditoContext !== 'undefined') {

		var puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito'];

		if (puntajeCredito  == '' || puntajeCredito == null) {

			let answer = [];
			answer.push("El puntaje de crédito es básicamente un medidor o un record de comportamiento financiero, es una calificación.");
			answer.push("Esta calificación varia entre 300 y 850 puntos y en Estados Unidos que es una economía basada en crédito, este puntaje es uno de los datos más importantes de cualquier persona.");
			answer.push("Normalmente, las aplicaciones bancarias que tienes en tu celular te permiten inscribirte para monitorear tu puntaje de crédito de manera gratuita y sin afectarlo. También puedes consultarlo en http://creditkarma.com y http://creditchecktotal.com.");
			answer.push("Puedes obtener mas informacion en: https://inqmatic.com/10-preguntas-sobre-el-puntaje-de-credito/");

			var indexRandom = Math.floor(Math.random() * answer.length);
			var message = answer[indexRandom];
			agent.add(message);
			agent.add("Ingresa tu puntaje de crédito. (300 y 850 puntos)");

		} else {

			var message = await prestamoClienteFullfilment.verifyAndSave(agent, "");

			if (message === "success") {

				agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));

			} else {

				agent.add(message);
			}

		}
		
	}

}

prestamoClienteFullfilment.extraerQueNegocioTiene = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {

		agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));

	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerComoVaUsar = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {

		agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));
		
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		
		 agent.add(prestamoClienteUtil.getValidatePrestamoCliente("",agent));

	} else {

		agent.add(message);
	}

}


module.exports = prestamoClienteFullfilment;