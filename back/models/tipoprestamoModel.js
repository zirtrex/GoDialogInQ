'user strict';
var db_connect = require('./db');

var TipoPrestamo = {};


TipoPrestamo.ObtenerTodo = async function (req, res) {
    try {
       
        var query = 'select * from tipo_prestamo'; 
        var prestamos = await db_connect.query(query);
        res.send(prestamos);
    } catch(err) {
        throw new Error(err);
    }
}

TipoPrestamo.obtenerIDPorNombre = async function (nombreTipoPrestamo) {
    try {
        var query = 'select idTipoPrestamo from tipo_prestamo where nombreTipoPrestamo=:nombreTipoPrestamo';
        var tipoprestamos = await db_connect.query(query,{
            nombreTipoPrestamo:nombreTipoPrestamo
        });
        return tipoprestamos;
    } catch(err) {
        throw new Error(err);
    }
}


TipoPrestamo.crear = async function (req, res) {
    try {
        var prestamo = req.body;
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

        res.send({
            status:'success',
            result
        });

    } catch(err) {
        throw new Error(err);
    }
}

TipoPrestamo.actualizar = async function (req, res) {
    try {
        var idTipoPrestamo = req.params.idTipoPrestamo;
        var tipoprestamo = req.body;
        var query = `update tipo_prestamo set 
        nombreTipoPrestamo=:nombreTipoPrestamo
            where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            nombreTipoPrestamo:tipoprestamo.nombreTipoPrestamo,
            idTipoPrestamo:idTipoPrestamo
        });
        res.send({
            status:'success',
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}


TipoPrestamo.borrar = async function (req, res) {
    try {
        var idTipoPrestamo = req.params.idTipoPrestamo;
        var query = `delete from tipo_prestamo where idTipoPrestamo=:idTipoPrestamo`; 
        var result = await db_connect.query(query, {
            idTipoPrestamo:idTipoPrestamo
        });
        res.send({
            status:'success',
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}




module.exports = TipoPrestamo;