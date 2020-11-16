'use strict';

var express = require('express');
var router = express.Router();
const util = require("util");

const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const clienteFullfilment = require("../fullfilments/clienteFullfilment");
const tipoPrestamoFullfilment = require("../fullfilments/tipoPrestamoFullfilment");
const prestamoClienteFullfilment = require("../fullfilments/prestamoClienteFullfilment");
const guiarUsuarioFullfilment = require("../fullfilments/guiarUsuarioFullfilment");

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
	intentMap.set("Guiar al usuario", guiarUsuarioFullfilment.guiarUsuario);
	intentMap.set("Guiar al usuario event", guiarUsuarioFullfilment.guiarUsuarioEvent);
	intentMap.set("Guiar al usuario - elegir prestamo", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo);
	intentMap.set("Guiar al usuario - elegir prestamo - si", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamoSi);
	//intentMap.set("Guiar al usuario - elegir prestamo - no", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo);
	
	//Fullfilments para extraer los datos básicos del cliente
	intentMap.set("Extraer nombre del cliente", clienteFullfilment.extraerNombreCliente);
	intentMap.set("Extraer telefono del cliente", clienteFullfilment.extraerTelefonoCliente);
	intentMap.set("Extraer correo del cliente", clienteFullfilment.extraerCorreoCliente);
	
	//Fullfilments para extraer el tipo de préstamo
	intentMap.set("Extraer el tipo de prestamo", tipoPrestamoFullfilment.extraerTipoPrestamo);
	intentMap.set("Extraer el tipo de prestamo - interesado - si", tipoPrestamoFullfilment.extraerTipoPrestamoInteresadoSi);
	
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