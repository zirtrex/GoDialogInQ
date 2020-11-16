'user strict';

const messagesUtil = require("../utils/messagesUtil");
const prestamoClienteUtil = require("../utils/prestamoClienteUtil");

var tipoPrestamoUtil = {};

tipoPrestamoUtil.getValidateTipoPrestamo = function (idSession, agent)
{
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



tipoPrestamoUtil.saveAndVerifyTipoPrestamo = function (idSession, agent)
{

    let response = false;

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
            response = true;
        }

    } catch (error) {
        response = false;
        console.log(error);
        logger.debug(error);        
       
    } 
           
    return response;
}

module.exports = tipoPrestamoUtil;