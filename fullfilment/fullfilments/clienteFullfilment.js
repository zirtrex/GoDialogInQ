'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const clienteUtil = require("../utils/clienteUtil");
const promptUtil = require("../utils/promptUtil");

var clienteFullfilment = {};

clienteFullfilment.verifyAndSave = async function (agent) {
 
    const idSession = agent.session.split("/").reverse()[0];	
    //contextos
    const setClienteContext = agent.context.get('setcliente');
    const setNombreClienteContext = agent.context.get('setnombrecliente');
    const setTelefonoClienteContext = agent.context.get('settelefonocliente');
    const setCorreoClienteContext = agent.context.get('setcorreocliente');
    
    //variables
    var saludo = "";
    var nombres = "";		
    var apellidos = "";
    var telefono = "";
    var correo = "";

    if (typeof setNombreClienteContext !== 'undefined') {
        saludo = setNombreClienteContext.parameters['saludo'];
        nombres = setNombreClienteContext.parameters['given-name.original'];		
        apellidos = setNombreClienteContext.parameters['last-name.original'];
    }
    if (typeof setTelefonoClienteContext !== 'undefined') {
        telefono = setTelefonoClienteContext.parameters['phone-number.original'];
    }
    if (typeof setCorreoClienteContext !== 'undefined') {
        correo = setCorreoClienteContext.parameters['email.original'];
    }
    
    //Objeto cliente a guardar
    Cliente = {
        "idSession": idSession,
        "nombres": nombres,
        "apellidos": apellidos,
        "telefono": telefono,
        "correo": correo
    };

    try {

        if (typeof setTelefonoClienteContext !== 'undefined') {

            if (typeof setCorreoClienteContext !== 'undefined') {

                var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

                if (response.result.affectedRows == 1) {
                    var idCliente;
                    if (typeof response.result.idCliente === "undefined") {
                        idCliente = response.result.insertId;
                    } else {
                        idCliente = response.result.idCliente;
                    }
                    
                    //creando variable contexto setcliente se dispara a Dialogflow session setcliente
                    agent.context.set({
                        'name': "setcliente",
                        'lifespan': 50,
                        'parameters' : {
                            'idCliente': idCliente,
                            'nombres': nombres,
                            'apellidos': apellidos,
                            "telefono": telefono,
                            "correo": correo
                        }
                    });
        
                    agent.add(saludo + " " + nombres + " " + apellidos + ", gracias por escribirnos");
        
                    //Detectar si ya eligió un tipo de préstamo
                    var setTipoPrestamoContext = agent.context.get('settipoprestamo');
        
                    if (typeof setTipoPrestamoContext !== 'undefined') {
                        var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
                        var nombreTipoPrestamo = setTipoPrestamoContext.parameters['tipoPrestamo'];              
        
                        console.log("idPrestamo " + idTipoPrestamo);
        
                        if (typeof idTipoPrestamo !== 'undefined') {
                            agent.add("Has elegido: " + nombreTipoPrestamo);
                            var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
                            console.log(message);
                            agent.add(message);
                        } else {
                            agent.add("¿En qué préstamo estás interesado?");
                        }
                    } else {				
                        agent.add("¿En qué préstamo estás interesado?");
                    }
        
                    console.log("Datos del cliente guardados correctamente.");
                }
            
            }else
            {
                agent.add("Ingrese por favor su correo.");
            }
            
        }else
        {
            agent.add("Ingrese por favor su teléfono.");
        } 
       

        
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	
 
}

clienteFullfilment.extraerNombreCliente = async function (agent) {

    await clienteFullfilment.verifyAndSave(agent);
    
}

clienteFullfilment.extraerTelefonoCliente = async function (agent) {

    const setTelefonoClienteContext = agent.context.get('settelefonocliente');

    var telefono = setTelefonoClienteContext.parameters['phone-number'];    
    
    if (clienteUtil.getValidatePhoneNumber(telefono) == "success") {

        await clienteFullfilment.verifyAndSave(agent);

    } else {        

        promptUtil.getPromptCliente(agent, "settelefonocliente", "El teléfono no es válido.", "Ingrese un numero con el siguiente formato: 9999999999");
    }
        
}

clienteFullfilment.extraerCorreoCliente = async function (agent) {

    const setCorreoClienteContext = agent.context.get('setcorreocliente');
    
    var correo = setCorreoClienteContext.parameters['email'];
    
    if (clienteUtil.getValidateEmail(correo) == "success") {

        await clienteFullfilment.verifyAndSave(agent);

    } else {       

        promptUtil.getPromptCliente(agent, "setcorreocliente", "El correo no es válido.", "Por favor, debes ingresar un correo válido");
    }

}

module.exports = clienteFullfilment;