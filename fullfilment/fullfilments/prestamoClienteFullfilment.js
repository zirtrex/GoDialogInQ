'use strict';

const prestamoClienteUtil = require("../utils/prestamoClienteUtil");

const messagesUtil = require("../utils/messagesUtil");
var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
	var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "montoNecesitado");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));		
	} else {
		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {

	var tiempoNegocio = agent.context.get('settiemponegocio').parameters['tiempoNegocio']; 

	if (tiempoNegocio  == '' || tiempoNegocio == null) {
		agent.add("El tiempo en el negocio no es válido. (Ejemplo: Tengo 2 años en el negocio.)");
	} else {
		var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "settiemponegocio");

		if (message === "success") {
			agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
		} else {
			agent.add(message);
		}
	}	
	
}

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
	var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "setingresosanuales");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
	} else {
		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerPuntajeCredito = async function (agent) {

	var puntajeCredito = agent.context.get('setpuntajecredito').parameters['puntajeCredito'];

	if (puntajeCredito  == '' || puntajeCredito == null) {
		agent.add(messagesUtil.getDescriptionForFICO() + ", \nIngresa tu puntaje de crédito. (Entre 300 y 850 puntos)");
	} else {
		var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "setpuntajecredito");

		if (message === "success") {
			agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
		} else {
			agent.add(message);
			//agent.add("");
		}
	}
}

prestamoClienteFullfilment.extraerQueNegocioTiene = async function (agent) {
    
	var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "setquenegociotiene");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
	} else {
		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerComoVaUsar = async function (agent) {
    
	var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "setcomovausar");

	if (message === "success") {
		agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
	} else {
		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
	var message = await prestamoClienteUtil.verifyAndSavePrestamoCliente(agent, "setcuanrapidonecesita");

	if (message === "success") {		
		 agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
	} else {
		agent.add(message);
	}

}


module.exports = prestamoClienteFullfilment;