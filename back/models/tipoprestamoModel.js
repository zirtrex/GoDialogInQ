'user strict';
var db_connect = require('./db');

var tipoprestamo = {};


tipoprestamo.ObtenerTodo = async function (req, res) {
    try {
       
        var query = 'select * from tipoprestamo'; 
        var prestamos = await db_connect.query(query);
        res.send(prestamos);


    } catch(err) {
        throw new Error(err);
    }
}

tipoprestamo.ObtenerPorId = async function (req, res) {
    try {
        var idTipoPrestamo = req.params.idTipoPrestamo;
        var query = 'select * from tipoprestamo where idTipoPrestamo=:idTipoPrestamo';
        var tipoprestamos = await db_connect.query(query,{
            idTipoPrestamo:idTipoPrestamo
        });
        res.send(tipoprestamos);
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = tipoprestamo;