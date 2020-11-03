'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

var messagesUtil = {};

messagesUtil.getFieldsByComplete = async function (idSession) {

    var response = await prestamoClienteService.getPrestamoCliente(idSession);
	var result = response.result[0];

	let montoNecesitado = result['montoNecesitado'];
	let tiempoNegocio = result['tiempoNegocio'];
	let ingresosAnuales = result['ingresosAnuales'];
	let puntajeCredito = result['puntajeCredito'];
	let queNegocioTiene = result['queNegocioTiene'];
	let comoVaUsar = result['comoVaUsar'];
	let cuanRapidoNecesita = result['tiempoNegocio'];

	var prestamoClienteArray = [
		['montoNecesitado', montoNecesitado],
		['tiempoNegocio', tiempoNegocio],
		['ingresosAnuales', ingresosAnuales],
		['puntajeCredito', puntajeCredito],
		['queNegocioTiene', queNegocioTiene],
		['comoVaUsar', comoVaUsar],
		['tiempoNegocio', cuanRapidoNecesita]
	];

	newPrestamoClienteArray = [];
	
	prestamoClienteArray.forEach(element => {
		if (element[1] == null) {
			newPrestamoClienteArray.push(element[0]);
		}	
	});

    return newPrestamoClienteArray;
    
}

messagesUtil.getMessageForRequisitosPrestamoCliente = async function (idSession) {
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
	answers.push(['tiempoNegocio', "¿Cuán rápido quieres el préstamo?"]);
	answers.push(['tiempoNegocio', "¿Qué tan rápido requieres el préstamo?"]);

	var requisitosInicialesRestantesArray = await messagesUtil.getFieldsByComplete(idSession);

	var requisitosRandom = requisitosInicialesRestantesArray[Math.floor(Math.random() * requisitosInicialesRestantesArray.length)];

	var newFrasesArray = [];

	answers.forEach(element => {
		if (element[0] == requisitosRandom)	{
			newFrasesArray.push(element[1]);
		}
	});

	var message = newFrasesArray[Math.floor(Math.random() * newFrasesArray.length)];

	return message;
}

module.exports = messagesUtil;