var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var Modulo = require('../models/prestamoModel').Modulo;
var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});

const logger = log4js.getLogger('cheese');

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { WebhookClient } = require("dialogflow-fulfillment");

const mysql = require('mysql');

const con = mysql.createConnection({
	host: "localhost",
	user: "godialoginq",
	password: "godialoginq",
	database: 'godialoginq'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});


/* GET home page. */
router.get('/', function(req, res, next) {

	var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear();

	//logger.debug("Fecha: " + fecha);

	res.render('index.pug', {'titulo' : "Soy el mejor Agente de ventas Robot", 'fecha': fechaFormat});

	/*if(typeof req.session.oficina === 'undefined' && typeof req.session.servicio === 'undefined')
	{
		res.render('index.jade', {'titulo' : "Sistema de Turnos", 'fecha': fechaFormat});
	}
	else if(typeof req.session.servicio === 'undefined')
	{
		res.render('index.jade', {'titulo' : "Sistema de Turnos", 'oficina': req.session.oficina, 'fecha': fechaFormat} );
	}
	else
	{
		res.redirect('/modulo');
	}*/
	
});

router.post('/send-msg', async function(req, res, next) {	

	console.log(req.body);

	if(typeof req.body.MSG !== 'undefined'){
		try{
			const response = await runInQSalesAgent(req.body.MSG);
			res.json({Reply: response});
		}catch (error) {
			console.log(error);
		}
		
	}	

});

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
	intentMap.set("Primer Contacto", primerContacto);
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

async function getData(sql){
	var result = "";
	con.query(sql, function (err, results) { 
		if (err) console.error(err);
		console.log("Result: " + results);
		result = results;
	});
	return result;
}

function primerContacto(agent) {

	let tipo_prestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipo_prestamo.original'];
	
	console.log(tipo_prestamo);

	if(tipo_prestamo == "coronavirus"){
		
		let sql = "select * from prestamos where tipo_prestamo='coronavirus'";
		let data = async () => {			
			console.log(getData(sql));
			console.log('Los prestamos coronavirus son:  Programa de protección de pagos, etc');
			agent.add('Los prestamos coronavirus son:  Programa de protección de pagos, etc');
		}
		data();				

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

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runInQSalesAgent(message) {
	const projectId = 'text-to-speech-api-232719'
	// A unique identifier for the given session
	const sessionId = uuid.v4();
  
	// Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: "./InQmatic-AI-Full-Access-56ff8d631b7f.json"
	});
	const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
	// The text query request.
	const request = {
	  session: sessionPath,
	  queryInput: {
		text: {
		  text: message,
		  languageCode: 'en-US',
		},
	  },
	};
  
	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);
	return result.fulfillmentText;
	if (result.intent) {
	  console.log(`  Intent: ${result.intent.displayName}`);
	} else {
	  console.log(`  No intent matched.`);
	}
	return "Sin coincidencias";
}

module.exports = router;