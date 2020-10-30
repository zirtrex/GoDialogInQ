var express = require('express');
var session = require('express-session');
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
const uuid = require('uuid');
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const { sessionEntitiesHelper } = require('actions-on-google-dialogflow-session-entities-plugin');

const { json } = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session);
app.use(sessionEntitiesHelper);

const urlBase = 'http://localhost:8081';

router.get("/", (req, res) => {	
	res.json({
		"godialoginq": "v1.0.0"
	});    
});

router.get("/dialogflow", (req, res) => {	
	res.json({
		"godialoginq": "v1.0.0"
	});    
});

router.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
	intentMap.set("Default Fallback Intent", defaultFallback);
	intentMap.set("Mostrar prestamos sin idea de los prestamos", mostrarPrestamosSinIdea);
	intentMap.set("Extraer el tipo de prestamo", extraerTipoPrestamo);
	intentMap.set("Extraer informacion del cliente", extraerInfoCliente);
	intentMap.set("Extraer informacion inicial requerida", extraerInfoInicial);
	intentMap.set("Prueba sesion", pruebaSesion);
	agent.handleRequest(intentMap);
	/*res.json({
		"fulfillmentText": "Hola desde el back"
	});*/
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
	console.log("defaultFallback");
    agent.add('Lo siento, no te entendí. ¿En qué te puedo ayudar?');
}

async function mostrarPrestamosSinIdea(agent) {

	try {
		var request = await fetch(urlBase + '/tipo_prestamo');
		var response = await request.json();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.nombreTipoPrestamo);
			});

			agent.add('¿Estás interesado en alguno de ellos?');
			agent.add('Indicanos en cual');

		} else {
			agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
		}
	} catch (error) {
		console.error(error);
		logger.debug(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
  	} 
}

async function extraerTipoPrestamo(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];

	try {		
		var request = await fetch(urlBase + '/tipo_prestamo/' + nombreTipoPrestamo);    
		var response = await request.json();
		var idTipoPrestamo = response.result[0].idTipoPrestamo;
		agent.request_.session.idTipoPrestamo = idTipoPrestamo;
	} catch (error) {
    	// handle error
		logger.debug(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
  	}
	
	try {		
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/' + idTipoPrestamo);
		var response = await request.json();

		console.log(response);
		logger.debug(response);

		if (response.status == "success") {

			agent.add('Los requisitos son: ');
			response.result.forEach(object => {			
				agent.add("- " + object.descripcionRequisito);
			});

			agent.add('Si estás interesado, dime tu nombre');

		} else {
			agent.add('No tenemos los requisitos disponibles');
			const existingContext = agent.context.get("settipoprestamo");
			agent.context.set({'name': existingContext.name, 'lifespan': 0});

			try {
				var request = await fetch(urlBase + '/tipo_prestamo');
				var response = await request.json();
		
				if (response.status == "success") {
					agent.add('Pero quizás te interesa: ');
					response.result.forEach(object => {				
						agent.add("- " + object.nombreTipoPrestamo);
					});
		
					agent.add('¿Estás interesado en alguno de ellos?');
					agent.add('Indicanos en cual');
		
				} else {
					agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
				}
			} catch (error) {
				console.error(error);
				agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
			}	
		}
	} catch (error) {
		console.error(error);

		try {
			var request = await fetch(urlBase + '/tipo_prestamo');
			var response = await request.json();
	
			if (response.status == "success") {
				agent.add('Los préstamos disponibles son: ');
				response.result.forEach(object => {				
					agent.add("- " + object.nombreTipoPrestamo);
				});
	
				agent.add('¿Estás interesado en alguno de ellos?');
				agent.add('Indicanos en cual');
	
			} else {
				agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
			}
		} catch (error) {
			console.error(error);
			agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
		}
  	} 
}

async function extraerTipoPrestamoOld(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];
	
	//console.log(nombreTipoPrestamo);

	try {
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/nombre/' + nombreTipoPrestamo);
		var response = await request.json();
		//console.log(requisitos);

		if (response.status == "success") {
			agent.add('Los requisitos son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.descripcionRequisito);
			});
			
			agent.add('Si estás interesado, dime tu nombre');

		} else {
			agent.add('No tenemos los requisitos disponibles');
			const existingContext = agent.context.get("settipoprestamo");
			agent.context.set({'name': existingContext.name, 'lifespan': 0});

			try {
				var request = await fetch(urlBase + '/tipo_prestamo');
				var response = await request.json();
		
				if (response.status == "success") {
					agent.add('Pero quizás te interesa: ');
					response.result.forEach(object => {				
						agent.add("- " + object.nombreTipoPrestamo);
					});
		
					agent.add('¿Estás interesado en alguno de ellos?');
					agent.add('Indicanos en cual');
		
				}else{
					agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
				}
			} catch (error) {
				console.error(error);
				agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
			}
		}
	} catch (error) {
		console.error(error);		
  	} 
}

async function extraerInfoCliente(agent) {

	const sessionId = agent.session.split("/").reverse()[0];

	if (typeof agent.request_.session.sessionId === 'undefined') {
		agent.request_.session.sessionId = sessionId;
		console.log("Nueva sesion: " + sessionId);
		logger.debug("Nueva sesion: " + sessionId);
	} else {
		console.log("Sesion ya creada: " + sessionId);
	}

	if (agent.request_.session.sessionId == sessionId) {

		const setInformacionCliente = agent.context.get('setinformacioncliente');
		var nombres = setInformacionCliente.parameters['given-name.original'];
		var apellidos = setInformacionCliente.parameters['last-name.original'];
		var telefono = setInformacionCliente.parameters['phone-number.original'];
		var correo = setInformacionCliente.parameters['email.original'];

		console.log(setInformacionCliente.parameters);

		data = {
			"nombres": nombres,
			"apellidos": apellidos,
			"telefono": telefono,
			"correo": correo
		}

		try {			
			var request = await fetch(urlBase + '/cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			var response = await request.json();
			var result = response.result;
			console.log(result);
			logger.debug(result);

			if (result.affectedRows == 1) {
				agent.request_.session.idCliente = result.insertId;
				agent.add('Gracias ' + nombres + " " + apellidos + " por respondernos");
				agent.add("¿Qué monto necesitas?");

				console.log("Datos guardados correctamente.");
				logger.debug("Datos guardados correctamente.");				
			}

		} catch (error) {
			console.error(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}		

	} else {
		console.log("Sesiones diferentes");
		logger.debug("Sesiones diferentes");
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
}

function extraerInfoInicial(agent) {	

	let montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];
	let tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];
	let ingresosAnuales = agent.request_.body.queryResult.outputContexts[0].parameters['ingresosAnuales.original'];
	let puntajeCredito = agent.request_.body.queryResult.outputContexts[0].parameters['puntajeCredito.original'];
	let queNegocioTiene = agent.request_.body.queryResult.outputContexts[0].parameters['queNegocioTiene.original'];
	let comoVaUsar = agent.request_.body.queryResult.outputContexts[0].parameters['comoVaUsar.original'];
	let cuanRapidoNecesita = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];

	console.log(agent.request_.body.queryResult.outputContexts[0]);

	if (typeof agent.request_.session.prestamo_cliente === 'undefined'){
		agent.request_.session.prestamo_cliente = [];
	}	
	
	/*
	agent.request_.session.queNegocioTiene = queNegocioTiene;
	agent.request_.session.comoVaUsar = comoVaUsar;
	agent.request_.session.cuanRapidoNecesita = cuanRapidoNecesita;*/	

	if (montoNecesitado != "") {
		agent.request_.session.montoNecesitado = montoNecesitado;
		agent.request_.session.prestamo_cliente.push(montoNecesitado);
		agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado'] = montoNecesitado;
	}
	if (tiempoNegocio != "") {
		agent.request_.session.tiempoNegocio = tiempoNegocio;
		agent.request_.session.prestamo_cliente.push(tiempoNegocio);
		agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio'] = tiempoNegocio;
	}
	if (ingresosAnuales != "") {
		agent.request_.session.ingresosAnuales = ingresosAnuales;
		agent.request_.session.prestamo_cliente.push(ingresosAnuales);
		agent.request_.body.queryResult.outputContexts[0].parameters['ingresosAnuales'] = ingresosAnuales;
	}	
	if (puntajeCredito != "") {
		agent.request_.session.puntajeCredito = puntajeCredito;
		agent.request_.session.prestamo_cliente.push(puntajeCredito);
		agent.request_.body.queryResult.outputContexts[0].parameters['ingresosAnuales'] = ingresosAnuales;
	}

	

	/*const existingContext = agent.context.get("setinformacioninicial");
	agent.context.set({
		'name': existingContext.name, 
		'lifespan': 20,
		'parameters': 
	});*/

	/*if (typeof agent.request_.session.montoNecesitado === 'undefined') {
		agent.request_.session.montoNecesitado = montoNecesitado;
		prestamo_cliente.push(montoNecesitado);
	}
	if (typeof agent.request_.session.tiempoNegocio === 'undefined') {
		agent.request_.session.tiempoNegocio = tiempoNegocio;
		prestamo_cliente.push(tiempoNegocio);
	}
	if (typeof agent.request_.session.ingresosAnuales === 'undefined') {
		agent.request_.session.ingresosAnuales = ingresosAnuales;
		prestamo_cliente.push(ingresosAnuales);
	}	
	if (typeof agent.request_.session.puntajeCredito === 'undefined') {
		agent.request_.session.puntajeCredito = puntajeCredito;
		prestamo_cliente.push(puntajeCredito);
	}*/

	console.log(agent.request_.body.queryResult.outputContexts[0]);
	console.log(agent.request_.session);

	if (agent.request_.session.prestamo_cliente.length == 4) {
		agent.add("Se completaron los datos");
	} else {
		agent.add("Faltan por completar");
	}

	agent.add("Final");
}

async function pruebaSesion(agent) {

	const sessionId = agent.session.split("/").reverse()[0];
	//let nombres = agent.request_.body.queryResult.outputContexts[0].parameters['given-name.original'];

	if (typeof agent.request_.session.sessionId === 'undefined') {
		agent.request_.session.sessionId = sessionId;
		console.log("Nueva sesion: " + sessionId);
	} else {
		console.log("Sesion ya creada: " + sessionId);
	}

	if (agent.request_.session.sessionId == sessionId) {

		const setInformacionCliente = agent.context.get('setinformacioncliente');
		var nombres = setInformacionCliente.parameters['given-name.original'];
		var apellidos = setInformacionCliente.parameters['last-name.original'];
		var telefono = setInformacionCliente.parameters['phone-number.original'];
		var correo = setInformacionCliente.parameters['email.original'];

		console.log(setInformacionCliente.parameters);
		console.log(nombres);

		data = {
			"nombres": nombres,
			"apellidos": apellidos,
			"telefono": telefono,
			"correo": correo
		}

		try {			
			var request = await fetch(urlBase + '/cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			var response = await request.json();
			var result = response.result;
			console.log(result);

			if (result.affectedRows == 1) {
				agent.request_.session.idCliente = result.insertId;
				agent.add('Datos guardados correctamente.');

			}

		} catch (error) {
			// handle error
			console.error(error);
			agent.add("Error");
		}
		

	} else {
		console.log("diferente");
		agent.add("diferente");
	}

	agent.add('Fin');

	/*try {
		//let idTipoPrestamo = await tipoPrestamoController.getIdTipoPrestamoByNombre(nombreTipoPrestamo);
		var response = await fetch(urlBase + '/tipo_prestamo/' + nombreTipoPrestamo);    
		var json = await response.json();
		var idTipoPrestamo = json.result[0].idTipoPrestamo;
		console.log(idTipoPrestamo);
	} catch (error) {
    	// handle error
    	console.error(error)
  	}
	
	try {
		//let requisitos = await requisitoController.getAllByIdTipoPrestamo(idTipoPrestamo[0].idTipoPrestamo);
		var response = await fetch(urlBase + '/requisito/tipo_prestamo/' + idTipoPrestamo);
		var requisitos = await response.json();
		console.log(requisitos);

		if(requisitos.status == "success"){
			var textResponse = "";
			agent.add('Los requisitos son: ');
			requisitos.result.forEach(object => {
				//textResponse += object.descripcionRequisito + ", "				
				agent.add("- " + object.descripcionRequisito);
			});

			agent.add('Si estás interesado, dime tu nombre');

		}else{
			agent.add('No tenemos ese préstamo');
		}
	} catch (error) {
		// handle error
		console.error(error)
  	} */
}

module.exports = router;