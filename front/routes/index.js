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

router.get('/', function(req, res, next) {

	var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear();

	res.render('index.pug', {'titulo' : "Soy el mejor Agente de ventas Robot", 'fecha': fechaFormat});
});

router.post('/send-message', async function(req, res, next) {	

	if(typeof req.body.message !== 'undefined'){
		try{
			const response = await runInQSalesAgent(req.body.message);
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
	const projectId = 'text-to-speech-api-232719';
	const sessionId = uuid.v4();
	const languageCode = 'es-ES';
	const query = message;

	return executeQueries(projectId, sessionId, query, languageCode);
	
}

// Keeping the context across queries let's us simulate an ongoing conversation with the bot
var context;
async function executeQueries(projectId, sessionId, query, languageCode) {	
	console.log(context);
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
			`Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
		);
		/*console.log(
			`Intent: ${intentResponse.intent.displayName}`
		);*/		
		// Use the context from this response for next queries
		context = intentResponse.queryResult.outputContexts;
		
		return 	intentResponse.queryResult.fulfillmentText;
	} catch (error) {
		console.log(error);
		return 	error;
	}
	
}

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
	return responses[0];
}

module.exports = router;