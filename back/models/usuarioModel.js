'user strict';

var db_connect = require('./db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


var usuario = {}; 

usuario.getByCorreo = async function (usuario) {
    try {

        var usuarioReq = usuario.correo;
        var claveReq = usuario.clave;

        var query = 'select nombres, correo from usuario where estado<>0 and correo=? and clave=?';
        var result = await db_connect.query(query,[
            usuarioReq,
            claveReq
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


