'use strict';

var express = require('express');
var router = express.Router();

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const projectId = 'text-to-speech-api-232719';
var sessionId;
const languageCode = 'es-ES';

router.get('/', function(req, res) {	

	/* var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear(); */

	console.log(req.session.id);
	
	/* if (typeof req.session.sessionId === 'undefined') {
		sessionId = req.sessionID;
	} else {
		sessionId = req.session.sessionId;
	} */
	
	res.render('index.pug', {'titulo' : ""});
});

router.post('/send-message', async function(req, res, next) {

	if (typeof req.body.message !== 'undefined') {

		console.log(req.session.id);
		sessionId = req.session.id;
		var response = await detectTextIntent(req.body.message, req.session.contexts);
	
		req.session.contexts = response.queryResult.outputContexts;

		if (response.queryResult.fulfillmentMessages) {
			res.json({Reply: response.queryResult.fulfillmentMessages});
		} else {
			res.json({Reply: response.queryResult.fulfillmentText});
		}		
	}	

});

async function detectTextIntent(message, contexts) {

	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: "./InQmatic-AI-Full-Access-56ff8d631b7f.json"
	});

	const query = message;
	// Keeping the context across queries let's us simulate an ongoing conversation with the bot
	//let contexts;

	const sessionPath = sessionClient.projectAgentSessionPath(
		projectId,
		sessionId
	);  

	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: query,
				languageCode: languageCode,
			},
		},
	};
	  
	//console.log("1 " + JSON.stringify(contexts));
	if (typeof contexts !== 'undefined') {
		if (contexts && contexts.length > 0) {
			request.queryParams = {
				contexts: contexts,
			};
		}
	}
	
	const intentResponse = await sessionClient.detectIntent(request);
	
	console.log(`Sending Query: ${query}`);
	console.log('Detected intent');
	console.log(`Query: ${intentResponse[0].queryText}`);
	console.log(
		`Fulfillment Text: ${intentResponse[0].queryResult.fulfillmentText}`
	);
	console.log(
		`Intent: ${intentResponse[0].queryResult.intent.displayName}`
	);
	//req.session.contexts = intentResponse[0].queryResult.outputContexts;
	/* console.log(
		`Contexts: ${JSON.stringify(intentResponse[0].queryResult.outputContexts)}`
	); */		
	// Use the context from this response for next queries
	//contexts = intentResponse[0].queryResult.outputContexts;
	
	//console.log(intentResponse.queryResult.fulfillmentMessages);

	return intentResponse[0];
}

module.exports = router;