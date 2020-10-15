'user strict';
var db_connect = require('./db');

var Cliente = {};

Cliente.getAll = async function (req, res) {
    try {       
        var query = 'select * from cliente'; 
        var clientes = await db_connect.query(query);
        res.send(clientes);
    } catch(err) {
        throw new Error(err);
    }
}


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
            Apellidos:cliente.apellidos,
            Nombres:cliente.nombres,
            TipoDocumento:cliente.tipoDocumento,
            Documento:cliente.documento,
            FechaNacimiento:cliente.fechaNacimiento,
            Sexo:cliente.sexo,
            Telefono:cliente.telefono,
            Correo:cliente.correo,
            Movil:cliente.movil,
            Direccion:cliente.direccion,
            RazonSocial:cliente.razonSocial
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