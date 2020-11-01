'use strict';

var model = require('../models/requisitoModel');

var requisitoController = {};

requisitoController.getAll = async function (req, res) {
  try {
  var requisito = await model.getAll();

    res.status(200).send(
      {
        status:'success',
        message: "",
        result: requisito
      }
      );

    } catch (error) {
      res.status(500).send({
        status:'error',
        message: "Ha ocurrido un error",
        result: error      
      });  
    }  

}

requisitoController.getByIdRequisito = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  try {
    var requisito = await model.getByIdRequisito(idRequisito);

      if (Object.entries(requisito).length === 0) {
        res.status(404).send(
          {
            status:'error',
            message: "No se pudo encontrar el recurso necesario",
            result:[]
          }
        );
      }else
      {
       
        res.status(200).send(
          {
            status:'success',
            message: "",
            result: requisito
          }
          );
      }
    
    
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
    } 
}

requisitoController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  
  try {
    var requisito = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
    if (Object.entries(requisito).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: []
        }
      );
    } else {
      res.status(200).send({
          status:'success',
          message: "",
          result: requisito
      });
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error fatal",
      result: error
    });  
  }
}


requisitoController.getAllTipoPrestamoByNombre = async function (req, res) {
  var nombreTipoPrestamo = req.params.nombreTipoPrestamo;
  
  try {
    var requisito = await model.getAllTipoPrestamoByNombre(nombreTipoPrestamo);
    if (Object.entries(requisito).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: []
        }
      );
    } else {
      res.status(200).send({
          status:'success',
          message: "",
          result: requisito
      });
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error fatal",
      result: error
    });  
  }
}



requisitoController.create = async function (req, res) {
  var requisito = req.body;
  try {
    var result = await model.create(requisito);
    if(result.affectedRows>0)
    {
    res.status(201).send({
      status:'success',
      message: "Requisito creado correctamente",
      result:result
     
    });
    }else
    {
      res.status(400).send({
        status:'failed',
        message: "La creación ha fallado",
        result:[]
        
      });
      
    }   

  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error   
    });  
  }  
}

requisitoController.update = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  var requisito = req.body;
  try {
    var result = await model.update(idRequisito, requisito);
    if(result.affectedRows>0)
    {
    res.status(200).send({
      status:'success',
      message: "Requisito actualizado correctamente",
      result: result
    });
    }else
    {
        res.status(404).send({
        status:'failed',
        message: "La modificación ha fallado",
        result: []
      });
    }
  } catch (error) {
    res.send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error    
    });  
  } 
}

requisitoController.delete = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  try {
    var result = await model.delete(idRequisito);
    if(result.affectedRows>0)
    {
    res.status(200).send({
      status:'success',
      message: "Requisito eliminado correctamente",
      result: result
    });
    }else
    {
      res.status(404).send({
        status:'failed',
        message: "No se pudo eliminar ningun registro",
        result:[]
      });
    }
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error
    });  
  } 
}

module.exports = requisitoController;
