'user strict';

var db_connect = require('./db');

var requisito = {}; 

requisito.getAll = async function () {
    try {       
        var query = 'select * from requisito';
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

requisito.getByIdRequisito = async function (idRequisito) {
    try {
        var query = 'select * from requisito where idRequisito=:idRequisito';
        var result = await db_connect.query(query,{
            idRequisito:idRequisito
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

requisito.getAllByIdTipoPrestamo = async function (idTipoPrestamo) {
    try {
        var query = 'select * from requisito where idTipoPrestamo=:idTipoPrestamo';
        var result = await db_connect.query(query,{
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}



requisito.create = async function (requisito) {
    try {        
        var query = `insert into requisito (
            descripcionRequisito,
            idTipoPrestamo,
            estado      
        ) values (
            :descripcionRequisito,
            :idTipoPrestamo,
            1
        )`;
        var result = await db_connect.query(query, {
            descripcionRequisito:requisito.descripcionRequisito,
            idTipoPrestamo:requisito.idTipoPrestamo
        });        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
}

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
}

module.exports = requisito;

