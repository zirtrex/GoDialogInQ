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

documentacioncliente.getAllByIdPrestamosCliente = async function (idPrestamosCliente) {
    try {
        var query = 'select * from documentacion_cliente where idPrestamosCliente=:idPrestamosCliente';
        var result = await db_connect.query(query,{
            idPrestamosCliente:idPrestamosCliente
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}



documentacioncliente.create = async function (requisito) {
    try {        
        var query = `insert into documentacion_cliente (
          
            nombreDocumentacion,
            valor,
            estado,
            idPrestamosCliente

        ) values (
            :nombreDocumentacion,
            :valor,
            1,
            :idPrestamosCliente
        )`;
        var result = await db_connect.query(query, {
            nombreDocumentacion:documentacioncliente.nombreDocumentacion,
            valor:documentacioncliente.valor,
            idPrestamosCliente:documentacioncliente.idPrestamosCliente
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

