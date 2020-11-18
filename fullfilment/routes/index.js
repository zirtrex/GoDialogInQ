'use strict';

const express = require('express');
const router = express.Router();

const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

const clienteFullfilment = require("../fullfilments/clienteFullfilment");
const tipoPrestamoFullfilment = require("../fullfilments/tipoPrestamoFullfilment");
const prestamoClienteFullfilment = require("../fullfilments/prestamoClienteFullfilment");
const guiarUsuarioFullfilment = require("../fullfilments/guiarUsuarioFullfilment");

router.get("/", (req, res) => {
	res.json({
		"godialoginq-fullfilments": "v1.0.0"
	});    
});

router.post("/", express.json(), (req, res) => {
	
    const agent = new WebhookClient({ request: req, response: res });
	let intentMap = new Map();
	
    intentMap.set("Default Welcome Intent", welcome);
	intentMap.set("Default Fallback Intent", defaultFallback);

	//Fullfilments para guiar al usuario a elegir un préstamo
	intentMap.set("Guiar al usuario", guiarUsuarioFullfilment.guiarUsuario);
	intentMap.set("Guiar al usuario event", guiarUsuarioFullfilment.guiarUsuarioEvent);
	intentMap.set("Guiar al usuario - consultar prestamo", guiarUsuarioFullfilment.guiarUsuarioConsultarPrestamo);
	intentMap.set("Guiar al usuario - elegir prestamo", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo);
	intentMap.set("Guiar al usuario - elegir prestamo - si", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamoSi);
	//intentMap.set("Guiar al usuario - elegir prestamo - no", guiarUsuarioFullfilment.guiarUsuarioElegirPrestamo);
	
	//Fullfilments para extraer los datos básicos del cliente
	intentMap.set("Extraer nombre del cliente", clienteFullfilment.extraerNombreCliente);
	intentMap.set("Extraer telefono del cliente", clienteFullfilment.extraerTelefonoCliente);
	intentMap.set("Extraer correo del cliente", clienteFullfilment.extraerCorreoCliente);
	
	//Fullfilments para extraer el tipo de préstamo
	intentMap.set("Extraer el tipo de prestamo", tipoPrestamoFullfilment.extraerTipoPrestamo);
	intentMap.set("Extraer el tipo de prestamo - interesado - si", tipoPrestamoFullfilment.extraerTipoPrestamoInteresadoSi);
	
	//Fullfilments para extraer los datos de la tabla prestamo_cliente
	intentMap.set("Extraer monto necesitado", prestamoClienteFullfilment.extraerMontoNecesitado);
	intentMap.set("Extraer tiempo en el negocio", prestamoClienteFullfilment.extraerTiempoNegocio);
	intentMap.set("Extraer ingresos anuales", prestamoClienteFullfilment.extraerIngresosAnuales);
	intentMap.set("Extraer puntaje credito", prestamoClienteFullfilment.extraerPuntajeCredito);
	intentMap.set("Extraer que negocio tiene", prestamoClienteFullfilment.extraerQueNegocioTiene);
	intentMap.set("Extraer como va usar", prestamoClienteFullfilment.extraerComoVaUsar);
	intentMap.set("Extraer cuan rapido necesita", prestamoClienteFullfilment.extraerCuanRapidoNecesita);

	agent.handleRequest(intentMap);
});

function welcome(agent) {
	console.log("welcome");
    agent.add('Hola, Soy el mejor asistente de ventas, ¿En qué te puedo ayudar?');
}

function defaultFallback(agent) {
	console.log(agent.action);
	console.log(agent.conv());
    agent.add('Lo siento, no te entendí. ¿En qué te puedo ayudar?');
}

router.post("/suma", (req, res) => {
	if (req.body.queryResult.action == "suma") {
        let num1 = parseFloat(req.body.queryResult.parameters.number1);
        let num2 = parseFloat(req.body.queryResult.parameters.number2);
        let sum = num1 + num2;
		responseGuiarUsuario = num1 + " + " + num2 + " es " + sum;
		console.log("fulfillmentText:" + responseGuiarUsuario);
        res.json({
            "fulfillmentText": responseGuiarUsuario
        });
    }
});

module.exports = router;