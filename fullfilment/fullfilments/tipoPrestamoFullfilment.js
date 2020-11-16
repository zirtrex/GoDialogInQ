'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");
const prompUtil = require("../utils/promptUtil");
const tipoPrestamoUtil = require("../utils/tipoPrestamoUtil");
const clienteUtil = require("../utils/clienteUtil");

var tipoPrestamoFullfilment = {};

tipoPrestamoFullfilment.extraerTipoPrestamo = async function (agent) {

    const idSession = agent.session.split("/").reverse()[0];
  
    var verificarTipoPrestamo =  tipoPrestamoUtil.saveAndVerifyTipoPrestamo(idSession, agent);

    if (verificarTipoPrestamo) {
     
        agent.add('¿Estás interesado en este préstamo?');
    
    } else {

        //Cuando el tipo de prestamo no existe
        prompUtil.getPromptTipoPrestamo(agent,"settipoprestamo");
                
    }
    
}

tipoPrestamoFullfilment.extraerTipoPrestamoInteresadoSi = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];

    var idTipoPrestamo = response.result[0].idTipoPrestamo;
    var textValidateTipoPrestamo = tipoPrestamoUtil.getValidateTipoPrestamo(idSession, agent);

    if (textValidateTipoPrestamo != "") {

        try {
            var response = await requisitoService.getRequisitosByIdTipoPrestamo(idTipoPrestamo);

            if (response.status == "success") {

                agent.add("Los requisitos para " + nombreTipoPrestamo + " son:");
                response.result.forEach(object => {			
                    agent.add(" " + object.descripcionRequisito);
                });		
                
                var textValidateNombres = clienteUtil.getValidateNombres(idSession,agent);

                if (textValidateNombres != "") {

                    var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
                    if (message == "") {
        
                        response = prestamoClienteUtil.getValidatePrestamoCliente("",agent);
        
                    } else {        
                        response = message;
                    }
                }else {
                    
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

    }else {

		prompUtil.getPromptTipoPrestamo(agent,"settipoprestamo");
	}

    
}

module.exports = tipoPrestamoFullfilment;