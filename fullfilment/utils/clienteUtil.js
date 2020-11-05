
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


clienteUtil.getValidatePhoneNumber = function (correo)
{
    var resul="";
     if (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(correo)) {
        return resul = "success";
    } else {
        return resul = "error";
    }
   
}


module.exports = clienteUtil;
