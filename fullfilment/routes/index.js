var express = require('express');
var router = express.Router();
const util = require("util");

//const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

const logger = require("../utils/loggerUtil");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const clienteFullfilment = require("../fullfilments/clienteFullfilment");
const tipoPrestamoFullfilment = require("../fullfilments/tipoPrestamoFullfilment");
const prestamoClienteFullfilment = require("../fullfilments/prestamoClienteFullfilment");
const { log } = require('../utils/loggerUtil');

/* 
const clienteUtil = require("../utils/clienteUtil");

var respuestaTelefono = clienteUtil.getValidatePhoneNumber("223-456-7890");
console.log(respuestaTelefono); */



router.get("/", (req, res) => {

	res.json({
		"godialoginq-fullfilment": "v1.0.0"
	});    
});

router.post("/", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
	intentMap.set("Default Fallback Intent", defaultFallback);

	//Fullfilments para guiar al usuario a elegir un préstamo
	intentMap.set("Guiar al usuario", guiarUsuario);
	intentMap.set("Guiar al usuario event", guiarUsuarioEvent);
	intentMap.set("Guiar al usuario - mostrar descripcion - si - prestamo", guiarUsuarioMostrarDescSiPrestamo);
	intentMap.set("Guiar al usuario - mostrar descripcion - si - no prestamo", guiarUsuarioMostrarDescSiNoPrestamo);
	
	//Fullfilments para extraer los datos básicos del cliente
	intentMap.set("Extraer nombre del cliente", clienteFullfilment.extraerNombreCliente);
	intentMap.set("Extraer telefono del cliente", clienteFullfilment.extraerTelefonoCliente);
	intentMap.set("Extraer correo del cliente", clienteFullfilment.extraerCorreoCliente);
	
	//Fullfilments para extraer el tipo de préstamo
	intentMap.set("Extraer el tipo de prestamo", tipoPrestamoFullfilment.extraerTipoPrestamo);
	intentMap.set("Extraer el tipo de prestamo - mostrar prestamos", tipoPrestamoFullfilment.extraerTipoPrestamoMostrarPrestamos);
	intentMap.set("Extraer el tipo de prestamo - mostrar requisitos - si", tipoPrestamoFullfilment.extraerTipoPrestamoMostrarRequisitosSi);
	
	//Fullfilments para extraer los datos de la tabla prestamo_cliente
	intentMap.set("Extraer monto necesitado", prestamoClienteFullfilment.extraerMontoNecesitado);
	intentMap.set("Extraer tiempo en el negocio", prestamoClienteFullfilment.extraerTiempoNegocio);
	intentMap.set("Extraer ingresos anuales", prestamoClienteFullfilment.extraerIngresosAnuales);
	intentMap.set("Extraer puntaje credito", prestamoClienteFullfilment.extraerPuntajeCredito);
	intentMap.set("Extraer que negocio tiene", prestamoClienteFullfilment.extraerQueNegocioTiene);
	intentMap.set("Extraer como va usar", prestamoClienteFullfilment.extraerComoVaUsar);
	intentMap.set("Extraer cuan rapido necesita", prestamoClienteFullfilment.extraerCuanRapidoNecesita);

	agent.handleRequest(intentMap);
});

router.post("/suma", (req, res) => {
	if (req.body.queryResult.action == "suma") {
        let num1 = parseFloat(req.body.queryResult.parameters.number1);
        let num2 = parseFloat(req.body.queryResult.parameters.number2);
        let sum = num1 + num2;
		responseGuiarUsuario = num1 + " + " + num2 + " es " + sum;
		console.log("fulfillmentText:" + responseGuiarUsuario);
        res.json({
            "fulfillmentText": responseGuiarUsuario
        });
    }
});

function welcome(agent) {
	console.log("welcome");
    agent.add('Hola, Soy el mejor asistente de ventas, ¿En qué te puedo ayudar?');
}

function defaultFallback(agent) {
	console.log(agent.action);
	console.log(agent.conv());
    agent.add('Lo siento, no te entendí. ¿En qué te puedo ayudar?');
}

function checkGuiarUsuarioResponse(agent, response, last) {

	console.log("checkResponse");
	console.log(response);

	console.log(util.inspect(response).includes("pending"));

	if (!util.inspect(response).includes("pending")) {

		agent.add('Los préstamos disponibles son: ');

		response.then(
			(data) => {
				console.log(data);
				if (data.status == "success") {
					
					data.result.forEach(object => {				
						agent.add(" " + object.nombreTipoPrestamo);
					});
		
					agent.add('¿Quieres ver la descripción básica de alguno de los préstamos?');
		
				} else {
					agent.add('No tenemos préstamos disponibles.');
				}
			}
		)
		.catch(
			(error) => {agent.add('Ha ocurrido un error');}
		);
		
	} else {
		if (!last) {
			console.log('Yendo al intent 2');
			agent.add('Yendo al intent 2');

			agent.setFollowupEvent({
				"name": "guiar_usuario_event",
				"parameters": {
					"parameter-name-1": "parameter-value-1",
					"parameter-name-2": "parameter-value-2"
				},
				//"languageCode": "en-US"
			});
		} else {
			agent.add('No se han encontrado préstamos.');
		}
	}

	//agent.add('Yendo al intent 2-');
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var responseGuiarUsuario;
async function guiarUsuario(agent) {

	try {
		responseGuiarUsuario = tipoPrestamoService.getAll();
	} catch (error) {
		console.log("Estamos experimentando problemas, intenta de nuevo por favor.");	
	}	
	console.log("guiarUsuario");
	console.log(responseGuiarUsuario);

	//agent.add('Espere por favor...');

	return delay(1000)
        .then(() => {
			console.log("Dentro del setTimeout");
			checkGuiarUsuarioResponse(agent, responseGuiarUsuario, false);
            //return delay(10);
        });	

	//checkGuiarUsuarioResponse(agent, response, false);
	 
}

async function guiarUsuarioEvent(agent) {

	console.log("Event");
	//console.log(response);

	checkGuiarUsuarioResponse(agent,responseGuiarUsuario, true);
	 
}

async function guiarUsuarioMostrarDescSiPrestamo(agent) {

	var nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo'];

	let frasesResponses = [];
	frasesResponses.push("¿Tienes alguna otra duda?");
	frasesResponses.push("¿Deseas alguna otra información?");
	frasesResponses.push("¿Te podemos ayudar en algo más?");
	frasesResponses.push("¿Qué más necesitas?");

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

		if (response.status == "success") {

			var prestamo = response.result[0];
			
			agent.add("La descripción para, " + prestamo.nombreTipoPrestamo + " es: " + prestamo.descripcionTipoPrestamo);

            agent.context.set({
                'name': 'settipoprestamoprev',
                'lifespan': 50,
                'parameters' : { 
					'idTipoPrestamo': prestamo.idTipoPrestamo,
					'nombreTipoPrestamo': prestamo.nombreTipoPrestamo
				}
            });

			var indexRandom = Math.floor(Math.random() * frasesResponses.length);
			var message = frasesResponses[indexRandom];

			agent.add(message);

		} else {
			agent.add('El préstamo ingresado no lo tenemos, por favor elige otro.');
		}
	} catch (error) {
		console.log(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
  	} 
}

async function guiarUsuarioMostrarDescSiNoPrestamo(agent) {

	try {
		var response = await tipoPrestamoService.getAll();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');

			response.result.forEach(object => {				
				agent.add(" " + object.nombreTipoPrestamo);
			});

			agent.add('¿De cuál quieres ver la descripción?');

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
		console.log(error);
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
}

async function extraerInfoInicial(agent) {

	const idSession = agent.session.split("/").reverse()[0];

	var montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];
	var tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];
	var ingresosAnuales = agent.request_.body.queryResult.outputContexts[0].parameters['ingresosAnuales.original'];
	var puntajeCredito = agent.request_.body.queryResult.outputContexts[0].parameters['puntajeCredito.original'];
	var queNegocioTiene = agent.request_.body.queryResult.outputContexts[0].parameters['queNegocioTiene.original'];
	var comoVaUsar = agent.request_.body.queryResult.outputContexts[0].parameters['comoVaUsar.original'];
	var cuanRapidoNecesita = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];

	const setInformacionCliente = agent.context.get('setinformacioncliente');
	var idCliente = setInformacionCliente.parameters['idCliente'];
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];
	
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
	logger.debug(TipoPrestamo);

	try {
		var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
		var result = response.result;
		console.log(response);
		logger.debug(response);

		if (result.affectedRows == 1) {
			agent.add('Gracias por responder las preguntas.');
			agent.add('Uno de nuestros agentes se contactará contigo a la brevedad posible.');
		} else {
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}

	} catch (error) {
		console.error(error);
		logger.debug(error);
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
}

function PruebaSetTimeout(agent) {
    console.log("welcome")
    agent.add(`Welcome to my agent!`)
    return delay(1000)
        .then(() => {
            agent.add(`After delay 1`)
            //return delay(1000)
        })
        .then(() => {
            agent.add(`After delay 2`)
            //return delay(1000)
        })
}

module.exports = router;