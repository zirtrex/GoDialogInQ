'use strict';

const util = require("util");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const clienteUtil = require("../utils/clienteUtil");
const promptUtil = require("../utils/promptUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");
const tipoPrestamoUtil = require("../utils/tipoPrestamoUtil");

var guiarUsuarioFullfilment = {};

var responseGuiarUsuario;

var delay = async function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));    
}

var checkGuiarUsuarioResponse = async function (agent, response, last) {
 
    console.log("checkResponse");
	console.log(response);

	console.log(util.inspect(response).includes("pending"));

	if (!util.inspect(response).includes("pending")) {

		agent.add('Los préstamos disponibles son: ');

		response.then(
			(data) => {
				//console.log(data);
				if (data.status == "success") {
					
					data.result.forEach(object => {				
						agent.add(" " + object.nombreTipoPrestamo);
					});
		
					agent.add('¿Qué préstamo te interesa?');
					agent.add('Elige uno.');
		
				} else {
					agent.add('No tenemos préstamos disponibles.');
				}
			}
		)
		.catch(
			(error) => { agent.add('Ha ocurrido un error'); }
		);
		
	} else {
		if (!last) {
			console.log('Yendo al intent 2');
			agent.add('Espere por favor.');

			agent.setFollowupEvent({
				"name": "guiar_usuario_event",
				"parameters": {},
				//"languageCode": "en-US"
			});
		} else {
			agent.add('No se han encontrado préstamos.');
		}
    }
 
}

guiarUsuarioFullfilment.guiarUsuario = async function (agent) {

	const idSession = agent.session.split("/").reverse()[0];

    try {
		responseGuiarUsuario = tipoPrestamoService.getAll();
	} catch (error) {
		console.log("Estamos experimentando problemas, intenta de nuevo por favor.");
    }

	return delay(3000).then(() => {
        console.log("Dentro del setTimeout");
        checkGuiarUsuarioResponse(agent, responseGuiarUsuario, false);
        //return delay(10);
     });

	//checkGuiarUsuarioResponse(agent, response, false);        
}

guiarUsuarioFullfilment.guiarUsuarioEvent = async function (agent) {

    console.log("Event");
	checkGuiarUsuarioResponse(agent, responseGuiarUsuario, true);

}

guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo = async function (agent) {

	const idSession = agent.session.split("/").reverse()[0];

    //var nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo'];

	let frasesResponses = [];
	frasesResponses.push("¿Quieres continuar con este préstamo?");
	frasesResponses.push("Confírmanos si el préstamo es de tu interés");
	frasesResponses.push("¿Proseguimos con este préstamo?");
	
	var verificarTipoPrestamo = await tipoPrestamoUtil.saveAndVerifyTipoPrestamo(agent);

	if (verificarTipoPrestamo) {

		agent.add(verificarTipoPrestamo.descripcionTipoPrestamo);

		var indexRandom = Math.floor(Math.random() * frasesResponses.length);
		var message = frasesResponses[indexRandom];

		agent.add(message);

	} else {

		//Cuando el tipo de prestamo no existe
		await promptUtil.getPromptTipoPrestamo(agent, "settipoprestamo_prompt");
				
	}

}

guiarUsuarioFullfilment.guiarUsuarioElegirPrestamoSi = async function (agent) {

    const idSession = agent.session.split("/").reverse()[0];
	
	//agent.add(tipoPrestamoUtil.getValidateTipoPrestamo("",agent,"validaCercano"));

	var textVerifyTipoPrestamo =  tipoPrestamoUtil.verifyTipoPrestamo(agent);

    if (textVerifyTipoPrestamo != "") {

		agent.add(textVerifyTipoPrestamo);

		var textVerifyNombres = clienteUtil.verifyNombres(agent);

		if (textVerifyNombres != "") {

			var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);

			if (message == "") {

				var textVerifyPrestamoCliente = prestamoClienteUtil.getValidatePrestamoCliente(agent);

				if (textVerifyPrestamoCliente != "") {
					agent.add("Gracias");		
				} else {
					agent.add(textVerifyPrestamoCliente);
				}

			} else {        
				agent.add(message);
			}
		} else {
			
			agent.add("Si deseas continuar");
			agent.add(messagesUtil.getMessageForNombres());
		}

	} else {

		await promptUtil.getPromptTipoPrestamo(agent, "settipoprestamo_prompt");
		
	}
}

guiarUsuarioFullfilment.guiarUsuarioConsultarPrestamo = async function (agent) {
	
	var verificarTipoPrestamo = await tipoPrestamoUtil.saveAndVerifyTipoPrestamo(agent);

	if (verificarTipoPrestamo) {
		
		agent.add(verificarTipoPrestamo.descripcionTipoPrestamo);

		agent.add(messagesUtil.getDescriptionPrestamo());

	} else {
		agent.add('Lo sentimos el préstamo indicado no lo tenemos disponible');
	}

	 
}

module.exports = guiarUsuarioFullfilment;