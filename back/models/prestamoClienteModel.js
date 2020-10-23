'user strict';

var db_connect = require('./db');

var prestamocliente = {}; 

prestamocliente.getAll = async function () {
    try {       
        var query = 'select * from prestamo_cliente'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getByIdPrestamoCliente = async function (idPrestamoCliente) {
    try {
        var query = 'select * from prestamo_cliente where idPrestamoCliente=:idPrestamoCliente';
        var result = await db_connect.query(query,{
            idPrestamoCliente:idPrestamoCliente
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getAllByIdTipoPrestamo = async function (idTipoPrestamo) {
    try {
        var query = 'select * from prestamo_cliente where idTipoPrestamo=:idTipoPrestamo';
        var result = await db_connect.query(query,{
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getAllByIdCliente = async function (idCliente) {
    try {
        var query = 'select * from prestamo_cliente where idCliente=:idCliente';
        var result = await db_connect.query(query,{
            idCliente:idCliente
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}


prestamocliente.create = async function (prestamocliente) {
    try {        
        var query = `insert into prestamo_cliente (
           
            montoNecesitado,
            tiempoNegocio,
            ingresosAnuales,
            puntajeCredito,
            queNegocioTiene,
            comoVaUsar,
            cuanRapidoNecesita,
            estado,
            idTipoPrestamo,
            idCliente

        ) values (
            :montoNecesitado,
            :tiempoNegocio,
            :ingresosAnuales,
            :puntajeCredito,
            :queNegocioTiene,
            :comoVaUsar,
            :cuanRapidoNecesita,
            1,
            :idTipoPrestamo,
            :idCliente
        )`;
        var result = await db_connect.query(query, {
            montoNecesitado:prestamocliente.montoNecesitado,
            tiempoNegocio:prestamocliente.tiempoNegocio,
            ingresosAnuales:prestamocliente.ingresosAnuales,
            puntajeCredito:prestamocliente.puntajeCredito,
            queNegocioTiene:prestamocliente.queNegocioTiene,
            comoVaUsar:prestamocliente.comoVaUsar,
            cuanRapidoNecesita:prestamocliente.cuanRapidoNecesita,
            idTipoPrestamo:prestamocliente.idTipoPrestamo,
            idCliente:prestamocliente.idCliente
        });        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
}
/* 
prestamocliente.update = async function (idRequisito, requisito) {
    try {        
        var query = `update prestamo_cliente set 
        descripcionRequisito=:descripcionRequisito,
        idTipoPrestamo=:idTipoPrestamo
    where idRequisito=:idRequisito`; 
        var result = await db_connect.query(query, {
            descripcionRequisito:requisito.descripcionRequisito,
            idTipoPrestamo:requisito.idTipoPrestamo,
            idRequisito:idRequisito
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.delete = async function (idRequisito) {
    try {        
        var query = `delete from prestamo_cliente where idRequisito=:idRequisito`; 
        var result = await db_connect.query(query, {
            idRequisito:idRequisito
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
} */

module.exports = prestamocliente;

