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

prestamocliente.getAllClienteTipoPrestamo = async function () {
    try {       
        var query = 'select * from vw_prestamo_cliente_getAllClienteTipoPrestamo'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getQuantityCalificacion = async function () {
    try {       
        var query = 'SELECT SUM((CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 1 ELSE 0 END)) AS califica, SUM((CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 0 ELSE 1 END)) AS nocalifica FROM prestamo_cliente PC WHERE PC.estado<>0'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getCountCalificabyFecha = async function () {
    try {       
        var query = 'SELECT * from vw_getCountCalificabyFecha'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}



prestamocliente.getByIdPrestamoCliente = async function (idPrestamoCliente) {
    try {
        var query = 'select * from prestamo_cliente where idPrestamoCliente=?';
        var result = await db_connect.query(query,[
            idPrestamoCliente
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}


prestamocliente.getByIdSession = async function (idSession) {
    try {
        var query = 'select * from prestamo_cliente where idSession=?';
        var result = await db_connect.query(query,[
            idSession
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getAllByIdTipoPrestamo = async function (idTipoPrestamo) {
    try {
        var query = 'select * from prestamo_cliente where idTipoPrestamo=?';
        var result = await db_connect.query(query,[
            idTipoPrestamo
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

prestamocliente.getAllByIdCliente = async function (idCliente) {
    try {
        //var query = 'select * from prestamo_cliente where idCliente=?';
        var query = 'select * from vw_prestamo_cliente_getAllClienteTipoPrestamo where idCliente=?';
        var result = await db_connect.query(query,[
            idCliente
        ]);
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
            idCliente,
            idSession
        ) values (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            1,
            ?,
            ?,
            ?
        )`;
        var result = await db_connect.query(query, [
            prestamocliente.montoNecesitado,
            prestamocliente.tiempoNegocio,
            prestamocliente.ingresosAnuales,
            prestamocliente.puntajeCredito,
            prestamocliente.queNegocioTiene,
            prestamocliente.comoVaUsar,
            prestamocliente.cuanRapidoNecesita,
            prestamocliente.idTipoPrestamo,
            prestamocliente.idCliente,
            prestamocliente.idSession
        ]);        
        return result;        

    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

prestamocliente.updateIdSession = async function (idSession, prestamocliente) {
    try {        
        var query = `update prestamo_cliente set 
            montoNecesitado=?,
            tiempoNegocio=?,
            ingresosAnuales=?,
            puntajeCredito=?,
            queNegocioTiene=?,
            comoVaUsar=?,
            cuanRapidoNecesita=?
            where idSession=?`; 
        var result = await db_connect.query(query, [
            prestamocliente.montoNecesitado,
            prestamocliente.tiempoNegocio,
            prestamocliente.ingresosAnuales,
            prestamocliente.puntajeCredito,
            prestamocliente.queNegocioTiene,
            prestamocliente.comoVaUsar,
            prestamocliente.cuanRapidoNecesita,
            idSession
        ]);
        return result;
    } catch(error) {
        console.log(error);
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

