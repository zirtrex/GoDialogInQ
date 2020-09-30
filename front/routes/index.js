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

router.get('/', function(req, res, next) {

	var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear();

	res.render('index.pug', {'titulo' : "Soy el mejor Agente de ventas Robot", 'fecha': fechaFormat});
});

router.post('/send-message', async function(req, res, next) {	

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

async function runInQSalesAgent(message) {
	const projectId = 'text-to-speech-api-232719'
	// A unique identifier for the given session
	const sessionId = uuid.v4();	

	//const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

	const languageCode = 'es-ES';

	const queries = [message];

	return executeQueries(projectId, sessionId, queries, languageCode);
  
	// The text query request.
	/*const request = {
	  session: sessionPath,
	  queryInput: {
		text: {
		  text: message,
		  languageCode: 'es-ES',
		},
	  },
	};
  
	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	
	if(result.fulfillmentText){
		console.log(`  Response: ${result.fulfillmentText}`);
		return result.fulfillmentText;
	} else if (result.intent) {
	  console.log(`  Intent: ${result.intent.displayName}`);
	  return result.fulfillmentText;
	} else {
	  console.log(`  No intent matched.`);
	}
	return "Sin coincidencias";*/
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
	// Keeping the context across queries let's us simulate an ongoing conversation with the bot
	let context;
	let intentResponse;

	for (const query of queries) {
	  try {
		console.log(`Sending Query: ${query}`);
		intentResponse = await detectIntent(
		  projectId,
		  sessionId,
		  query,
		  context,
		  languageCode
		);
		console.log('Detected intent');
		console.log(
		  `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
		);
		
		// Use the context from this response for next queries
		context = intentResponse.queryResult.outputContexts;
		return 	intentResponse.queryResult.fulfillmentText;
	  } catch (error) {
		console.log(error);
		return 	error;	
	  }
	}
}

async function detectIntent(
	projectId,
	sessionId,
	query,
	contexts,
	languageCode
  ) {

	// Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: "./InQmatic-AI-Full-Access-56ff8d631b7f.json"
	});
	// The path to identify the agent that owns the created intent.
	const sessionPath = sessionClient.projectAgentSessionPath(
	  projectId,
	  sessionId
	);
  
	// The text query request.
	const request = {
	  session: sessionPath,
	  queryInput: {
		text: {
		  text: query,
		  languageCode: languageCode,
		},
	  },
	};
  
	if (contexts && contexts.length > 0) {
	  request.queryParams = {
		contexts: contexts,
	  };
	}
  
	const responses = await sessionClient.detectIntent(request);
	return responses[0];
}

module.exports = router;