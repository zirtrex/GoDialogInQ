'user strict';
var db_connect = require('./db');

var Cliente = {};


Cliente.obtenerPorDocumento = async function (Documento) {
    try {
        var query = 'select * from cliente where Documento=:Documento';
        var cliente = await db_connect.query(query, {
            Documento:Documento
        });
        return cliente;
    } catch(err) {
        throw new Error(err);
    }
}

Cliente.crear = async function (req, res) {
    try {
        var cliente = req.body;
        var query = `insert into cliente (
            Apellidos,
            Nombres,
            TipoDocumento,
            Documento,
            FechaNacimiento,
            Sexo,
            Telefono,
            Correo,
            Movil,
            Direccion,
            RazonSocial           
        ) values (
            :Apellidos,
            :Nombres,
            :TipoDocumento,
            :Documento,
            :FechaNacimiento,
            :Sexo,
            :Telefono,
            :Correo,
            :Movil,
            :Direccion,
            :RazonSocial
        )`; 
        var result = await db_connect.query(query, {
            Apellidos:cliente.Apellidos,
            Nombres:cliente.Nombres,
            TipoDocumento:cliente.TipoDocumento,
            Documento:cliente.Documento,
            FechaNacimiento:cliente.FechaNacimiento,
            Sexo:cliente.Sexo,
            Telefono:cliente.Telefono,
            Correo:cliente.Correo,
            Movil:cliente.Movil,
            Direccion:cliente.Direccion,
            RazonSocial:cliente.RazonSocial
        });

        res.send({
            status:'success',
            result
        });

    } catch(err) {
        throw new Error(err);
    }
}


module.exports = Cliente;