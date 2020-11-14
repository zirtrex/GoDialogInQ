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

	if (typeof setClienteContext === 'undefined' || typeof setTipoPrestamoContext === 'undefined') {

		if (typeof setClienteContext !== 'undefined') {
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

		if (typeof setMontoNecesitadoContext !== 'undefined') {
			montoNecesitado = setMontoNecesitadoContext.parameters['montoNecesitado.original'];
		}	
		if (typeof setTiempoNegocioContext !== 'undefined') {
			tiempoNegocio = setTiempoNegocioContext.parameters['tiempoNegocio.original'];
		}
		if (typeof setIngresosAnualesContext !== 'undefined') {
			ingresosAnuales = setIngresosAnualesContext.parameters['ingresosAnuales.original'];
		}	
		if (typeof setPuntajeCreditoContext !== 'undefined') {
			puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito.original'];
		}
		if (typeof setQueNegocioTieneContext !== 'undefined') {
			queNegocioTiene = setQueNegocioTieneContext.parameters['queNegocioTiene.original'];
		}	
		if (typeof setComoVaUsarContext !== 'undefined') {
			comoVaUsar = setComoVaUsarContext.parameters['comoVaUsar.original'];
		}
		if (typeof setCuanRapidoNecesitaContext !== 'undefined') {
			cuanRapidoNecesita = setCuanRapidoNecesitaContext.parameters['cuanRapidoNecesita.original'];
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
					
					return "success";
					
				} else {
					console.log("No se han guardado los datos");
					return "Ha ocurrido un error al guardar su información.";					
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

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {

				if (setClienteContext.parameters['telefono'] == "") {
					agent.add("Ingrese por favor su teléfono.");
				} else if (setClienteContext.parameters['correo'] == "") {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
				}
			} else {
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerTiempoNegocio = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "");

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {
				var telefono = setClienteContext.parameters['telefono'];
				var correo = setClienteContext.parameters['correo'];

				if (telefono == "" || telefono == null) {
					agent.add("Ingrese por favor su teléfono.");
				} else if (correo == "" || correo == null) {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
					//agent.clearOutgoingContexts();
				}
			} else {
				console.log("setClienteContext es igual a vacio");
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerIngresosAnuales = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {

				if (setClienteContext.parameters['telefono'] == "") {
					agent.add("Ingrese por favor su teléfono.");
				} else if (setClienteContext.parameters['correo'] == "") {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
				}
			} else {
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerPuntajeCredito = async function (agent) {

	const idSession = agent.session.split("/").reverse()[0];
	
	const setPuntajeCreditoContext = agent.context.get('setpuntajecredito');

	if (typeof setPuntajeCreditoContext !== 'undefined') {

		var puntajeCredito = setPuntajeCreditoContext.parameters['puntajeCredito'];

		if (puntajeCredito  == '' || puntajeCredito == null) {

			let answer = [];
			answer.push("El puntaje de crédito es básicamente un medidor o un record de comportamiento financiero, es una calificación.");
			answer.push("Esta calificación varia entre 300 y 850 puntos y en Estados Unidos que es una economía basada en crédito, este puntaje es uno de los datos más importantes de cualquier persona.");
			answer.push("Normalmente, las aplicaciones bancarias que tienes en tu celular te permiten inscribirte para monitorear tu puntaje de crédito de manera gratuita y sin afectarlo. También puedes consultarlo en http://creditkarma.com y http://creditchecktotal.com.");
			answer.push("Puedes obtener mas informacion en: https://inqmatic.com/10-preguntas-sobre-el-puntaje-de-credito/");

			var indexRandom = Math.floor(Math.random() * answer.length);
			var message = answer[indexRandom];
			agent.add(message);
			agent.add("Ingresa tu puntaje de crédito");

		} else {

			var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

			if (message === "success") {
				const setPrestamoClienteContext = agent.context.get('setprestamocliente');

				if (typeof setPrestamoClienteContext !== 'undefined') {

					const setClienteContext = agent.context.get('setcliente');
		
					if (typeof setClienteContext !== 'undefined') {
		
						if (setClienteContext.parameters['telefono'] == "") {
							agent.add("Ingrese por favor su teléfono.");
						} else if (setClienteContext.parameters['correo'] == "") {
							agent.add("Ingrese por favor su correo.");
						} else {
							var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
							var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
							var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
							//tiempoNegocio > 1 && 
							if (ingresosAnuales > 5000 && puntajeCredito > 500) {
								agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
							} else {
								agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
							}
						}
					} else {
						agent.add("Ingrese por favor su teléfono.");
					}
					
				} else {
					agent.add('');
				}
			} else {

				agent.add(message);
			}

		}
		
	}

}

prestamoClienteFullfilment.extraerQueNegocioTiene = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {

				if (setClienteContext.parameters['telefono'] == "") {
					agent.add("Ingrese por favor su teléfono.");
				} else if (setClienteContext.parameters['correo'] == "") {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
				}
			} else {
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerComoVaUsar = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {

				if (setClienteContext.parameters['telefono'] == "") {
					agent.add("Ingrese por favor su teléfono.");
				} else if (setClienteContext.parameters['correo'] == "") {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
				}
			} else {
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

}

prestamoClienteFullfilment.extraerCuanRapidoNecesita = async function (agent) {
    
	var message = await prestamoClienteFullfilment.verifyAndSave(agent, "montoNecesitado");

	if (message === "success") {
		const setPrestamoClienteContext = agent.context.get('setprestamocliente');		

		if (typeof setPrestamoClienteContext !== 'undefined') {

			const setClienteContext = agent.context.get('setcliente');

			if (typeof setClienteContext !== 'undefined') {

				if (setClienteContext.parameters['telefono'] == "") {
					agent.add("Ingrese por favor su teléfono.");
				} else if (setClienteContext.parameters['correo'] == "") {
					agent.add("Ingrese por favor su correo.");
				} else {
					var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
					var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
					var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
					//tiempoNegocio > 1 && 
					if (ingresosAnuales > 5000 && puntajeCredito > 500) {
						agent.add("Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.");
					} else {
						agent.add('Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion');
					}
				}
			} else {
				agent.add("Ingrese por favor su teléfono.");
			}
			
		} else {
			agent.add('');
		}
	} else {

		agent.add(message);
	}

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