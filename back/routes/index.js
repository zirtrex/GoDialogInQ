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
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
		agent.request_.body.queryResult.outputContexts[0].parameters['idTipoPrestamo'] = idTipoPrestamo;
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

		Cliente = {
			"idSession": sessionId,
			"nombres": nombres,
			"apellidos": apellidos,
			"telefono": telefono,
			"correo": correo
		};

		try {	
			response = await saveOrUpdateCliente(sessionId, Cliente);
			var result = response.result;
			if (result.affectedRows == 1) {
				agent.request_.body.queryResult.outputContexts[0].parameters['idCliente'] = result.insertId;
				agent.add('Gracias ' + nombres + " " + apellidos + " por respondernos");
				agent.add("¿Qué monto necesitas?");

				console.log("Datos del cliente guardados correctamente.");
				logger.debug("Datos del cliente guardados correctamente.");		
			}
		} catch (error) {
			console.error(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}

		/*try {			
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
				agent.request_.body.queryResult.outputContexts[0].parameters['idCliente'] = result.insertId;
				agent.add('Gracias ' + nombres + " " + apellidos + " por respondernos");
				agent.add("¿Qué monto necesitas?");

				console.log("Datos guardados correctamente.");
				logger.debug("Datos guardados correctamente.");				
			}

		} catch (error) {
			console.error(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}*/	

	} else {
		console.log("Sesiones diferentes");
		logger.debug("Sesiones diferentes");
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
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

	try {
		var response = await saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
		var result = response.result;
		console.log(result);
		logger.debug(result);

		if (result.affectedRows == 1) {
			agent.request_.body.queryResult.outputContexts[0].parameters['idPrestamoCliente'] = result.insertId;
			agent.add('Gracias por responder las preguntas.');
			agent.add('Uno de nuestros agentes se contactará contigo a la brevedad posible.');
		}

	} catch (error) {
		console.error(error);
		logger.debug(error);
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
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

async function saveOrUpdateCliente (idSession, Cliente) {
	try {		
		var request = await fetch(urlBase + '/cliente/session/' + idSession);    
		var response = await request.json();

		if (response.status == "success") {
			var request = await fetch(urlBase + '/cliente/session/' + idSession, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Cliente)
			});
			var response = await request.json();
			return response;
		} else {
			var request = await fetch(urlBase + '/cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Cliente)
			});
			var response = await request.json();
			return response;
		}
	} catch (error) {
		logger.debug(error);
		throw new Error(error);
  	}	
}

async function saveOrUpdatePrestamoCliente (idSession, PrestamoCliente) {
	try {		
		var request = await fetch(urlBase + '/prestamo-cliente/session/' + idSession);    
		var response = await request.json();

		if (response.status == "success") {
			var request = await fetch(urlBase + '/prestamo-cliente/session/' + idSession, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(PrestamoCliente)
			});
			var response = await request.json();
			return response;
		} else {
			var request = await fetch(urlBase + '/prestamo-cliente', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(PrestamoCliente)
			});
			var response = await request.json();
			return response;
		}
	} catch (error) {
		logger.debug(error);
		throw new Error(error);
  	}	
}

module.exports = router;