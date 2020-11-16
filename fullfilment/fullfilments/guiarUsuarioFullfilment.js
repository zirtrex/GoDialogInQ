'user strict';
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

checkGuiarUsuarioResponse = async function (agent, response, last) {
 
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

delay = async function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));    
}

guiarUsuarioFullfilment.guiarUsuario = async function (agent) {

    try {
		responseGuiarUsuario = tipoPrestamoService.getAll();
	} catch (error) {
		console.log("Estamos experimentando problemas, intenta de nuevo por favor.");
    }

	return delay(1000).then(() => {
        console.log("Dentro del setTimeout");
        checkGuiarUsuarioResponse(agent, responseGuiarUsuario, false);
        //return delay(10);
     });

	//checkGuiarUsuarioResponse(agent, response, false);        
}

guiarUsuarioFullfilment.guiarUsuarioEvent = async function (agent) {

    console.log("Event");
	checkGuiarUsuarioResponse(agent,responseGuiarUsuario, true);

}

guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo = async function (agent) {

    var nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo'];

	let frasesResponses = [];
	frasesResponses.push("¿Quieres continuar con este préstamo?");
	frasesResponses.push("Confírmanos si el préstamo de tu interés");
	frasesResponses.push("¿Proseguimos con este préstamo?");

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

		if (response.status == "success") {

			var prestamo = response.result[0];
			
			agent.add(prestamo.nombreTipoPrestamo + " :");
			agent.add(prestamo.descripcionTipoPrestamo);

            agent.context.set({
                'name': 'settipoprestamo',
                'lifespan': 50,
                'parameters' : { 
					'idTipoPrestamo': prestamo.idTipoPrestamo,
					'nombreTipoPrestamo': prestamo.nombreTipoPrestamo
				}
            });

			var indexRandom = Math.floor(Math.random() * frasesResponses.length);
			var message = frasesResponses[indexRandom];

			agent.add(message);

		} else {
            //PRONT
			agent.add('El préstamo ingresado no lo tenemos, por favor elige otro.');
		}
	} catch (error) {
		console.log(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
  	} 

}

guiarUsuarioFullfilment.guiarUsuarioElegirPrestamoSi = async function (agent) {

    const idSession = agent.session.split("/").reverse()[0];
	
	//agent.add(tipoPrestamoUtil.getValidateTipoPrestamo("",agent,"validaCercano"));

	var verificarTipoPrestamo =  tipoPrestamoUtil.saveAndVerifyTipoPrestamo(idSession, agent);

    if (verificarTipoPrestamo) {

		if (typeof setNombreClienteContext === "undefined") {
		
			agent.add('Por favor ingresa tus nombres');
			
		} else {
		
			var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
			
			if(message=="") {
				
				prestamoClienteUtil.getValidatePrestamoCliente(idSession, agent);
			}else {
	
				agent.add(message);
			}
			
		}

	}else {

		prompUtil.getPromptTipoPrestamo(agent,"settipoprestamo");
	}
	

}

module.exports = guiarUsuarioFullfilment;