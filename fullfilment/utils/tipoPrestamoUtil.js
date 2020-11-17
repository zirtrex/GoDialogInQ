'use strict';

const tipoPrestamoService = require("../services/tipoPrestamoService");
const requisitoService = require("../services/requisitoService");
const clienteService = require("../services/clienteService");
const prestamoClienteService = require("../services/prestamoClienteService");

const messagesUtil = require("../utils/messagesUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");


var tipoPrestamoUtil = {};

tipoPrestamoUtil.verifyTipoPrestamo = function (idSession, agent) {

    let response="";

    var setTipoPrestamoContext = agent.context.get('settipoprestamo');

    if (typeof setTipoPrestamoContext !== 'undefined') {

        var idTipoPrestamo = setTipoPrestamoContext.parameters['idTipoPrestamo'];
        var nombreTipoPrestamo = setTipoPrestamoContext.parameters['tipoPrestamo'];
        var nombreTipoPrestamoOriginal = setTipoPrestamoContext.parameters['tipoPrestamo.original'];        
                                
        if (idTipoPrestamo != "" || idTipoPrestamo != null) {

            if (nombreTipoPrestamo == nombreTipoPrestamoOriginal) {
                response = "Has elegido: " + nombreTipoPrestamo;
                
            } else {
                response =  "El préstamo más cercano es: " + nombreTipoPrestamo;
            }
          
        } else {
            response ="";
        }
    } else {				
        response = "";
    }
           
    return response;
}



tipoPrestamoUtil.saveAndVerifyTipoPrestamo = async function (idSession, agent)
{

    let responseBool = false;

    const setTipoPrestamoContext = agent.context.get('settipoprestamo');

    var idTipoPrestamo;
    var nombreTipoPrestamo = setTipoPrestamoContext.parameters['tipoPrestamo'];    
    var nombreTipoPrestamOriginal = setTipoPrestamoContext.parameters['tipoPrestamo.original'];
    
    try {

        var response = await tipoPrestamoService.getByNombre(nombreTipoPrestamo);

        if (response.status == "success") {

            idTipoPrestamo = response.result[0].idTipoPrestamo;
        
            agent.context.set({
                'name': 'settipoprestamo',
                'lifespan': 50,
                'parameters' : {
                    'idTipoPrestamo': idTipoPrestamo,
                    'tipoPrestamo': nombreTipoPrestamo,
                    'tipoPrestamo.original': nombreTipoPrestamOriginal
                }
            });

            responseBool = true;
        }else
        {
            responseBool = false;
        }

    } catch (error) {
        responseBool = false;
        console.log(error);
        logger.debug(error);        
       
    } 
           
    return responseBool;
}

module.exports = tipoPrestamoUtil;