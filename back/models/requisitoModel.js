'user strict';
var db_connect = require('./db');

var requisito = {};


requisito.ObtenerPorId = async function (req, res) {
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

module.exports = requisito;