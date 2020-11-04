'user strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const logger = require("../utils/loggerUtil");
const messagesUtil = require("../utils/messagesUtil");

var prestamoClienteFullfilment = {};

prestamoClienteFullfilment.extraerMontoNecesitado = async function (agent) {
    
    const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setMontoNecesitadoContext = agent.context.get('setmontonecesitado');

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

		var montoNecesitado = setMontoNecesitadoContext.parameters['montoNecesitado.original'];
		var tiempoNegocio = null;
		var ingresosAnuales = null;
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setTiempoNegocioContext = agent.context.get('settiemponegocio');

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
		var tiempoNegocio = setTiempoNegocioContext.parameters['tiempoNegocio.original'];
		var ingresosAnuales = null;
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			//tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setIngresosAnualesContext = agent.context.get('setingresosanuales');

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
		var ingresosAnuales = setIngresosAnualesContext.parameters['ingresosAnuales.original'];
		var puntajeCredito = null;
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			//ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerPuntajeCredito = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setPuntajeCreditoContext = agent.context.get('setpuntajecredito');

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
		var puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito.original'];
		var queNegocioTiene = null;
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			//puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerQueNegocioTiene = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setQueNegocioTieneContext = agent.context.get('setquenegociotiene');

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
		var queNegocioTiene = setQueNegocioTieneContext.parameters['queNegocioTiene.original'];
		var comoVaUsar = null;
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
			//queNegocioTiene = setPrestamoClienteContext.parameters['queNegocioTiene'];
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerComoVaUsar = async function (agent) {
    
	const idSession = agent.session.split("/").reverse()[0];
	
	//Contextos
	const setTipoPrestamoContext = agent.context.get('settipoprestamo');
	const setNombreClienteContext = agent.context.get('setnombrecliente');	
	const setClienteContext = agent.context.get('setcliente');
	const setPrestamoClienteContext = agent.context.get('setprestamocliente');
	const setComoVaUsarContext = agent.context.get('setcomovausar');

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
		var comoVaUsar = setComoVaUsarContext.parameters['comoVaUsar.original'];
		var cuanRapidoNecesita = null;

		if (typeof setPrestamoClienteContext !== 'undefined') {
			montoNecesitado = setPrestamoClienteContext.parameters['montoNecesitado'];
			tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
			ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
			puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
			queNegocioTiene = setPrestamoClienteContext.parameters['queNegocioTiene'];
			//comoVaUsar = setPrestamoClienteContext.parameters['comoVaUsar'];
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
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
				message = await messagesUtil.getMessageForRequisitosPrestamoCliente(idSession, agent);
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

}

module.exports = prestamoClienteFullfilment;