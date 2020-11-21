'use strict';

var messagesUtil = {};

messagesUtil.getFieldsByComplete = function (idSession, agent) {

	const setPrestamoClienteContext = agent.context.get('setprestamocliente');

	const newPrestamoClienteArray = ['montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita'];
	let newArray = [];

	if (typeof setPrestamoClienteContext !== "undefined") {

		const prestamoClienteArray = [
			setPrestamoClienteContext.parameters['montoNecesitado'],
			setPrestamoClienteContext.parameters['tiempoNegocio'],
			setPrestamoClienteContext.parameters['ingresosAnuales'],
			setPrestamoClienteContext.parameters['puntajeCredito'],
			setPrestamoClienteContext.parameters['queNegocioTiene'],
			setPrestamoClienteContext.parameters['comoVaUsar'],
			setPrestamoClienteContext.parameters['cuanRapidoNecesita']
		];

		//console.log(prestamoClienteArray);

		var i = 0;		
		prestamoClienteArray.forEach(element => {
			//console.log(element);
			if (element == '' || element == null) {
				newArray.push(newPrestamoClienteArray[i]);
			}
			i++;
		});
	} else {
		newArray = newPrestamoClienteArray.concat();
	}

	//console.log(newArray);

    return newArray;
    
}

messagesUtil.getMessageForRequisitosPrestamoCliente = function (idSession, agent) {
    let answers = [];
	answers.push(['montoNecesitado', "¿Qué monto necesitas? (Ejemplo: Necesito 5000 dólares)"]);
	answers.push(['montoNecesitado', "¿Cuál es el monto requerido? (Ejemplo: Necesito 5000 dólares)"]);
	answers.push(['tiempoNegocio', "¿Qué tiempo tienes en el negocio? (Indique meses o años)"]);
	answers.push(['tiempoNegocio', "¿Cuánto tiempo tienes en el negocio? (Indique meses o años)"]);
	answers.push(['ingresosAnuales', "¿Cuáles son tus ingresos anuales? (Ejemplo: Mis ingresos son 50000 dólares)"]);
	answers.push(['ingresosAnuales', "¿Cuánto percibe anualmente tu negocio? (Ejemplo: Mis ingresos son 50000 dólares)"]);
	answers.push(['puntajeCredito', "¿Cuál es tu puntaje de crédito? (Entre 300 y 850 puntos)"]);
	answers.push(['puntajeCredito', "¿Cuál es tu fico score? (Entre 300 y 850 puntos)"]);
	answers.push(['queNegocioTiene', "¿Qué negocio tienes? (Ejemplo: Tengo un negocio de construcción)"]);
	answers.push(['queNegocioTiene', "¿A qué se dedica tu negocio? (Ejemplo: Mi negocio se dedica a la construcción)"]);
	answers.push(['comoVaUsar', "¿Cómo vas a usar el dinero? (Ejemplo: Lo voy a usar para comprar equipos)"]);
	answers.push(['comoVaUsar', "¿Para qué vas a usar el dinero? (Ejemplo: Lo voy a usar para pagar a mi personal)"]);
	answers.push(['cuanRapidoNecesita', "¿Cuán rápido quieres el préstamo? (Ejemplo: En una semana)"]);
	answers.push(['cuanRapidoNecesita', "¿Qué tan rápido requieres el préstamo? (Ejemplo: En 2 días)"]);

	let requisitosInicialesRestantesArray = messagesUtil.getFieldsByComplete(idSession, agent);
	const requisitosLength = requisitosInicialesRestantesArray.length;

	if (requisitosLength > 0) {

		let requisitosRandom = requisitosInicialesRestantesArray[Math.floor(Math.random() * requisitosLength)];

		//console.log(requisitosRandom);

		let newFrasesArray = [];

		answers.forEach(element => {
			//console.log(element);
			if (element[0] == requisitosRandom)	{
				newFrasesArray.push(element[1]);
			}
		});

		//console.log(newFrasesArray);

		var randomIndex = Math.floor(Math.random() * newFrasesArray.length); console.log(randomIndex);

		var message = newFrasesArray[randomIndex];

		return message;
	} else {
		return "";
	}
}

messagesUtil.getMessageForNombres = function () {
    let answers = [];
	answers.push("Indicanos tu nombre por favor.");
	answers.push("Por favor indicanos tu nombre.");
	answers.push("¿Cuál es tu nombre?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

messagesUtil.getMessageForTipoPrestamo = function () {
    let answers = [];
	answers.push("Indicanos el préstamo de tu interés.");
	answers.push("¿Cuál es el préstamo que estás interesado?");
	answers.push("Por favor indicanos el préstamo de tu interés.");
	answers.push("¿Qué préstamo deseas?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

messagesUtil.getDescriptionForFICO = function () {
    let answers = [];
	answers.push("El puntaje de crédito es básicamente un medidor o un record de comportamiento financiero, es una calificación.");
	answers.push("Esta calificación varia entre 300 y 850 puntos y en Estados Unidos que es una economía basada en crédito, este puntaje es uno de los datos más importantes de cualquier persona.");
	answers.push("Normalmente, las aplicaciones bancarias que tienes en tu celular te permiten inscribirte para monitorear tu puntaje de crédito de manera gratuita y sin afectarlo. También puedes consultarlo en http://creditkarma.com y http://creditchecktotal.com.");
	answers.push("Puedes obtener mas informacion en: https://inqmatic.com/10-preguntas-sobre-el-puntaje-de-credito/");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

messagesUtil.getDescriptionPrestamo = function () {
    let answers = [];
	answers.push("¿Tienes alguna otra duda?");
	answers.push("¿Deseas alguna otra información?");
	answers.push("¿Te podemos ayudar en algo más?");
	answers.push("¿Qué más necesitas?");

	var message = answers[Math.floor(Math.random() * answers.length)];

	return message;
}

module.exports = messagesUtil;