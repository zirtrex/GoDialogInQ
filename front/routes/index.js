'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {

	var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear();

	res.render('index.pug', {'titulo' : "Soy el mejor Agente de ventas Robot", 'fecha': fechaFormat});
});

router.post('/send-message', async function(req, res, next) {	

	if(typeof req.body.message !== 'undefined'){
		try {
			const response = await runInQSalesAgent(req.body.message);
			
			console.log(response);

			if (response.fulfillmentMessages) {
				res.json({Reply: response.fulfillmentMessages});
			} else {
				res.json({Reply: response.fulfillmentText});
			}

		} catch (error) {
			console.log(error);
		}		
	}	

});

async function runInQSalesAgent(message) {
	const projectId = 'text-to-speech-api-232719';
	const sessionId = uuid.v4();
	const languageCode = 'es-ES';
	const query = message;

	async function detectIntent (projectId, sessionId, query, contexts, languageCode) {
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
		return responses[0].queryResult;
	}	
	let context;
	async function executeQueries(projectId, sessionId, query, languageCode) {
		// Keeping the context across queries let's us simulate an ongoing conversation with the bot
		
		let intentResponse;
		
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
			console.log(`Query: ${intentResponse.queryText}`);
			console.log(
				`Fulfillment Text: ${intentResponse.fulfillmentText}`
			);
			/*console.log(
				`Intent: ${intentResponse.intent.displayName}`
			);*/		
			// Use the context from this response for next queries
			context = intentResponse.outputContexts;
			//console.log(intentResponse);
			console.log(intentResponse.fulfillmentMessages);
	
			return 	intentResponse;
	
		} catch (error) {
			console.log(error);
			return 	error;
		}	
	}

	return executeQueries(projectId, sessionId, query, languageCode);
}



module.exports = router;