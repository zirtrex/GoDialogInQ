'use strict';

var model = require('../models/tipoPrestamoModel');

var tipoPrestamoController = {};

tipoPrestamoController.getAll = async function (req, res) {

  try {
      var tiposPrestamo = await model.getAll();
      res.send(tiposPrestamo);
    } catch (error) {
      res.status(500).send({
        status:'error',
        message: "Ha ocurrido un error",
        error: error.message      
      });  
    }  
}

tipoPrestamoController.getIdTipoPrestamoByNombre = async function (req, res) {
  
  var nombreTipoPrestamo = req.params.nombreTipoPrestamo;
  try {

  var idTipoPrestamo = await model.getIdTipoPrestamoByNombre(nombreTipoPrestamo);
  res.send(idTipoPrestamo);

  } catch (error) {
  res.status(500).send({
    status:'error',
    message: "Ha ocurrido un error",
    error: error.message      
  });  
}  

}

tipoPrestamoController.create = async function (req, res) {
  var tipoPrestamo = req.body;
  try {
    var result = await model.create(tipoPrestamo);

    if(result.affectedRows>0)
    {
      res.status(201).send({
        status:'success',
        result,
        message: "Tipo de préstamo creado correctamente"
      });

    }else
    {
      res.status(400).send({
        status:'failed',
        result,
        message: "La creación ha fallado"
      });
       
    }



  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
  }  
}


tipoPrestamoController.update = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  var tipoPrestamo = req.body;
  try {
    var result = await model.update(idTipoPrestamo, tipoPrestamo);

    if(result.affectedRows>0)
    {
      res.status(200).send({
        status:'success',
        message: "Tipo de préstamo actualizado correctamente",
        result: result
      });
    }else
    {

        res.status(404).send({
        status:'failed',
        message: "Tipo de préstamo actualizado correctamente",
        result: result
      });
    }
    


  } catch (error) {
    res.send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message          
    });  
  } 
}



tipoPrestamoController.delete = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  try {

    var result = await model.delete(idTipoPrestamo);

    if(result.affectedRows>0)
    {
      res.status(200).send({
        status:'success',
        message: "Tipo de préstamo eliminado correctamente",
        result: result
      });
    }else
    {
      res.status(404).send({
        status:'failed',
        message: "No se pudo eliminar ningun registro",
       });
    }


  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error      
    });  
  } 
}




module.exports = tipoPrestamoController;