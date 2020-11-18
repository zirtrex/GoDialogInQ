'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");
const promptUtil = require("../utils/promptUtil");
const tipoPrestamoUtil = require("../utils/tipoPrestamoUtil");
const clienteUtil = require("../utils/clienteUtil");

var tipoPrestamoFullfilment = {};

tipoPrestamoFullfilment.extraerTipoPrestamo = async function (agent) {

    const idSession = agent.session.split("/").reverse()[0];
  
    var verificarTipoPrestamo = await tipoPrestamoUtil.saveAndVerifyTipoPrestamo(agent);

    if (verificarTipoPrestamo) {
     
        agent.add('¿Estás interesado en este préstamo?');
    
    } else {
        //Cuando el tipo de prestamo no existe
        await promptUtil.getPromptTipoPrestamo(agent,"settipoprestamoprompt");
                
    }
    
}

tipoPrestamoFullfilment.extraerTipoPrestamoInteresadoSi = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

    var textVerifyTipoPrestamo = tipoPrestamoUtil.verifyTipoPrestamo(agent);

    if (textVerifyTipoPrestamo != "") {

        try {
            
            var idTipoPrestamo = agent.context.get('settipoprestamo').parameters['idTipoPrestamo'];
            var nombreTipoPrestamo = agent.context.get('settipoprestamo').parameters['tipoPrestamo'];

            var response = await requisitoService.getRequisitosByIdTipoPrestamo(idTipoPrestamo);

            if (response.status == "success") {

                agent.add("Los requisitos para " + nombreTipoPrestamo + " son:");
                response.result.forEach(object => {			
                    agent.add(" " + object.descripcionRequisito);
                });		
                
                var textVerifyNombres = clienteUtil.verifyNombres(agent);

                //Se validan los nombres
                if (textVerifyNombres != "") {

                    var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
                    //Se validan los requisitos
                    if (message == "") {
                        //Se valida el préstamo y la calificación
                        agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));
        
                    } else {        
                        agent.add(message);
                    }
                } else {
                    
                    agent.add("Si deseas continuar, por favor ingresa tus nombres");
                }

            } else {
                agent.add('No se encontraron requisitos.');
            }

        } catch (error) {
            console.log(error);
            logger.debug(error);
            agent.add('Estamos experimentando problemas, intenta de nuevo por favor.');
        }

    } else {
		await promptUtil.getPromptTipoPrestamo(agent, "settipoprestamo_prompt");
	}

    
}

module.exports = tipoPrestamoFullfilment;