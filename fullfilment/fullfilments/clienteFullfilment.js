'use strict';

const clienteUtil = require("../utils/clienteUtil");
const promptUtil = require("../utils/promptUtil");

var clienteFullfilment = {};


clienteFullfilment.extraerNombreCliente = async function (agent) {
    
    if (clienteUtil.verifyNombres(agent) !== "") {

        await clienteUtil.verifyAndSaveCliente(agent);

    } else {        

        promptUtil.getPromptCliente(agent, "setnombreclienteprompt", "No entendemos su nombre.", "Lo siento seguimos sin entenderlo.");
    }
    
}

clienteFullfilment.extraerTelefonoCliente = async function (agent) {

    const setTelefonoClienteContext = agent.context.get('settelefonocliente');

    var telefono = setTelefonoClienteContext.parameters['phone-number'];
    
    if (clienteUtil.validateCelular(telefono) == "success") {

        await clienteUtil.verifyAndSaveCliente(agent);

    } else {        

        promptUtil.getPromptCliente(agent, "settelefonoclienteprompt", "El celular no es válido.", "Ingrese un numero con el siguiente formato: 9999999999");
    }
        
}

clienteFullfilment.extraerCorreoCliente = async function (agent) {

    const setCorreoClienteContext = agent.context.get('setcorreocliente');
    
    var correo = setCorreoClienteContext.parameters['email'];
    
    if (clienteUtil.validateEmail(correo) == "success") {

        await clienteUtil.verifyAndSaveCliente(agent);

    } else {       

        promptUtil.getPromptCliente(agent, "setcorreoclienteprompt", "El correo no es válido.", "Por favor, debes ingresar un correo válido");
    }

}

module.exports = clienteFullfilment;