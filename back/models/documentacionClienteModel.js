'user strict';

var db_connect = require('./db');

var documentacioncliente = {}; 

documentacioncliente.getAll = async function () {
    try {       
        var query = 'select * from documentacion_cliente'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

documentacioncliente.getByIdDocumentacionCliente = async function (idDocumentacionCliente) {
    try {
        var query = 'select * from documentacion_cliente where idDocumentacionCliente=:idDocumentacionCliente';
        var result = await db_connect.query(query,{
            idDocumentacionCliente:idDocumentacionCliente
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

documentacioncliente.getAllByIdPrestamoCliente = async function (idPrestamoCliente) {
    try {
        var query = 'select * from documentacion_cliente where idPrestamoCliente=:idPrestamoCliente';
        var result = await db_connect.query(query,{
            idPrestamoCliente:idPrestamoCliente
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}



documentacioncliente.create = async function (documentacioncliente) {
    try {        
        var query = `insert into documentacion_cliente (
          
            nombreDocumentacion,
            valor,
            estado,
            idPrestamoCliente

        ) values (
            :nombreDocumentacion,
            :valor,
            1,
            :idPrestamoCliente
        )`;
        var result = await db_connect.query(query, {
            nombreDocumentacion:documentacioncliente.nombreDocumentacion,
            valor:documentacioncliente.valor,
            idPrestamoCliente:documentacioncliente.idPrestamoCliente
        });        
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

module.exports = documentacioncliente;
