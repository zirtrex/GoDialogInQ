'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const messagesUtil = require("../utils/messagesUtil");

var tipoPrestamoFullfilment = {};

tipoPrestamoFullfilment.extraerTipoPrestamo = async function (agent) {
    
    var nombreTipoPrestamo = agent.request_.body.queryResult.outputContexts[0].parameters['tipoPrestamo'];

    try {
        var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);			

        if (response.status == "success") {

            var idTipoPrestamo = response.result[0].idTipoPrestamo;

            const existingContext = agent.context.get("settipoprestamo");
            agent.context.set({
                'name': existingContext.name, 
                'lifespan': 50,
                'parameters' : {'idTipoPrestamo': idTipoPrestamo}
            });

            agent.add("Has elegido: " + nombreTipoPrestamo);
            agent.add("¿Quieres ver los requisitos?");

        } else {

            let REPROMPT_COUNT = agent.request_.body.queryResult.outputContexts[0].parameters['REPROMPT_COUNT'];

            if (typeof REPROMPT_COUNT === 'undefined') {

                const existingContext = agent.context.get("settipoprestamo");
                agent.context.set({
                    'name': existingContext.name, 
                    'lifespan': 50,
                    'parameters' : {'REPROMPT_COUNT': 2}
                });
                agent.add("Por favor indica un préstamo válido");
                
                var response = await tipoPrestamoService.getAll();
        
                if (response.status == "success") {
                    agent.add('Los préstamos disponibles son: ');
                    response.result.forEach(object => {				
                        agent.add("- " + object.nombreTipoPrestamo);
                    });
        
                    agent.add('Elige uno por favor.');
        
                } else {
                    agent.add('No se han encontrado préstamos disponibles.');
                }               

            } else {
                if (REPROMPT_COUNT > 0) {
                    REPROMPT_COUNT = REPROMPT_COUNT - 1;
                    const existingContext = agent.context.get("settipoprestamo");
                    agent.context.set({
                        'name': existingContext.name, 
                        'lifespan': 50,
                        'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
                    });
                    agent.add("El préstamo ingresado no lo tenemos disponible.");
                } else {
                    agent.context.set({
                        'name': existingContext.name, 
                        'lifespan': 50,
                        'parameters' : {'REPROMPT_COUNT': 3}
                    });
                }
            }
            console.log(REPROMPT_COUNT);
            
        }			
        
    } catch (error) {
        logger.debug(error);
        agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
    }   	

}

tipoPrestamoFullfilment.extraerTipoPrestamoMostrarPrestamos = async function (agent) {
    
    try {
		var response = await tipoPrestamoService.getAll();

		if (response.status == "success") {
			agent.add('Los préstamos disponibles son: ');
			response.result.forEach(object => {				
				agent.add("- " + object.nombreTipoPrestamo);
			});

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}    	

}

tipoPrestamoFullfilment.extraerTipoPrestamoMostrarRequisitosSi = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	let nombreTipoPrestamo = agent.context.get('settipoprestamo').parameters['tipoPrestamo'];
	let setnombrecliente = agent.context.get('setnombrecliente');
	let nombres = "";

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);
		var idTipoPrestamo = response.result[0].idTipoPrestamo;
		
		const existingContext = agent.context.get("settipoprestamo");
		agent.context.set({
			'name': existingContext.name, 
			'lifespan': 50,
			'parameters' : {'idTipoPrestamo': idTipoPrestamo}
		});

		var response = await requisitoService.getRequisitosByIdTipoPrestamo(idTipoPrestamo);

		if (response.status == "success") {

			agent.add("Los requisitos para " + nombreTipoPrestamo + " son:");
			response.result.forEach(object => {			
				agent.add("- " + object.descripcionRequisito);
			});			

			if (typeof setnombrecliente !== "undefined") {
                nombres = setnombrecliente.parameters['given-name.original'];
                apellidos = setnombrecliente.parameters['last-name.original'];
                
				if (nombres == "") {
					agent.add('Si estás interesado, por favor ingresa tus nombres');
				} else {
                    agent.add(nombres + " " + apellidos);
					message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession);
					agent.add(message);
				}
			} else {				
				agent.add('Si estás interesado, por favor ingresa tus nombres');
			}

		} else {
			agent.add('No se encontró el prestamo ingresado.');
		}

	} catch (error) {
		logger.debug(error);
		agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
	}	    	

}

module.exports = tipoPrestamoFullfilment;