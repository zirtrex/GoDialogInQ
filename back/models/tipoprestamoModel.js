'user strict';
var db_connect = require('./db');

var TipoPrestamo = {};


TipoPrestamo.ObtenerTodo = async function (req, res) {
    try {
       
        var query = 'select * from tipoprestamo'; 
        var prestamos = await db_connect.query(query);
        res.send(prestamos);
    } catch(err) {
        throw new Error(err);
    }
}

TipoPrestamo.obtenerIDPorNombre = async function (nombreTipoPrestamo) {
    try {
        var query = 'select idTipoPrestamo from tipoprestamo where nombreTipoPrestamo=:nombreTipoPrestamo';
        var tipoprestamos = await db_connect.query(query,{
            nombreTipoPrestamo:nombreTipoPrestamo
        });
        return tipoprestamos;
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = TipoPrestamo;