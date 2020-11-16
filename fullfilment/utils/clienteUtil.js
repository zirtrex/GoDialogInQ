
'user strict';

var clienteUtil = {};

//console.log(`valid: ${correo.valid}, test: ${regex.test(correo.correo)}`);

clienteUtil.getValidateEmail = function (correo)
{
    var resul="";
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo))
    {
        return resul = "success";
    }else
    {
        return resul = "error";
    }
    
}


clienteUtil.getValidatePhoneNumber = function (telefono)
{
    var resul="";
     //if (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(correo)) {
    ///^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    ///^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    if (/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/.test(telefono)) {
        return resul = "success";
        } else {
        return resul = "error";
    }
   
}

clienteUtil.getValidatePhoneNumber = function (telefono)
{
    var resul="";
     //if (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(correo)) {
    ///^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    ///^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    if (/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/.test(telefono)) {
        return resul = "success";
        } else {
        return resul = "error";
    }
   
}



clienteUtil.getValidateNombres = function (idSession, agent)
{
    let response="";

    const setNombreClienteContext = agent.context.get('setnombrecliente');
        
    if (typeof setNombreClienteContext !== "undefined") {
        nombres = setNombreClienteContext.parameters['given-name.original'];
        apellidos = setNombreClienteContext.parameters['last-name.original'];
        
        if (nombres == "") {
            response = "";
        } else {
            response = nombres + " " + apellidos;
          
        }
    } else {				
        response = "";
    }
           
    return response;
}



module.exports = clienteUtil;
