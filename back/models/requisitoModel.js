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
        var query = 'select * from requisito where idRequisito=?';
        var result = await db_connect.query(query,[
            idRequisito
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

requisito.getAllByIdTipoPrestamo = async function (idTipoPrestamo) {
    try {
       
        var query = 'select * from vw_requisito_getAllByIdTipoPrestamo vr where vr.idTipoPrestamo=?';
        
        var result = await db_connect.query(query,[
            idTipoPrestamo
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

requisito.getAllTipoPrestamoByNombre = async function (nombreTipoPrestamo) {
    try {
   
        var query = 'select * from vw_requisito_getAllByIdTipoPrestamo vr where vr.nombreTipoPrestamo=?';
        
        var result = await db_connect.query(query,[
            nombreTipoPrestamo
        ]);
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
            ?,
            ?,
            1
        )`;
        var result = await db_connect.query(query, [
            requisito.descripcionRequisito,
            requisito.idTipoPrestamo
        ]);        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
}

requisito.update = async function (idRequisito, requisito) {
    try {        
        var query = `update requisito set 
        descripcionRequisito=?,
        idTipoPrestamo=?
    where idRequisito=?`; 
        var result = await db_connect.query(query, [
            requisito.descripcionRequisito,
            requisito.idTipoPrestamo,
            idRequisito
        ]);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

requisito.delete = async function (idRequisito) {
    try {        
        var query = `delete from requisito where idRequisito=?`; 
        var result = await db_connect.query(query, [
            idRequisito
        ]
        );
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = requisito;

