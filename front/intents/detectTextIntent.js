'use strict';

function detectTextIntent(projectId, sessionId, queries, languageCode) {
  // [START dialogflow_detect_intent_text]

  /**
   * TODO(developer): UPDATE these variables before running the sample.
   */
  // projectId: ID of the GCP project where Dialogflow agent is deployed
  const projectId = 'PROJECT_ID';
  // sessionId: String representing a random number or hashed user identifier
  const sessionId = '123456';
  // queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
  // const queries = [
  //   'Reserve a meeting room in Toronto office, there will be 5 of us',
  //   'Next monday at 3pm for 1 hour, please', // Tell the bot when the meeting is taking place
  //   'B'  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
  // ]
  //languageCode: Indicates the language Dialogflow agent should use to detect intents
  const languageCode = 'en';

  // Imports the Dialogflow library
  const dialogflow = require('@google-cloud/dialogflow');

  // Instantiates a session client
  const sessionClient = new dialogflow.SessionsClient();

  async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
  ) {
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
      } catch (error) {
        console.log(error);
      }
    }
  }
  executeQueries(projectId, sessionId, queries, languageCode);
  // [END dialogflow_detect_intent_text]
}



'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	/* var fecha = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var fechaFormat = days[fecha.getDay()] + " " + months[fecha.getMonth()] + " " + fecha.getDate() + " " + fecha.getFullYear(); */

	res.render('index.pug', {'titulo' : ""});
});

router.post('/send-message', async function(req, res) {

	if (typeof req.body.message !== 'undefined') {
		
		detectTextIntent(req.body.message).then(response => {

			//console.log(response);

			if (response.queryResult.fulfillmentMessages) {
				res.json({Reply: response.queryResult.fulfillmentMessages});
			} else {
				res.json({Reply: response.queryResult.fulfillmentText});
			}

		});
	}	

});

async function detectTextIntent(message) {

	const dialogflow = require('@google-cloud/dialogflow');
	const uuid = require('uuid');

	const projectId = 'text-to-speech-api-232719';
	const sessionId = uuid.v4();
	const languageCode = 'es-ES';

	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: "./InQmatic-AI-Full-Access-56ff8d631b7f.json"
	});

	const query = message;

	async function detectIntent (projectId, sessionId, query, contexts, languageCode) {		

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
		
		console.log("1" + JSON.stringify(contexts));
		if (contexts && contexts.length > 0) {
		  	request.queryParams = {
				contexts: contexts,
		  	};
		}

		console.log(request);
	  
		const responses = await sessionClient.detectIntent(request);
		return responses[0];
	}
	// Keeping the context across queries let's us simulate an ongoing conversation with the bot
	let context;
	async function executeQueries(projectId, sessionId, query, languageCode) {

		let intentResponse;
		console.log(JSON.stringify(context));

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
			console.log(
				`Intent: ${intentResponse.queryResult.intent.displayName}`
			);
			console.log(
				`Contexts: ${JSON.stringify(intentResponse.queryResult.outputContexts)}`
			);		
			// Use the context from this response for next queries
			context = intentResponse.queryResult.outputContexts;
			
			//console.log(intentResponse.queryResult.fulfillmentMessages);
	
			return intentResponse;
	
		} catch (error) {
			console.log(error);
			return 	error;
		}	
	}

	return executeQueries(projectId, sessionId, query, languageCode);
}



module.exports = router;