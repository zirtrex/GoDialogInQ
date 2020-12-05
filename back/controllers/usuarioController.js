'use strict';

var model = require('../models/usuarioModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

var usuarioController = {};

usuarioController.getByCorreo = async function (req, res) {
  var usuarioReq = req.body;
  console.log(usuarioReq);
  try {
    var request = await model.getByCorreo(usuarioReq);
    var usuario = await request[0];

    if (typeof usuario === 'undefined') {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: []
        }
      );
    } else {

      const resultPassword = bcrypt.compareSync(usuarioReq.clave, usuario.clave);

      if (resultPassword) {
      
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ correo: usuario.correo }, SECRET_KEY, { expiresIn: expiresIn });

        const usuarioSend = {
            nombres: usuario.nombres,
            correo: usuario.correo.toLowerCase(),
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        res.status(200).send({
          status:'success',
          message: "Ingreso satisfactorio",
          result: usuarioSend
          
        });
      } else {
        res.status(409).send(
          {
            status:'failed',
            message: "Algo salió mal",
            result: []
          }
        );        
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error      
    });  
  }
}


usuarioController.create = async function (req, res) {
  var usuario = req.body;
  try {
    var result = await model.create(usuario);

    if(result.affectedRows>0) {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ correo: usuario.correo }, SECRET_KEY, { expiresIn: expiresIn });

      const usuarioSend = {
          nombres: usuario.nombres,
          correo: usuario.correo.toLowerCase(),
          accessToken: accessToken,
          expiresIn: expiresIn
      }

      res.status(201).send({
        status:'success',
        message: "Usuario creado correctamente",
        result: usuarioSend      
      });
    } else {
        res.status(400).send({
        status:'failed',
        message: "La creación ha fallado",
        result:[]
        
      });
      
    }   
  } catch (error) {
    console.log(error);
    res.status(500).send({     
      status:'error',
      message: "Ha ocurrido un error",
      result: error            
    });  
  }  
} 

module.exports = usuarioController;