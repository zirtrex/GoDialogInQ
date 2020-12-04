'use strict';

var db_connect = require('./db');

const bcrypt = require('bcryptjs');

var usuario = {}; 

usuario.getByCorreo = async function (usuario) {
    try {
        var query = 'select nombres, correo, clave from usuario where estado<>0 and correo=?';
        var result = await db_connect.query(query,[
            usuario.correo
        ]);
        return result;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}


usuario.create = async function (usuario) {
    try {        
        var query = `insert into usuario (
            nombres,
            correo,
            clave,
            estado     
        ) values (
            ?,
            ?,
            ?,
            1
        )`;
        var result = await db_connect.query(query, [
            usuario.nombres,
            usuario.correo,
            bcrypt.hashSync(usuario.clave)
        ]);        
        return result;        

    } catch(error) {
        throw new Error(error);
    }
} 


module.exports = usuario;


