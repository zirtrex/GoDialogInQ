'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");
const promptUtil = require("../utils/promptUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");
const tipoPrestamoUtil = require("../utils/tipoPrestamoUtil");

var clienteUtil = {};

//console.log(`valid: ${correo.valid}, test: ${regex.test(correo.correo)}`);

clienteUtil.validateEmail = function (correo)
{
    var resul="";
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo))
    {
        return resul = "success";
    }else
    {
        return resul = "error";
    }
    
}

clienteUtil.validateCelular = function (telefono)
{
    var resul="";
     //if (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(correo)) {
    ///^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    ///^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    if (/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/.test(telefono)) {
        return resul = "success";
        } else {
        return resul = "error";
    }
   
}

clienteUtil.verifyNombres = function (agent) {

    let response = "";

    const setNombreClienteContext = agent.context.get('setnombrecliente');
        
    if (typeof setNombreClienteContext !== "undefined") {
        let nombres = setNombreClienteContext.parameters['given-name.original'];
        let apellidos = setNombreClienteContext.parameters['last-name.original'];
        
        if (nombres == "") {
            response = "";
        } else {
            response = nombres + " " + apellidos;
        }
    } else {				
        response = "";
    }
           
    return response;
}

clienteUtil.verifyAndSaveCliente = async function (agent) {
 
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
    const Cliente = {
        "idSession": idSession,
        "nombres": nombres,
        "apellidos": apellidos,
        "telefono": telefono,
        "correo": correo
    };
    console.log(Cliente);

    try {

        var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

        if (response.result.affectedRows >= 1) {

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
                'lifespan': 80,
                'parameters' : {
                    'idCliente': idCliente,
                    'nombres': nombres,
                    'apellidos': apellidos,
                    'telefono': telefono,
                    'correo': correo
                }
            });

             //Detectar si ya eligió un tipo de préstamo
            var textVerifyTipoPrestamo = tipoPrestamoUtil.verifyTipoPrestamo(agent);

            if (textVerifyTipoPrestamo != "") {

                //agent.add(textVerifyTipoPrestamo);
                
                var message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
               
                if (message == "") {

                    agent.add(prestamoClienteUtil.getValidatePrestamoCliente(agent));

                } else {
                    
                    agent.add(message);
                }
            } else {
                agent.add(saludo + " " + nombres + " " + apellidos + ", gracias por escribirnos");
                agent.add(messagesUtil.getMessageForTipoPrestamo());
            }
        } else {
            console.log("Error al guardar datos del cliente.");
        }
        
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }
 
}

module.exports = clienteUtil;
