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

var tipoPrestamoController = require('../controllers/tipoPrestamoController');
var requisitoController = require('../controllers/requisitoController');


const { json } = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessionEntitiesHelper);

var sessionId;

const urlBase = 'http://localhost:8081';

router.get("/", (req, res) => {
	
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

async function extraerTipoPrestamo_old(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];
	
	console.log(nombreTipoPrestamo);

	try {
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
  	} 
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

		}else{
			agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
		}
	} catch (error) {
		console.error(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
  	} 
}

async function extraerTipoPrestamo(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];
	
	//console.log(nombreTipoPrestamo);

	try {
		var request = await fetch(urlBase + '/requisito/tipo_prestamo/nombre/' + nombreTipoPrestamo);
		var response = await request.json();
		//console.log(requisitos);

		if (response.status == "success") {
			var textResponse = "";
			agent.add('Los requisitos son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.descripcionRequisito);
			});

			agent.add('Si estás interesado, dime tu nombre');

		}else{
			agent.add('No tenemos los requisitos disponibles');
			const existingContext = agent.context.get("settipoprestamo");
			agent.setContext({'name': existingContext.name, 'lifespan': 0});
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
	
			}else{
				agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
			}
		} catch (error) {
			console.error(error);
			agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
		}
  	} 
}

function extraerInfoCliente(agent) {	

	let nombres = agent.request_.body.queryResult.outputContexts[0].parameters['given-name'];
	let apellidos = agent.request_.body.queryResult.outputContexts[0].parameters['last-name'];
	let telefono = agent.request_.body.queryResult.outputContexts[0].parameters['phone-number'];
	let correo = agent.request_.body.queryResult.outputContexts[0].parameters['email'];

	//let session['cliente'] = ;

	
	
	console.log(nombres);
	console.log(apellidos);

	agent.add('Gracias ' + nombres + " por respondernos");
	agent.add("¿Qué monto necesitas?");

}

function extraerInfoInicial(agent) {	

	let montoNecesitado = agent.request_.body.queryResult.outputContexts[0].parameters['montoNecesitado.original'];
	let tiempoNegocio = agent.request_.body.queryResult.outputContexts[0].parameters['tiempoNegocio.original'];
	
	let session = {};

	session.montoNecesitado = montoNecesitado;
	
	console.log(montoNecesitado);
	console.log(tiempoNegocio);

	if(montoNecesitado != "") {
		agent.add('Si podemos darte los ' + montoNecesitado );
		agent.add('Y cuanto tiempo tienes en el negocio ');
		
	}else if (tiempoNegocio != "") {
		agent.add('Me parece bien ');
		agent.add('Y cuanto necesitas');
	} else{
		agent.add('Y cuanto necesitas');
	}
}

async function pruebaSesion(agent) {

	const sessionId = agent.session.split("/").reverse()[0];
	//let nombres = agent.request_.body.queryResult.outputContexts[0].parameters['given-name.original'];
	
	//console.log(nombre);

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