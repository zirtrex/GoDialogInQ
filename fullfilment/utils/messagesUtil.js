'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("./loggerUtil");

var messagesUtil = {};

messagesUtil.getFieldsByComplete = async function (idSession) {

	var response = await prestamoClienteService.getPrestamoCliente(idSession);

	var newPrestamoClienteArray = ['montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita'];
	
	if (response.status == "success") {

		var result = response.result[0];

		var prestamoClienteArray = [
			result['montoNecesitado'],
			result['tiempoNegocio'],
			result['ingresosAnuales'],
			result['puntajeCredito'],
			result['queNegocioTiene'],
			result['comoVaUsar'],
			result['cuanRapidoNecesita']
		];

		console.log(prestamoClienteArray);

		var i = 0;
		prestamoClienteArray.forEach(element => {
			if (element != null) {
				newPrestamoClienteArray.splice(i, 1);				
			}
			i++;
		});
	}

	console.log(newPrestamoClienteArray);

    return newPrestamoClienteArray;
    
}

messagesUtil.getMessageForRequisitosPrestamoCliente = async function (idSession) {
    var answers = [];
	answers.push(['montoNecesitado', "¿Qué monto requieres?"]);
	//answers.push(['montoNecesitado', "¿Cuál es el monto requerido?"]);
	answers.push(['tiempoNegocio', "¿Qué tiempo tienes en el negocio?"]);
	//answers.push(['tiempoNegocio', "¿Cuánto tiempo tienes en el negocio?"]);
	answers.push(['ingresosAnuales', "¿Cuáles son tus ingresos anuales?"]);
	//answers.push(['ingresosAnuales', "¿Cuánto percibe anualmente tu negocio?"]);
	answers.push(['puntajeCredito', "¿Cuál es tu puntaje de crédito?"]);
	//answers.push(['puntajeCredito', "¿Cuál es tu fico scord?"]);
	answers.push(['queNegocioTiene', "¿Qué negocio tienes?"]);
	//answers.push(['queNegocioTiene', "¿A qué se dedica tu negocio?"]);
	answers.push(['comoVaUsar', "¿Cómo vas a usar el dinero?"]);
	//answers.push(['comoVaUsar', "¿Para qué vas a usar el dinero?"]);
	answers.push(['tiempoNegocio', "¿Cuán rápido quieres el préstamo?"]);
	//answers.push(['tiempoNegocio', "¿Qué tan rápido requieres el préstamo?"]);

	var requisitosInicialesRestantesArray = await messagesUtil.getFieldsByComplete(idSession);

	var requisitosRandom = requisitosInicialesRestantesArray[Math.floor(Math.random() * requisitosInicialesRestantesArray.length)];

	var newFrasesArray = [];

	answers.forEach(element => {
		console.log(element);
		if (element[0] == requisitosRandom)	{
			newFrasesArray.push(element[1]);
		}
	});

	console.log(newFrasesArray);

	var message = newFrasesArray[Math.floor(Math.random() * newFrasesArray.length)];

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