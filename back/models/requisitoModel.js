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



Requisito.crear = async function (req, res) {
    try {
        var requisito = req.body;
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

        res.send({
            status:'success',
            result
        });

    } catch(err) {
        throw new Error(err);
    }
}


Requisito.actualizar = async function (req, res) {
    try {
        var idRequisito = req.params.idRequisito;
        var requisito = req.body;
        var query = `update requisito set 
                descripcionRequisito=:descripcionRequisito,
                idTipoPrestamo=:idTipoPrestamo,
            where idRequisito=:idRequisito`; 
        var result = await db_connect.query(query, {
            descripcionRequisito:requisito.descripcionRequisito,
            idTipoPrestamo:requisito.idTipoPrestamo,
            idRequisito:idRequisito
        });
        res.send({
            status:'success',
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}

Requisito.borrar = async function (req, res) {
    try {
        var idRequisito = req.params.idRequisito;
        var query = `delete from requisito where idRequisito=:idRequisito`; 
        var result = await db_connect.query(query, {
            idRequisito:idRequisito
        });
        res.send({
            status:'success',
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}




module.exports = Requisito;