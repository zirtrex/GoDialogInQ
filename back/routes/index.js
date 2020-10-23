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
const uuid = require('uuid');
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

var tipoPrestamoController = require('../controllers/tipoPrestamoController');
var requisitoController = require('../controllers/requisitoController');
const { json } = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
	intentMap.set("Extraer el tipo de prestamo", extraerTipoPrestamo);
	//intentMap.set("Extraer informacion del cliente", extraerInfoCliente);
	//intentMap.set("Extraer informacion inicial requerida", extraerInfoInicial);
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

			//agent.add('Los requisitos para: ' + nombreTipoPrestamo + ", son: " + textResponse);

		}else{
			agent.add('No tenemos ese préstamo');
		}
	} catch (error) {
		// handle error
		console.error(error)
  	} 
}



async function extraerTipoPrestamo(agent) {

	let nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo.original'];
	
	//console.log(nombreTipoPrestamo);

	try {
		var response = await fetch(urlBase + '/requisito/tipo_prestamo/nombre/' + nombreTipoPrestamo);
		var requisitos = await response.json();
		//console.log(requisitos);

		if(requisitos.status == "success"){
			var textResponse = "";
			agent.add('Los requisitos son: ');
			requisitos.result.forEach(object => {
				
				agent.add("- " + object.descripcionRequisito);
			});

		}else{
			agent.add('No tenemos ese préstamo');
		}
	} catch (error) {
		console.error(error)
  	} 
}



function extraerInfoCliente(agent) {	

	let tipo_prestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipo_prestamo.original'];
	
	console.log(tipo_prestamo);

	if(tipo_prestamo == "coronavirus"){

		let sql = "select * from prestamos where tipo_prestamo='coronavirus'";


		agent.add('Los prestamos coronavirus son:  Programa de protección de pagos, etc');
		

		
	}else{
		agent.add('No tenemos ese préstamo');
	}    
}

function extraerInfoInicial(agent) {	

	let tipo_prestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipo_prestamo.original'];
	
	console.log(tipo_prestamo);

	if(tipo_prestamo == "coronavirus"){

		let sql = "select * from prestamos where tipo_prestamo='coronavirus'";


		agent.add('Los prestamos coronavirus son:  Programa de protección de pagos, etc');
		

		
	}else{
		agent.add('No tenemos ese préstamo');
	}    
}


module.exports = router;