'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("./loggerUtil");

var messagesUtil = {};

messagesUtil.getFieldsByComplete = function (idSession, agent) {

	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	var newPrestamoClienteArray = ['montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita'];
	
	if (typeof setPrestamoClienteContext !== "undefined") {

		var prestamoClienteArray = [
			setPrestamoClienteContext.parameters['montoNecesitado'],
			setPrestamoClienteContext.parameters['tiempoNegocio'],
			setPrestamoClienteContext.parameters['ingresosAnuales'],
			setPrestamoClienteContext.parameters['puntajeCredito'],
			setPrestamoClienteContext.parameters['queNegocioTiene'],
			setPrestamoClienteContext.parameters['comoVaUsar'],
			setPrestamoClienteContext.parameters['cuanRapidoNecesita']
		];

		console.log(prestamoClienteArray);

		var i = 0;
		prestamoClienteArray.forEach(element => {
			if (element != "") {
				newPrestamoClienteArray.splice(i, 1);				
			}
			i++;
		});
	}

	console.log(newPrestamoClienteArray);

    return newPrestamoClienteArray;
    
}

messagesUtil.getMessageForRequisitosPrestamoCliente = function (idSession, agent) {
    var answers = [];
	answers.push(['montoNecesitado', "¿Qué monto requieres?"]);
	answers.push(['montoNecesitado', "¿Cuál es el monto requerido?"]);
	answers.push(['tiempoNegocio', "¿Qué tiempo tienes en el negocio?"]);
	answers.push(['tiempoNegocio', "¿Cuánto tiempo tienes en el negocio?"]);
	answers.push(['ingresosAnuales', "¿Cuáles son tus ingresos anuales?"]);
	answers.push(['ingresosAnuales', "¿Cuánto percibe anualmente tu negocio?"]);
	answers.push(['puntajeCredito', "¿Cuál es tu puntaje de crédito?"]);
	answers.push(['puntajeCredito', "¿Cuál es tu fico scord?"]);
	answers.push(['queNegocioTiene', "¿Qué negocio tienes?"]);
	answers.push(['queNegocioTiene', "¿A qué se dedica tu negocio?"]);
	answers.push(['comoVaUsar', "¿Cómo vas a usar el dinero?"]);
	answers.push(['comoVaUsar', "¿Para qué vas a usar el dinero?"]);
	answers.push(['cuanRapidoNecesita', "¿Cuán rápido quieres el préstamo?"]);
	answers.push(['cuanRapidoNecesita', "¿Qué tan rápido requieres el préstamo?"]);

	var requisitosInicialesRestantesArray = messagesUtil.getFieldsByComplete(idSession, agent);

	var requisitosRandom = requisitosInicialesRestantesArray[Math.floor(Math.random() * requisitosInicialesRestantesArray.length)];

	console.log(requisitosRandom);

	var newFrasesArray = [];

	answers.forEach(element => {
		console.log(element);
		if (element[0] == requisitosRandom)	{
			newFrasesArray.push(element[1]);
		}
	});

	console.log(newFrasesArray);

	var randomIndex = Math.floor(Math.random() * newFrasesArray.length); console.log(randomIndex);

	var message = newFrasesArray[randomIndex];

	return message;
}

messagesUtil.getMessageForNombres = function () {
    var answers = [];
	answers.push("Hola, indicanos tu nombre por favor.");
	answers.push("Por favor indicanos tu nombre.");
	answers.push("¿Cuál es tu nombre?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

messagesUtil.getMessageForTipoPrestamo = function () {
    var answers = [];
	answers.push("Hola, indicanos el préstamo de tu interés.");
	answers.push("Por favor indicanos el préstamo de tu interés.");
	answers.push("¿Qué préstamo deseas?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}




module.exports = messagesUtil;