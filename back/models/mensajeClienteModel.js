'user strict';

var db_connect = require('./db');

var mensajecliente = {}; 

mensajecliente.getAll = async function () {
    try {       
        var query = 'select * from mensaje_cliente'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}
/*
documentacioncliente.getByIdDocumentacionCliente = async function (idDocumentacionCliente) {
    try {
        var query = 'select * from documentacion_cliente where idDocumentacionCliente=?';
        var result = await db_connect.query(query,[
            idDocumentacionCliente
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

documentacioncliente.getAllByIdPrestamoCliente = async function (idPrestamoCliente) {
    try {
        var query = 'select * from documentacion_cliente where idPrestamoCliente=?';
        var result = await db_connect.query(query,[
            idPrestamoCliente
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}
*/


mensajecliente.create = async function (mensajecliente) {
    try {        
        var query = `insert into mensaje_cliente (
            mensaje,
            fecha,
            estado,
            idPrestamoCliente
            ) values (
            ?,
            now(),
            1,
            ?
        )`;
        var result = await db_connect.query(query, [
            mensajecliente.mensaje,
            mensajecliente.idPrestamoCliente
        ]);        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
}
/* 
requisito.update = async function (idRequisito, requisito) {
    try {        
        var query = `update requisito set 
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

requisito.delete = async function (idRequisito) {
    try {        
        var query = `delete from requisito where idRequisito=:idRequisito`; 
        var result = await db_connect.query(query, {
            idRequisito:idRequisito
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
} */

module.exports = mensajecliente;

