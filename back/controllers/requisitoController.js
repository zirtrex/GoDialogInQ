'use strict';

var model = require('../models/requisitoModel');

var requisitoController = {};

requisitoController.getAll = async function (req, res) {
  try {
  var requisito = await model.getAll();

    res.status(200).send(requisito);

    } catch (error) {
      res.status(500).send({
        status:'error',
        message: "Ha ocurrido un error",
        error: error.message      
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
          }
        );
      }else
      {
        res.status(200).send(requisito);
      }
    
    
  } catch (error) {
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      error: error.message      
    });  
    } 
}

requisitoController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  /* 
  if(idTipoPrestamo.length === 0)
  {
    res.status(404).send(
      {
        status:'error',
        message: "nulo"
      }
    );
  }else
  {
    res.status(404).send(
      {
        status:'error',
        message: "ok"
      }
    );

  }
 */
  try {
    var requisito = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
    if (Object.entries(requisito).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: null
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
      result: error.message
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
      result,
      message: "Requisito creado correctamente"
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

requisitoController.update = async function (req, res) {
  var idRequisito = req.params.idRequisito;
  var requisito = req.body;
  try {
    var result = await model.update(idRequisito, requisito);
    if(result.affectedRows>0)
    {
    res.send({
      status:'success',
      message: "Requisito actualizado correctamente",
      result: result
    });
    }else
    {
        res.status(404).send({
        status:'failed',
        message: "La modificación ha fallado",
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

module.exports = requisitoController;
