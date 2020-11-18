'use strict';

const logger = require("../utils/loggerUtil");

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

var promptUtil = {};

promptUtil.getPromptCliente = function (agent, context, message, message2) {
 
	var REPROMPT_CONTEXT = agent.context.get(context);
        
	if (typeof REPROMPT_CONTEXT === 'undefined') {

		agent.context.set({
			'name': context, 
			'lifespan': 10,
			'parameters' : {'REPROMPT_COUNT': 3}
		});
		
		agent.add(message);

	} else {
		var REPROMPT_COUNT = REPROMPT_CONTEXT.parameters['REPROMPT_COUNT'];

		if (REPROMPT_COUNT > 0) {

			agent.add(message + " " + REPROMPT_COUNT);

			REPROMPT_COUNT = REPROMPT_COUNT - 1;

			agent.context.set({
				'name': context,
				'lifespan': 10,
				'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
			});
			
		} else {
			agent.add(message2);
		}
	}    
}

promptUtil.getPromptTipoPrestamo = async function (agent, context) {
 
	var REPROMPT_CONTEXT = agent.context.get(context);
        
	if (typeof REPROMPT_CONTEXT === 'undefined') {

		agent.context.set({
			'name': context, 
			'lifespan': 10,
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

				agent.add('Indicanos en cuál estás interesado.');

			} else {
				agent.add('No se han encontrado préstamos disponibles.');
			}
		} catch (error) {
			console.log("Error:" + error);
			agent.add('Estamos experimentando problemas.');
		}

	} else {

		var REPROMPT_COUNT = REPROMPT_CONTEXT.parameters['REPROMPT_COUNT'];

		if (REPROMPT_COUNT > 0) {

			agent.add("Lo sentimos, el préstamo ingresado no lo tenemos disponible.");

			REPROMPT_COUNT = REPROMPT_COUNT - 1;
			
			agent.context.set({
				'name': context,
				'lifespan': 10,
				'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
			});
			
		} else {
			try {
				var response = await tipoPrestamoService.getAll();
	
				if (response.status == "success") {
					agent.add('Los préstamos disponibles son: ');
					response.result.forEach(object => {				
						agent.add(" " + object.nombreTipoPrestamo);
					});
	
					agent.add('Indicanos en cuál estás interesado.');
	
				} else {
					agent.add('No se han encontrado préstamos disponibles.');
				}
			} catch (error) {
				console.log("Error:" + error);
				agent.add('Estamos experimentando problemas.');
			}
		}
	}    
}

module.exports = promptUtil;