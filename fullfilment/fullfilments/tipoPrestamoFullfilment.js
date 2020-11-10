'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

var tipoPrestamoFullfilment = {};

tipoPrestamoFullfilment.extraerTipoPrestamo = async function (agent) {

    let setTipoPrestamoContext = agent.context.get('settipoprestamo');
    
    var nombreTipoPrestamo = setTipoPrestamoContext.parameters['tipoPrestamo'];

    try {

        let setTipoPrestamoPrevContext = agent.context.get('settipoprestamoprev');

        var idTipoPrestamo;

        if (typeof setTipoPrestamoPrevContext !== 'undefined') {

            idTipoPrestamo = setTipoPrestamoPrevContext.parameters['idTipoPrestamo'];
            nombreTipoPrestamo = setTipoPrestamoPrevContext.parameters['nombreTipoPrestamo'];

            const existingContext = agent.context.get('settipoprestamo');
            agent.context.set({
                'name': existingContext.name,
                'lifespan': 50,
                'parameters' : {
                    'idTipoPrestamo': idTipoPrestamo,
                    'tipoPrestamo': nombreTipoPrestamo
                }
            });

            agent.add("Ya has elegido: " + nombreTipoPrestamo);
            agent.add("¿Estás interesado en este préstamo?");

        } else {

            var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

            if (response.status == "success") {

                idTipoPrestamo = response.result[0].idTipoPrestamo;
    
                const existingContext = agent.context.get('settipoprestamo');
                agent.context.set({
                    'name': existingContext.name,
                    'lifespan': 50,
                    'parameters' : {
                        'idTipoPrestamo': idTipoPrestamo,
                        'tipoPrestamo': nombreTipoPrestamo
                    }
                });

                if (existingContext.parameters['tipoPrestamo'] == existingContext.parameters['tipoPrestamo.original']) {
                    agent.add("Has elegido: " + nombreTipoPrestamo);
                    
                } else {
                    agent.add("El préstamo más cercano es: " + nombreTipoPrestamo);
                }

                agent.add("¿Estás interesado en este préstamo?");
    
            } else {

                var REPROMPT_COUNT = agent.request_.body.queryResult.outputContexts[0].parameters['REPROMPT_COUNT'];
    
                if (typeof REPROMPT_COUNT === 'undefined') {
    
                    const existingContext = agent.context.get("settipoprestamo");
                    agent.context.set({
                        'name': existingContext.name, 
                        'lifespan': 50,
                        'parameters' : {'REPROMPT_COUNT': 3}
                    });
                    
                    agent.add("El préstamo ingresado no lo tenemos disponible.");

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
    
                } else {
                    if (REPROMPT_COUNT > 0) {
                        REPROMPT_COUNT = REPROMPT_COUNT - 1;
                        const existingContext = agent.context.get("settipoprestamo");
                        agent.context.set({
                            'name': existingContext.name, 
                            'lifespan': 50,
                            'parameters' : {'REPROMPT_COUNT': REPROMPT_COUNT}
                        });
                        agent.add("Por favor indica un préstamo válido");
                    } else {
                        agent.context.set({
                            'name': existingContext.name, 
                            'lifespan': 50,
                            'parameters' : {'REPROMPT_COUNT': 2}
                        });
                    }
                }
                console.log("Prompt:" + REPROMPT_COUNT);
                
            }
        } 			
        
    } catch (error) {
        console.log(error);
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
				agent.add(" " + object.nombreTipoPrestamo);
			});

		} else {
			agent.add('No tenemos préstamos disponibles.');
		}

	} catch (error) {
        console.log(error);
		agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
	}    	

}

tipoPrestamoFullfilment.extraerTipoPrestamoMostrarRequisitosSi = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

	var nombreTipoPrestamo = agent.context.get('settipoprestamo').parameters['tipoPrestamo'];
	var setNombreClienteContext = agent.context.get('setnombrecliente');
    var nombres = "";
    var apellidos = "";

	try {
		var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);
		var idTipoPrestamo = response.result[0].idTipoPrestamo;
		console.log(idTipoPrestamo);
		const setTipoPrestamoContext = agent.context.get("settipoprestamo");
		agent.context.set({
			'name': setTipoPrestamoContext.name, 
			'lifespan': 50,
			'parameters' : {'idTipoPrestamo': idTipoPrestamo}
		});

		var response = await requisitoService.getRequisitosByIdTipoPrestamo(idTipoPrestamo);

		if (response.status == "success") {

			agent.add("Los requisitos para " + nombreTipoPrestamo + " son:");
			response.result.forEach(object => {			
				agent.add(" " + object.descripcionRequisito);
			});			

			if (typeof setNombreClienteContext !== "undefined") {
                nombres = setNombreClienteContext.parameters['given-name.original'];
                apellidos = setNombreClienteContext.parameters['last-name.original'];
                
				if (nombres == "") {
					agent.add('Si estás interesado, por favor ingresa tus nombres');
				} else {
                    agent.add(nombres + " " + apellidos);
                    message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
                    console.log(message);
					agent.add(message);
				}
			} else {				
				agent.add('Si estás interesado, por favor ingresa tus nombres');
			}

		} else {
			agent.add('No se encontró el prestamo ingresado.');
		}

	} catch (error) {
        console.log(error);
		logger.debug(error);
        agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
	}	    	

}

module.exports = tipoPrestamoFullfilment;