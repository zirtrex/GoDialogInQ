'user strict';
var db_connect = require('./db');

var Requisito = {};


Requisito.ObtenerPorId = async function (req, res) {
    try {
        var idRequisito = req.params.idRequisito;
        var query = 'select * from requisito where idRequisito=:idRequisito';
        var requisitos = await db_connect.query(query,{
            idRequisito:idRequisito
        });
        res.send(requisitos);
    } catch(err) {
        throw new Error(err);
    }
}

Requisito.obtenerRequisitosPorIdTipoPrestamo = async function (idTipoPrestamo) {
    try {
        var query = 'select DescripcionRequisito from requisito where idTipoPrestamo=:idTipoPrestamo';
        var requisitos = await db_connect.query(query,{
            idTipoPrestamo:idTipoPrestamo
        });
        return requisitos;
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = Requisito;