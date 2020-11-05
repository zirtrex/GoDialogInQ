const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("./loggerUtil");

var messagesUtil = {};

messagesUtil.getFieldsByComplete = function (idSession, agent) {

	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	let newPrestamoClienteArray = ['montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita'];
	let newArray = [];
	
	if (typeof setPrestamoClienteContext !== "undefined") {

		let prestamoClienteArray = [
			setPrestamoClienteContext.parameters['montoNecesitado'],
			setPrestamoClienteContext.parameters['tiempoNegocio'],
			setPrestamoClienteContext.parameters['ingresosAnuales'],
			setPrestamoClienteContext.parameters['puntajeCredito'],
			setPrestamoClienteContext.parameters['queNegocioTiene'],
			setPrestamoClienteContext.parameters['comoVaUsar'],
			setPrestamoClienteContext.parameters['cuanRapidoNecesita']
		];

		//console.log(prestamoClienteArray);

		let i = 0;
		
		prestamoClienteArray.forEach(element => {
			console.log(element);
			if (element === '') {
				newArray.push(newPrestamoClienteArray[i]);
			}
			i++;
		});
	}

	console.log(newArray);

    return newArray;
    
}

messagesUtil.getMessageForRequisitosPrestamoCliente = function (idSession, agent) {
    let answers = [];
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

	let requisitosInicialesRestantesArray = messagesUtil.getFieldsByComplete(idSession, agent);
	const requisitosLength = requisitosInicialesRestantesArray.length;

	if (requisitosLength > 0) {

		let requisitosRandom = requisitosInicialesRestantesArray[Math.floor(Math.random() * requisitosLength)];

		console.log(requisitosRandom);

		let newFrasesArray = [];

		answers.forEach(element => {
			console.log(element);
			if (element[0] == requisitosRandom)	{
				newFrasesArray.push(element[1]);
			}
		});

		//console.log(newFrasesArray);

		var randomIndex = Math.floor(Math.random() * newFrasesArray.length); console.log(randomIndex);

		var message = newFrasesArray[randomIndex];

		return message;
	} else {
		return "Gracias por confiar en InQmatic";
	}
}

messagesUtil.getMessageForNombres = function () {
    let answers = [];
	answers.push("Hola, indicanos tu nombre por favor.");
	answers.push("Por favor indicanos tu nombre.");
	answers.push("¿Cuál es tu nombre?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

messagesUtil.getMessageForTipoPrestamo = function () {
    let answers = [];
	answers.push("Hola, indicanos el préstamo de tu interés.");
	answers.push("Por favor indicanos el préstamo de tu interés.");
	answers.push("¿Qué préstamo deseas?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}




module.exports = messagesUtil;