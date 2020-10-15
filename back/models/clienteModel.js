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


Cliente.getByDocument = async function (documento) {
    try {
        var query = 'select * from cliente where documento=:documento';
        var cliente = await db_connect.query(query, {
            documento:documento
        });
        res.send(cliente);
    } catch(err) {
        throw new Error(err);
    }
}

Cliente.create = async function (req, res) {
    try {
        var cliente = req.body;
        var query = `insert into cliente (
            apellidos,
            nombres,
            tipoDocumento,
            documento,
            fechaNacimiento,
            sexo,
            telefono,
            correo,
            movil,
            direccion,
            razonSocial           
        ) values (
            :apellidos,
            :nombres,
            :tipoDocumento,
            :documento,
            :fechaNacimiento,
            :sexo,
            :telefono,
            :correo,
            :movil,
            :direccion,
            :razonSocial
        )`; 
        var result = await db_connect.query(query, {
            apellidos: cliente.apellidos,
            nombres: cliente.nombres,
            tipoDocumento: cliente.tipoDocumento,
            documento: cliente.documento,
            fechaNacimiento: cliente.fechaNacimiento,
            sexo: cliente.sexo,
            telefono: cliente.telefono,
            correo: cliente.correo,
            movil: cliente.movil,
            direccion: cliente.direccion,
            razonSocial: cliente.razonSocial
        });

        res.send({
            status:'success',
            message: "Cliente creado correctamente",
            result
        });

    } catch(err) {
        throw new Error(err);
    }
}

Cliente.update = async function (req, res) {
    try {
        var idClienteIn = req.params.idCliente;
        var cliente = req.body;

        var query = `update cliente set 
            apellidos=:apellidos,
            nombres=:nombres
            where idCliente=:idCliente`;
        var result = await db_connect.query(query, {
            apellidos: cliente.apellidos,
            nombres: cliente.nombres,
            idCliente: idClienteIn
        });
        res.send({
            status:'success',
            message: "Cliente actualizado correctamente",
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}


Cliente.delete = async function (req, res) {
    try {
        var idClienteIn = req.params.idCliente;
        var query = `delete from cliente where idCliente=:idCliente`; 
        var result = await db_connect.query(query, {
            idCliente:idClienteIn
        });
        res.send({
            status:'success',
            message: "Cliente eliminado correctamente",
            result:result
        });
    } catch(err) {
        throw new Error(err);
    }
}


module.exports = Cliente;