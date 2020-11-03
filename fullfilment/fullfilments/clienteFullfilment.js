'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const messagesUtil = require("../utils/messagesUtil");

var clienteFullfilment = {};

clienteFullfilment.extraerNombreCliente = async function (agent) {
    
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
        response = await clienteService.saveOrUpdateCliente(idSession, Cliente);

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
            let settipoprestamo = agent.context.get('settipoprestamo');

            if (typeof settipoprestamo !== "undefined") {
                let idTipoPrestamo = settipoprestamo.parameters['idTipoPrestamo'];
                let nombreTipoPrestamo = settipoprestamo.parameters['tipoPrestamo'];
                
                var message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession);

                if (idTipoPrestamo == "") {
                    agent.add("¿En qué podemos ayudarte?");
                } else {
                    agent.add("Has elegido: " + nombreTipoPrestamo);
                    agent.add(message);
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