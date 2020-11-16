'use strict';

var prestamoClienteUtil = {};

prestamoClienteUtil.getValidatePrestamoCliente = function (idSession, agent)
{
    let response="";

    const setPrestamoClienteContext = agent.context.get('setprestamocliente');

        if (typeof setPrestamoClienteContext !== 'undefined') 
        {
			const setClienteContext = agent.context.get('setcliente');

            if (typeof setClienteContext !== 'undefined') 
            {
				var telefono = setClienteContext.parameters['telefono'];
				var correo = setClienteContext.parameters['correo'];

                    if (telefono == "" || telefono == null) {
                        response = "Ingrese por favor su teléfono.";
                    } else if (correo == "" || correo == null) {
                        response = "Ingrese por favor su correo.";
                    } else {
                        var tiempoNegocio = setPrestamoClienteContext.parameters['tiempoNegocio'];
                        var ingresosAnuales = setPrestamoClienteContext.parameters['ingresosAnuales'];
                        var puntajeCredito = setPrestamoClienteContext.parameters['puntajeCredito'];
                        //tiempoNegocio > 1 && 
                        if (ingresosAnuales >= 5000 && puntajeCredito >= 500) {
                            response = "Califica para un préstamo, un agente se estará contactando contigo a la brevedad posible.";
                        } else {
                            response = "Lo sentimos no calificas para un préstamo, visita: https://inqmatic.com/?s=rehabilitacion";
                        }
                        //agent.clearOutgoingContexts();
                    }
            } else 
            {
				response = "Ingrese por favor su teléfono.";
			}
				
        } else 
        {
		    response = "";
        }
           
    return response;
}

module.exports = prestamoClienteUtil;
