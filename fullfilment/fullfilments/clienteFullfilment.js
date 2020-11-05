'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

const clienteUtil = require("../utils/clienteUtil");

/* 
var respuestaCorreo = clienteUtil.getValidateEmail("jorgésys.boc+al@hotflow.cs");
console.log(respuestaCorreo);
var respuestaTelefono = clienteUtil.getValidatePhoneNumber("123");
console.log(respuestaTelefono);
 */




var clienteFullfilment = {};


clienteFullfilment.extraerNombreCliente = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];	

    //contextos
    const setClienteContext = agent.context.get('setcliente');
    const setNombreClienteContext = agent.context.get('setnombrecliente');

    //variables
    var nombres = setNombreClienteContext.parameters['given-name.original'];		
    var apellidos = setNombreClienteContext.parameters['last-name.original'];
    var saludo = setNombreClienteContext.parameters['saludo'];
    var telefono="";
    var correo="";

    if (typeof setClienteContext !== 'undefined') {
        telefono = setClienteContext.parameters['phone-number.original'];
        correo = setClienteContext.parameters['email.original'];
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
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	

}




clienteFullfilment.extraerTelefonoCliente = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];	

    //contextos
    const setClienteContext = agent.context.get('setcliente');
    const setTelefonoClienteContext = agent.context.get('settelefonocliente');

    //variables
    var nombres = "";		
    var apellidos = "";
    var saludo = "";
    var telefono = setTelefonoClienteContext.parameters['phone-number.original'];
    var correo = "";

    if (typeof setClienteContext !== 'undefined') {
        nombres = setClienteContext.parameters['given-name.original'];		
        apellidos = setClienteContext.parameters['last-name.original'];
        saludo = setClienteContext.parameters['saludo'];
        correo = setClienteContext.parameters['email.original'];
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

        if (clienteUtil.getValidatePhoneNumber(telefono)=="success") {
            var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

            if (response.result.affectedRows == 1) {
                let idCliente;
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

                agent.add(saludo + " " + nombres + ", gracias por escribirnos");

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
                        agent.add("¿En qué podemos ayudarte?");
                    }
                } else {				
                    agent.add("¿En qué podemos ayudarte?");
                }

                console.log("Datos del cliente guardados correctamente.");
            }
        } else {
           //Pront 
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

        
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	

}



clienteFullfilment.extraerCorreoCliente = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];	

     //contextos
     const setClienteContext = agent.context.get('setcliente');
     const setCorreoClienteContext = agent.context.get('setcorreocliente');
 
     //variables
     var nombres = "";		
     var apellidos = "";
     var saludo = "";
     var telefono = "";
     var correo = setCorreoClienteContext.parameters['email.original'];
 
     if (typeof setClienteContext !== 'undefined') {
         nombres = setClienteContext.parameters['given-name.original'];		
         apellidos = setClienteContext.parameters['last-name.original'];
         saludo = setClienteContext.parameters['saludo'];
         telefono = setClienteContext.parameters['phone-number.original'];
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

        if (clienteUtil.getValidateEmail(correo)=="success") {
        var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

        if (response.result.affectedRows == 1) {
            let idCliente;
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


            agent.add(saludo + " " + nombres + ", gracias por escribirnos");

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
                    agent.add("¿En qué podemos ayudarte?");
                }
            } else {				
                agent.add("¿En qué podemos ayudarte?");
            }

            console.log("Datos del cliente guardados correctamente.");
        }

    }else
    {

        //Pront 
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

    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	

}



module.exports = clienteFullfilment;