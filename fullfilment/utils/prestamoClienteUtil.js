'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

var prestamoClienteUtil = {};

prestamoClienteUtil.getCalificacionPrestamoCliente = function (tiempoNegocio, ingresosAnuales, puntajeCredito) {

    //tiempoNegocio > 1 && 
    if (ingresosAnuales >= 5000 && puntajeCredito >= 500) {
        return "Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.";
    } else {
        return "Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion";
    }     

}

prestamoClienteUtil.getValidatePrestamoCliente = function (agent) {

    let response = "";

    const setPrestamoClienteContext = agent.context.get('setprestamocliente');

    if (typeof setPrestamoClienteContext !== 'undefined') {

        const setClienteContext = agent.context.get('setcliente');

        if (typeof setClienteContext !== 'undefined') {

            var telefono = setClienteContext.parameters['telefono'];
            var correo = setClienteContext.parameters['correo'];

            if (telefono == "" || telefono == null) {
                response = "Ingrese por favor su celular.";
            } else if (correo == "" || correo == null) {
                response = "Ingrese por favor su correo.";
            } else {
                var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
                var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
                var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];

                response = prestamoClienteUtil.getCalificacionPrestamoCliente(tiempoNegocio, ingresosAnuales, puntajeCredito);

                prestamoClienteUtil.clearAllContexts(agent);
            }
        } else {
            response = "Ingrese por favor su celular.";
        }            
    } else {
        response = "";
    }
           
    return response;
}

prestamoClienteUtil.verifyAndSavePrestamoCliente = async function (agent, context) {
    
    const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setMontoNecesitadoContext = agent.context.get('setmontonecesitado');
	const setTiempoNegocioContext = agent.context.get('settiemponegocio');
	const setIngresosAnualesContext = agent.context.get('setingresosanuales');
	const setPuntajeCreditoContext = agent.context.get('setpuntajecredito');
	const setQueNegocioTieneContext = agent.context.get('setquenegociotiene');	
	const setComoVaUsarContext = agent.context.get('setcomovausar');
	const setCuanRapidoNecesitaContext = agent.context.get('setcuanrapidonecesita');

	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	if (typeof setClienteContext === 'undefined') {
		
		return  messagesUtil.getMessageForNombres();
		
	} else if (typeof setTipoPrestamoContext === 'undefined') {

		return messagesUtil.getMessageForTipoPrestamo();

	} else {
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
		var idCliente = setClienteContext.parameters['idCliente'];

		var montoNecesitado = null;
		var tiempoNegocio = null;
		var ingresosAnuales = null;
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
			queNegocioTiene = setPrestamoClienteContext.parameters['queNegocioTiene'];
			comoVaUsar = setPrestamoClienteContext.parameters['comoVaUsar'];
			cuanRapidoNecesita = setPrestamoClienteContext.parameters['cuanRapidoNecesita'];
		}

		if (typeof setMontoNecesitadoContext !== 'undefined') {
			montoNecesitado = setMontoNecesitadoContext.parameters['montoNecesitado.original'];
		}	
		if (typeof setTiempoNegocioContext !== 'undefined') {
            tiempoNegocio = setTiempoNegocioContext.parameters['tiempoNegocio'];			
		}
		if (typeof setIngresosAnualesContext !== 'undefined') {
			ingresosAnuales = setIngresosAnualesContext.parameters['ingresosAnuales.original'];
		}	
		if (typeof setPuntajeCreditoContext !== 'undefined') {
            puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito'];			
		}
		if (typeof setQueNegocioTieneContext !== 'undefined') {
			queNegocioTiene = setQueNegocioTieneContext.parameters['queNegocioTiene'];
		}	
		if (typeof setComoVaUsarContext !== 'undefined') {
			comoVaUsar = setComoVaUsarContext.parameters['comoVaUsar'];
		}
		if (typeof setCuanRapidoNecesitaContext !== 'undefined') {
			cuanRapidoNecesita = setCuanRapidoNecesitaContext.parameters['cuanRapidoNecesita'];
		}

		const TipoPrestamo = {
			"idSession": idSession,
			"montoNecesitado": montoNecesitado,
			"tiempoNegocio": tiempoNegocio,
			"ingresosAnuales": ingresosAnuales,
			"puntajeCredito": puntajeCredito,
			"queNegocioTiene": queNegocioTiene,
			"comoVaUsar": comoVaUsar,
			"cuanRapidoNecesita": cuanRapidoNecesita,
			"idTipoPrestamo": idTipoPrestamo,
			"idCliente": idCliente
		};
		console.log(TipoPrestamo);

		try {

			agent.context.set({
				'name': "setprestamocliente",
				'lifespan': 50,
				'parameters' : {
					"montoNecesitado": montoNecesitado,
					"tiempoNegocio": tiempoNegocio,
					"ingresosAnuales": ingresosAnuales,
					"puntajeCredito": puntajeCredito,
					"queNegocioTiene": queNegocioTiene,
					"comoVaUsar": comoVaUsar,
					"cuanRapidoNecesita": cuanRapidoNecesita,
					"idTipoPrestamo": idTipoPrestamo,
					"idCliente": idCliente
				}
			});

			var tipoPrestamoArray = (Object.values(TipoPrestamo));

			console.log(tipoPrestamoArray);

			let newArray = [];

			tipoPrestamoArray.forEach(element => {
				if (element == null || element == '') {
					newArray.push(tipoPrestamoArray);
				}	
			});

            //Buscamos si aún faltan requisitos
			if (newArray.length > 0 ) {
				return messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
			} else {

                //Si los requisitos están completos guardamos al BD
				var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
				var result = await response.result;
				console.log(response);
	
				if (result.affectedRows == 1) {					
					return "success";					
				} else {
					console.log("Ha ocurrido un error al guardar en la tabla prestamo_cliente");
					return "Ha ocurrido un error.";
				}
			}		
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			return "Estamos experimentando problemas, intenta de nuevo por favor.";
		}
	}

}

prestamoClienteUtil.clearAllContexts = function (agent) {

	//console.log(agent.contexts);

	const contexts = agent.contexts;

	contexts.forEach(context => {
		agent.context.delete(context.name);
	});

}

module.exports = prestamoClienteUtil;
