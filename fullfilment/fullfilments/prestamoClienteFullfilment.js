'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.verifyAndSave = async function (agent, requisito) {
    
    const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	if (typeof setClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setClienteContext.parameters['nombres'] === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			return message;
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			return message;
		}
		
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

		TipoPrestamo = {
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

			console.log(newArray);

			if (newArray.length > 0 ) {
				
				return message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);

			} else {
				var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
				var result = response.result;
				console.log(response);
	
				if (result.affectedRows == 1) {
					
					return "Gracias por completar las preguntas";
					
				} else {
					//agent.add("Ha ocurrido un error al guardar su información.");
					console.log("No se han guardado los datos");
				}
			}		
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			return "Estamos experimentando problemas, intenta de nuevo por favor.";
		}
	}

}

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");
	agent.add(message);

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");
	agent.add(message);

}

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");
	agent.add(message);

}

prestamoClienteFullfilment.extraerPuntajeCredito = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");
	agent.add(message);

}

prestamoClienteFullfilment.extraerQueNegocioTiene = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");
	agent.add(message);

}

prestamoClienteFullfilment.extraerComoVaUsar = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "comoVaUsar");
	agent.add(message);

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "cuanRapidoNecesita");
	agent.add(message);

}

/*prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setCuanRapidoNecesitaContext = agent.context.get('setcuanrapidonecesita');

	if (typeof setNombreClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setNombreClienteContext === 'undefined') {
			var message = messagesUtil.getMessageForNombres();
			agent.add(message);
		} else {
			var message = messagesUtil.getMessageForTipoPrestamo();
			agent.add(message);
		}
		
	} else {
		var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
		var idCliente = setNombreClienteContext.parameters['idCliente'];		

		var montoNecesitado = null;
		var tiempoNegocio = null;
		var ingresosAnuales = null;
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = setCuanRapidoNecesitaContext.parameters['cuanRapidoNecesita.original'];

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
			queNegocioTiene = setPrestamoClienteContext.parameters['queNegocioTiene'];
			comoVaUsar = setPrestamoClienteContext.parameters['comoVaUsar'];
			//cuanRapidoNecesita = setPrestamoClienteContext.parameters['cuanRapidoNecesita'];
		}

		TipoPrestamo = {
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
			var response = await prestamoClienteService.saveOrUpdatePrestamoCliente(idSession, TipoPrestamo);
			var result = response.result;
			console.log(response);
	
			if (result.affectedRows == 1) {
				//Cuando guardamos el monto guardamos los datos al contexto setprestamocliente
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

				agent.add('Gracias');
				message = messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
				console.log(message);
				agent.add(message);
			} else {
				agent.add("Ha ocurrido un error.");
			}
	
		} catch (error) {
			console.error(error);
			logger.debug(error);
			agent.add("Estamos experimentando problemas, intenta de nuevo por favor.");
		}
	}

}*/

module.exports = prestamoClienteFullfilment;