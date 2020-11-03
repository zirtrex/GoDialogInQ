var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
const fetch   = require('node-fetch');

var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const clienteFullfilment = require("../fullfilments/clienteFullfilment");
const tipoPrestamoFullfilment = require("../fullfilments/tipoPrestamoFullfilment");
const prestamoClienteFullfilment = require("../fullfilments/prestamoClienteFullfilment");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/", (req, res) => {	
	res.json({
		"godialoginq-fullfilment": "v1.0.0"
	});    
});

router.get("/dialogflow", (req, res) => {	
	res.json({
		"godialoginq-fullfilment": "v1.0.0"
	});    
});

router.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
	intentMap.set("Default Fallback Intent", defaultFallback);

	//Fullfilments para guiar al usuario a elegir un préstamo
	intentMap.set("Guiar al usuario", guiarUsuario);
	intentMap.set("Guiar al usuario - mostrar descripcion - si - custom", guiarUsuarioSiCustom);
	
	//Fullfilments para extraer los datos básicos del cliente
	intentMap.set("Extraer nombre del cliente", clienteFullfilment.extraerNombreCliente);
	intentMap.set("Extraer telefono del cliente", clienteFullfilment.extraerTelefonoCliente);
	
	//Fullfilments para extraer el tipo de préstamo
	intentMap.set("Extraer el tipo de prestamo", tipoPrestamoFullfilment.extraerTipoPrestamo);
	intentMap.set("Extraer el tipo de prestamo - mostrar prestamos", tipoPrestamoFullfilment.extraerTipoPrestamoMostrarPrestamos);
	intentMap.set("Extraer el tipo de prestamo - mostrar requisitos - si", tipoPrestamoFullfilment.extraerTipoPrestamoMostrarRequisitosSi);
	
	//Fullfilments para extraer los datos de la tabla prestamo_cliente
	intentMap.set("Extraer monto necesitado", prestamoClienteFullfilment.extraerMontoNecesitado);
	intentMap.set("Extraer tiempo en el negocio", prestamoClienteFullfilment.extraerTiempoNegocio);
	intentMap.set("Extraer cuan rapido necesita", prestamoClienteFullfilment.extraerCuanRapidoNecesita);

	agent.handleRequest(intentMap);
});

router.post("/dialogflow2", (req, res) => {
	if (req.body.queryResult.action == "suma") {
        let num1 = parseFloat(req.body.queryResult.parameters.number1);
        let num2 = parseFloat(req.body.queryResult.parameters.number2);
        let sum = num1 + num2;
		response = num1 + " + " + num2 + " es " + sum;
		console.log("fulfillmentText:" + response);
        res.json({
            "fulfillmentText": response
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

async function guiarUsuario(agent) {

	try {
		var response = await tipoPrestamoService.getAll();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.nombreTipoPrestamo);
			});

			agent.add('¿Quieres ver la descripción básica de alguno de los préstamos?');

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
	 
}

async function guiarUsuarioSiCustom(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo'];

	var frasesResponses = [];
	frasesResponses.push("¿Tienes alguna otra duda?");
	frasesResponses.push("¿Deseas alguna otra información?");
	frasesResponses.push("¿Te podemos ayudar en algo más?");
	frasesResponses.push("¿Qué más necesitas?");

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

		if (response.status == "success") {
			response.result.forEach(object => {
				agent.add("Descripción para, " + nombreTipoPrestamo + ": " + object.descripcionTipoPrestamo);
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

async function extraerInfoInicial(agent) {

	const idSession = agent.session.split("/").reverse()[0];

	let montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];
	let tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];
	let ingresosAnuales = agent.request_.body.queryResult.outputContexts[0].parameters['ingresosAnuales.original'];
	let puntajeCredito = agent.request_.body.queryResult.outputContexts[0].parameters['puntajeCredito.original'];
	let queNegocioTiene = agent.request_.body.queryResult.outputContexts[0].parameters['queNegocioTiene.original'];
	let comoVaUsar = agent.request_.body.queryResult.outputContexts[0].parameters['comoVaUsar.original'];
	let cuanRapidoNecesita = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];

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
			agent.request_.body.queryResult.outputContexts[0].parameters['idPrestamoCliente'] = result.insertId;
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

module.exports = router;