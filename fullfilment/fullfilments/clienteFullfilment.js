'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

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

    const setNombreCliente = agent.context.get('setnombrecliente');
    var nombres = setNombreCliente.parameters['given-name.original'];		
    var apellidos = setNombreCliente.parameters['last-name.original'];
    var saludo = setNombreCliente.parameters['saludo'];

    Cliente = {
        "idSession": idSession,
        "nombres": nombres,
        "apellidos": apellidos
    };

    try {

        if (comprobarcorreo) {
            var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

            if (response.result.affectedRows == 1) {
                let idCliente;
                if (typeof response.result.idCliente === "undefined") {
                    idCliente = response.result.insertId;
                } else {
                    idCliente = response.result.idCliente;
                }
                const existingContext = agent.context.get("setnombrecliente");
                agent.context.set({
                    'name': existingContext.name,
                    'lifespan': 50,
                    'parameters' : {'idCliente': idCliente}
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
        }

        
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	

}



clienteFullfilment.extraerCorreoCliente = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];	

    const setNombreCliente = agent.context.get('setcorreocliente');
    var nombres = setNombreCliente.parameters['given-name.original'];		
    var apellidos = setNombreCliente.parameters['last-name.original'];
    var saludo = setNombreCliente.parameters['saludo'];

    Cliente = {
        "idSession": idSession,
        "nombres": nombres,
        "apellidos": apellidos
    };

    try {
        var response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

        if (response.result.affectedRows == 1) {
            let idCliente;
            if (typeof response.result.idCliente === "undefined") {
                idCliente = response.result.insertId;
            } else {
                idCliente = response.result.idCliente;
            }
            const existingContext = agent.context.get("setnombrecliente");
            agent.context.set({
                'name': existingContext.name,
                'lifespan': 50,
                'parameters' : {'idCliente': idCliente}
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
    } catch (error) {
        console.error(error);
        agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
    }	

}



module.exports = clienteFullfilment;