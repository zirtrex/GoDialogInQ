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
	intentMap.set("Extraer nombre del cliente", extraerNombreCliente);	
	intentMap.set("Guiar al usuario para elegir un prestamo", guiarUsuario);
	intentMap.set("Guiar al usuario para elegir un prestamo - si - custom", guiarUsuarioSiCustom);	
	intentMap.set("Extraer el tipo de prestamo", extraerTipoPrestamo);
	intentMap.set("Extraer el tipo de prestamo - mostrar prestamos", extraerTipoPrestamoMostrarPrestamos);
	intentMap.set("Extraer el tipo de prestamo - mostrar requisitos - si", extraerTipoPrestamoMostrarRequisitosSi);	
	intentMap.set("Extraer informacion del cliente", extraerInfoCliente);
	intentMap.set("Extraer monto necesitado", extraerMontoNecesitado);
	intentMap.set("Extraer tiempo en el negocio", extraerTiempoNegocio);
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
	console.log(agent.action);
	console.log(agent.conv());
    agent.add('Lo siento, no te entendí. ¿En qué te puedo ayudar?');
}

async function extraerNombreCliente(agent) {

	const sessionId = agent.session.split("/").reverse()[0];	

	if (sessionId != null) {

		const setNombreCliente = agent.context.get('setnombrecliente');
		var nombres = setNombreCliente.parameters['given-name.original'];		
		var apellidos = setNombreCliente.parameters['last-name.original'];

		console.log(setNombreCliente.parameters);

		Cliente = {
			"idSession": sessionId,
			"nombres": nombres,
			"apellidos": apellidos
		};

		try {	
			response = await clienteService.saveOrUpdateCliente(sessionId, Cliente);
			var result = response.result;
			if (result.affectedRows == 1) {
				if (typeof result.idCliente === "undefined") {
					idCliente = result.insertId;
				} else {
					idCliente = result.idCliente;
				}
				const existingContext = agent.context.get("setnombrecliente");
				agent.context.set({
					'name': existingContext.name, 
					'lifespan': 100,
					'parameters' : {'idCliente': idCliente}
				});
				agent.add('Gracias ' + nombres + " por respondernos");
				let settipoprestamo = agent.context.get('settipoprestamo');

				if (typeof settipoprestamo !== "undefined") {
					idTipoPrestamo = settipoprestamo.parameters['idTipoPrestamo'];
					let nombreTipoPrestamo = settipoprestamo.parameters['tipoPrestamo.original'];
					if (idTipoPrestamo == "") {
						agent.add("¿En qué podemos ayudarte?");
					} else {
						agent.add("Ya has elegido: " + nombreTipoPrestamo + ', si quieres continuar con el préstamo, por ingresa el monto del préstamo.');
					}
				} else {				
					agent.add("¿En qué podemos ayudarte?");
				}				

				console.log("Datos del cliente guardados correctamente.");
			}
		} catch (error) {
			console.error(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}
}

async function guiarUsuario(agent) {

	try {
		var response = await tipoPrestamoService.getAll();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.nombreTipoPrestamo);
			});

			agent.add('¿Quieres que te mostremos una descripción básica de los préstamos?');

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}
	 
}

async function guiarUsuarioSiCustom(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoprestamo.original'];

	var frasesResponses = [];
	frasesResponses.push("¿Quieres que te mostremos los requisitos?");
	frasesResponses.push("¿Resolvimos tus dudas?");
	frasesResponses.push("¿Te podemos ayudar en algo más?");

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

		if (response.status == "success") {
			response.result.forEach(object => {				
				agent.add("Descripción: " + object.descripcionTipoPrestamo);
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

async function extraerTipoPrestamo(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];	

	if (nombreTipoPrestamo == "") {

		var REPROMPT_COUNT = agent.request_.body.queryResult.outputContexts[0].parameters['REPROMPT_COUNT'];

		if(typeof REPROMPT_COUNT === 'undefined') {
			const existingContext = agent.context.get("settipoprestamo");
			agent.context.set({
				'name': existingContext.name, 
				'lifespan': 50,
				'parameters' : {'REPROMPT_COUNT': 3}
			});
			agent.add("Por favor indica un préstamo válido");

			try {
				var response = await tipoPrestamoService.getAll();
		
				if (response.status == "success") {
					agent.add('Los préstamos disponibles son: ');
					response.result.forEach(object => {				
						agent.add("- " + object.nombreTipoPrestamo);
					});
		
					agent.add('Elige uno');
		
				} else {
					agent.add('No se han encontrado préstamos disponibles.');
				}
		
			} catch (error) {
				agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
			}

		} else {
			if (REPROMPT_COUNT > 0) {
				REPROMPT_COUNT = REPROMPT_COUNT - 1;
				const existingContext = agent.context.get("settipoprestamo");
				agent.context.set({
					'name': existingContext.name, 
					'lifespan': 50,
					'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
				});
				agent.add("El préstamo ingresado no lo tenemos disponible.");
			} else {
				agent.context.set({
					'name': existingContext.name, 
					'lifespan': 50,
					'parameters' : {'REPROMPT_COUNT': 3}
				});
			}
		}
		console.log(REPROMPT_COUNT);

	} else {

		agent.add("Has elegido: " + nombreTipoPrestamo);
		agent.add("¿Quieres ver los requisitos?");

	}	
}

async function extraerTipoPrestamoMostrarPrestamos(agent) {

	try {
		var response = await tipoPrestamoService.getAll();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.nombreTipoPrestamo);
			});

			agent.add('¿Quieres que te mostremos una descripción básica de los préstamos?');

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}

}

async function extraerTipoPrestamoMostrarRequisitosSi(agent) {

	let nombreTipoPrestamo = agent.context.get('settipoprestamo').parameters['tipoPrestamo.original'];
	let setnombrecliente = agent.context.get('setnombrecliente');
	let nombres = "";

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);
		var idTipoPrestamo = response.result[0].idTipoPrestamo;
		
		const existingContext = agent.context.get("settipoprestamo");
		agent.context.set({
			'name': existingContext.name, 
			'lifespan': 50,
			'parameters' : {'idTipoPrestamo': idTipoPrestamo}
		});

		var response = await requisitoService.getRequisitosByIdTipoPrestamo(idTipoPrestamo);

		if (response.status == "success") {

			agent.add("Los requisitos para " + nombreTipoPrestamo + " son:");
			response.result.forEach(object => {			
				agent.add("- " + object.descripcionRequisito);
			});			

			if (typeof setnombrecliente !== "undefined") {
				nombres = setnombrecliente.parameters['given-name.original'];
				if (nombres == "") {
					agent.add( 'Si estás interesado, por favor ingresa tus nombres');
				} else {
					agent.add(nombres + ', si quieres continuar con el préstamo, por ingresa el monto del préstamo.');
				}
			} else {				
				agent.add('Si estás interesado, por favor ingresa tus nombres');
			}

		} else {
			agent.add('No se encontró el prestamo ingresado.');
		}

	} catch (error) {
		logger.debug(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
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
			response = await clienteService.saveOrUpdateCliente(sessionId, Cliente);
			var result = response.result;
			if (result.affectedRows == 1) {
				if (typeof result.idCliente === "undefined") {
					idCliente = result.insertId;
				} else {
					idCliente = result.idCliente;
				}
				const existingContext = agent.context.get("setinformacioncliente");
				agent.context.set({
					'name': existingContext.name, 
					'lifespan': 50,
					'parameters' : {'idCliente': idCliente}
				});
				agent.add('Gracias ' + nombres + " " + apellidos + " por respondernos");
				agent.add("¿Qué monto necesitas?");

				console.log("Datos del cliente guardados correctamente.");
				logger.debug("Datos del cliente guardados correctamente.");		
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

async function extraerMontoNecesitado(agent) {

	const idSession = agent.session.split("/").reverse()[0];

	let montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];

	const setNombreCliente = agent.context.get('setnombrecliente');	
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	
	var frasesResponses = [];
	frasesResponses.push("Hola, indicanos tu nombre por favor.");
	frasesResponses.push("Por favor indicanos tu nombre por favor.");
	frasesResponses.push("Hola, indicanos el préstamo de tu interés.");
	frasesResponses.push("Por favor indicanos el préstamo de tu interés.");

	if (typeof setNombreCliente === 'undefined' || typeof setTipoPrestamo === 'undefined') {
		var indexRandom = Math.floor(Math.random() * frasesResponses.length);
		var message = frasesResponses[indexRandom];
		agent.add(message);
	} else {
		var idCliente = setNombreCliente.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];

		TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};
	
		console.log(TipoPrestamo);
	
		try {
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);

			var frasesInformacionResponses = [];
			frasesInformacionResponses.push("¿Qué tiempo tienes en el negocio?");
			frasesInformacionResponses.push("¿Cuáles son tus ingresos anuales?");
			frasesInformacionResponses.push("¿Cuál es tu puntaje de crédito?");
			frasesInformacionResponses.push("¿Qué negocio tienes?");
			frasesInformacionResponses.push("¿Cómo vas a usar el dinero?");
			frasesInformacionResponses.push("¿Cuán rápido quieres el préstamo?");
	
			if (result.affectedRows == 1) {
				agent.add('Gracias');
				var indexRandom = Math.floor(Math.random() * frasesInformacionResponses.length);
				var message = frasesInformacionResponses[indexRandom];
				agent.add(message);
			} else {
				agent.add("Estamos experimentando problemas, intenta de nuevo por favor. 1");
			}
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}
}

async function extraerTiempoNegocio(agent) {

	const idSession = agent.session.split("/").reverse()[0];

	let tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];

	const setNombreCliente = agent.context.get('setnombrecliente');
	const setTipoPrestamo = agent.context.get('settipoprestamo');
	
	var frasesResponses = [];
	frasesResponses.push("Hola, indicanos tu nombre por favor.");
	frasesResponses.push("Por favor indicanos tu nombre por favor.");
	frasesResponses.push("Hola, indicanos el préstamo de tu interés.");
	frasesResponses.push("Por favor indicanos el préstamo de tu interés.");

	if (typeof setNombreCliente === 'undefined' || typeof setTipoPrestamo === 'undefined') {
		var indexRandom = Math.floor(Math.random() * frasesResponses.length);
		var message = frasesResponses[indexRandom];
		agent.add(message);
	} else {
		var idCliente = setNombreCliente.parameters['idCliente'];
		var idTipoPrestamo = setTipoPrestamo.parameters['idTipoPrestamo'];
	
		TipoPrestamo = {
			"idSession": idSession,
			"tiempoNegocio": tiempoNegocio,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};

		console.log(TipoPrestamo);

		try {
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);
			logger.debug(response);

			var frasesInformacionResponses = [];
			frasesInformacionResponses.push("¿Qué monto necesitas?");
			frasesInformacionResponses.push("¿Cuáles son tus ingresos anuales?");
			frasesInformacionResponses.push("¿Cuál es tu puntaje de crédito?");
			frasesInformacionResponses.push("¿Qué negocio tienes?");
			frasesInformacionResponses.push("¿Cómo vas a usar el dinero?");
			frasesInformacionResponses.push("¿Cuán rápido quieres el préstamo?");
	
			if (result.affectedRows == 1) {
				agent.add('Gracias');
				var indexRandom = Math.floor(Math.random() * frasesInformacionResponses.length);
				var message = frasesInformacionResponses[indexRandom];
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error, intenta de nuevo por favor.");
			}

		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
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