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
    const setPrestamoClienteContext = agent.context.get('setprestamocliente');
    
    //inicializar variables
    var saludo = "";
    var nombres = "";		
    var apellidos = "";
    var telefono = "";
    var correo = "";

    if (typeof setClienteContext !== 'undefined') {
        nombres = setClienteContext.parameters['nombres'];		
        apellidos = setClienteContext.parameters['apellidos'];
        telefono = setClienteContext.parameters['telefono'];
        correo = setClienteContext.parameters['correo'];
    }

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
<<<<<<< HEAD

        var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

=======

        var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

>>>>>>> 02c6832add96e4e4fbce9e21ea1c14d8c6bd4ee5
        if (response.result.affectedRows == 1) {
            console.log("Datos del cliente guardados correctamente.");
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
                    'telefono': telefono,
                    'correo': correo
                }
            });

            agent.add(saludo + " " + nombres + " " + apellidos + ", gracias por escribirnos");

            //Detectar si ya eligió un tipo de préstamo
            var setTipoPrestamoContext = agent.context.get('settipoprestamo');

            if (typeof setTipoPrestamoContext !== 'undefined') {
                var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
                var nombreTipoPrestamo = setTipoPrestamoContext.parameters['tipoPrestamo'];              

                console.log("idPrestamo " + idTipoPrestamo);

                if (idTipoPrestamo != "" || idTipoPrestamo != null) {
                    agent.add("Has elegido: " + nombreTipoPrestamo);
                    var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
                    console.log(message);

                    if (message == "") {
                        const setClienteContext = agent.context.get('setcliente');

                        if (typeof setClienteContext !== 'undefined') {
                            var correo = setClienteContext.parameters['correo'];
                            var telefono = setClienteContext.parameters['telefono'];
                            
                            if (correo == "" || correo == null) {
                                agent.add("Ingrese por favor su correo.");
                            } else if (telefono == "" || telefono == null) {
                                agent.add("Ingrese por favor su telefono.");
                            } else {
                                if (typeof setPrestamoClienteContext !== 'undefined') {
                                    agent.add("Gracias por contactarnos.");
                                    var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
                                    var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
                                    var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
                                    //tiempoNegocio > 1 && 
                                    if (ingresosAnuales > 5000 && puntajeCredito > 500) {
                                        agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
                                    } else {
                                        agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
                                    }
                                    agent.clearOutgoingContexts();
                                }
                            }
                        }
                    } else {
                        
                        agent.add(message);
                    }
                    
                } else {
                    agent.add("¿En qué préstamo estás interesado?");
                }
            } else {				
                agent.add("¿En qué préstamo estás interesado?");
            }
            
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