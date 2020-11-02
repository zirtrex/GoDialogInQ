'user strict';
var db_connect = require('./db');

var tipoPrestamo = {}; 

tipoPrestamo.getAll = async function () {
    try {       
        var query = 'select * from tipo_prestamo'; 
        var result = await db_connect.query(query);
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

tipoPrestamo.getIdTipoPrestamoByNombre = async function (nombreTipoPrestamo) {
    try {
        var query = 'select idTipoPrestamo from tipo_prestamo where nombreTipoPrestamo=:nombreTipoPrestamo';
        var result = await db_connect.query(query,{
            nombreTipoPrestamo:nombreTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

tipoPrestamo.getAllPrestamoByNombre = async function (nombreTipoPrestamo) {
    try {
        var query = 'select * from tipo_prestamo where nombreTipoPrestamo=:nombreTipoPrestamo';
        var result = await db_connect.query(query,{
            nombreTipoPrestamo:nombreTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

tipoPrestamo.create = async function (tipoPrestamo) {
    try {        
        var query = `insert into tipo_prestamo (
            nombreTipoPrestamo,
            descripcionTipoPrestamo,
            estado      
        ) values (
            :nombreTipoPrestamo,
            :descripcionTipoPrestamo,
            1
        )`;
        var result = await db_connect.query(query, {
            nombreTipoPrestamo:tipoPrestamo.nombreTipoPrestamo,
            descripcionTipoPrestamo:tipoPrestamo.descripcionTipoPrestamo
        });        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
}

tipoPrestamo.update = async function (idTipoPrestamo, tipoprestamo) {
    try {        
        var query = `update tipo_prestamo set 
            nombreTipoPrestamo=:nombreTipoPrestamo,
            descripcionTipoPrestamo=:descripcionTipoPrestamo
            where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            nombreTipoPrestamo:tipoprestamo.nombreTipoPrestamo,
            descripcionTipoPrestamo:tipoprestamo.descripcionTipoPrestamo,
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

tipoPrestamo.delete = async function (idTipoPrestamo) {
    try {        
        var query = `delete from tipo_prestamo where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            idTipoPrestamo:idTipoPrestamo
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = tipoPrestamo;