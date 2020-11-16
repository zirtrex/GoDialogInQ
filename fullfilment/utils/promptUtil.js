'use strict';
const logger = require("../utils/loggerUtil");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

var promptUtil = {};

promptUtil.getPromptCliente = async function (agent, context, message, message2) {
 
	var REPROMPT_COUNT = agent.context.get(context).parameters['REPROMPT_COUNT'];
        
	if (typeof REPROMPT_COUNT === 'undefined') {

		agent.context.set({
			'name': context, 
			'lifespan': 50,
			'parameters' : {'REPROMPT_COUNT': 2}
		});
		
		agent.add(message + " ");

	} else {
		if (REPROMPT_COUNT > 0) {

			agent.add(message + " " + REPROMPT_COUNT);

			REPROMPT_COUNT = REPROMPT_COUNT - 1;			
			agent.context.set({
				'name': context,
				'lifespan': 50,
				'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
			});
			
		} else {
			agent.context.set({
				'name': context,
				'lifespan': 50,
				'parameters' : {'REPROMPT_COUNT': 1}
			});
			agent.add(message2 + " " + REPROMPT_COUNT);
		}
	}    
}

promptUtil.getPromptTipoPrestamo = async function (agent, context) {
 
	var REPROMPT_COUNT = agent.context.get(context).parameters['REPROMPT_COUNT'];
        
	if (typeof REPROMPT_COUNT === 'undefined') {

		agent.context.set({
			'name': context, 
			'lifespan': 50,
			'parameters' : {'REPROMPT_COUNT': 3}
		});
		
		agent.add("El préstamo ingresado no lo tenemos disponible.");

		try {
			var response = await tipoPrestamoService.getAll();

			if (response.status == "success") {
				agent.add('Los préstamos disponibles son: ');
				response.result.forEach(object => {				
					agent.add(" " + object.nombreTipoPrestamo);
				});

				agent.add('Elige uno por favor.');

			} else {
				agent.add('No se han encontrado préstamos disponibles.');
			}
		} catch (error) {
			console.log("Error:" + error);
		}

	} else {
		if (REPROMPT_COUNT > 0) {
			REPROMPT_COUNT = REPROMPT_COUNT - 1;
			
			agent.context.set({
				'name': context,
				'lifespan': 50,
				'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
			});
			agent.add("Por favor indica un préstamo válido");
		} else {
			agent.context.set({
				'name': context,
				'lifespan': 50,
				'parameters' : {'REPROMPT_COUNT': 2}
			});
		}
	}    
}

module.exports = promptUtil;