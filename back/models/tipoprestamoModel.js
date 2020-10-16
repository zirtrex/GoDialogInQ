'user strict';
var db_connect = require('./db');

var tipoPrestamo = {}; 

tipoPrestamo.getAll = async function () {
    try {       
        var query = 'select * from tipo_prestamo'; 
        var result = await db_connect.query(query);
        return result;
    } catch(err) {
        throw new Error(err);
    }
}

tipoPrestamo.getIdTipoPrestamoByNombre = async function (nombreTipoPrestamo) {
    try {
        var query = 'select idTipoPrestamo from tipo_prestamo where nombreTipoPrestamo=:nombreTipoPrestamo';
        var result = await db_connect.query(query,{
            nombreTipoPrestamo:nombreTipoPrestamo
        });
        return result;
    } catch(err) {
        throw new Error(err);
    }
}

tipoPrestamo.create = async function (tipoPrestamo) {
    try {        
        var query = `insert into tipo_prestamo (
            nombreTipoPrestamo,
            estado      
        ) values (
            :nombreTipoPrestamo,
            1
        )`;
        var result = await db_connect.query(query, {
            nombreTipoPrestamo:prestamo.nombreTipoPrestamo
        });        
        return result;        

    } catch(err) {
        throw new Error(err);        
    }
}

tipoPrestamo.update = async function (idTipoPrestamo, tipoprestamo) {
    try {        
        var query = `update tipo_prestamo set 
            nombreTipoPrestamo=:nombreTipoPrestamo
            where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            nombreTipoPrestamo:tipoprestamo.nombreTipoPrestamo,
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(err) {
        throw new Error(err);
    }
}

tipoPrestamo.delete = async function (idTipoPrestamo) {
    try {        
        var query = `delete from tipo_prestamo where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = tipoPrestamo;