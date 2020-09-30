var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});

const logger = log4js.getLogger('cheese');

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { WebhookClient } = require("dialogflow-fulfillment");

var TipoPrestamo = require('../controllers/tipoPrestamoController');
var Requisito = require('../controllers/requisitoController');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
	intentMap.set("Default Fallback Intent", defaultFallback);
	intentMap.set("Extraer el tipo de prestamo", extraerPrestamo);
	intentMap.set("Pedido", pedido);
	agent.handleRequest(intentMap);
	
	/*res.json({
		"fulfillmentText": "Hola desde el back"
	});*/
});

function welcome(agent) {
	console.log("welcome");
    agent.add('Hi, I am assistant. I can help you in various service. How can I help you today?');
}

function defaultFallback(agent) {
	console.log("defaultFallback");
    agent.add('Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me.');
}

async function extraerPrestamo(agent) {

	let tipo_prestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipo_prestamo.original'];
	
	console.log(tipo_prestamo);

	let tipoPrestamo = await TipoPrestamo.obtenerIDPorNombre(tipo_prestamo);
		
	console.log(tipoPrestamo[0].idTipoPrestamo);

	let requisitos = await Requisito.obtenerRequisitosPorIdTipoPrestamo(tipoPrestamo[0].idTipoPrestamo);

	console.log(requisitos);

	if(requisitos != ""){

		agent.add('Los requisitos para: ' + tipo_prestamo + ", son: " + requisitos[0].DescripcionRequisito);

	}else{
		agent.add('No tenemos ese préstamo');
	}    
}

function pedido(agent) {	

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