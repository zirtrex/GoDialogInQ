'use strict';

var model = require('../models/prestamoClienteModel');

var prestamoClienteController = {};

prestamoClienteController.getAll = async function (req, res) {
  try {
    var prestamoCliente = await model.getAll();
    res.send({
        status:'success',
        message: "",
        result: prestamoCliente
      });
    } catch (error) {
      res.status(500).send({
        status:'error',
        message: "Ha ocurrido un error",
        result: error   
      });  
    }
}


prestamoClienteController.getAllClienteTipoPrestamo = async function (req, res) {
  try {
    var prestamoCliente = await model.getAllClienteTipoPrestamo();
    res.send(
      {
        status:'success',
        message: "",
        result: prestamoCliente
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


prestamoClienteController.getQuantityCalificacion = async function (req, res) {
  try {
    var prestamoCliente = await model.getQuantityCalificacion();
    res.send(
      {
        status:'success',
        message: "",
        result: prestamoCliente
      }
      
      );
    } catch (error) {

      console.log(error);
      res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
    }
}


prestamoClienteController.getCountCalificabyFecha = async function (req, res) {
  try {

    var prestamoCliente = await model.getCountCalificabyFecha();

  
   console.log(prestamoCliente);

  const arrayFecha = [];
  const arrayCalifica = [];
  const arrayNoCalifica = [];
  const arrayTotal = [];
		
  prestamoCliente.forEach(element => {

    const oKeys = Object.keys(element);

    oKeys.forEach(key => {
      if (key == "fecha") {
        arrayFecha.push(element.fecha);
      } 
      if (key == "califica") {
        arrayCalifica.push(element.califica);
      }
      if (key == "noCalifica") {
        arrayNoCalifica.push(element.noCalifica);
      }
      if (key == "total") {
        arrayTotal.push(element.total);
      } 
    });
    
  });

    console.log(arrayFecha);
    console.log(arrayCalifica);
    console.log(arrayNoCalifica);
    console.log(arrayTotal);
    

    res.send(
      {
        status:'success',
        message: "",
        result: {
          "fecha": arrayFecha,
          "califica":arrayCalifica,
          "noCalifica":arrayNoCalifica,
          "total":arrayTotal
        }
      }
      
      );
    } catch (error) {

      console.log(error);
      res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
    }
}



prestamoClienteController.getByIdPrestamoCliente = async function (req, res) {
  var idPrestamoCliente = req.params.idPrestamoCliente;
  try {
    var prestamoCliente = await model.getByIdPrestamoCliente(idPrestamoCliente);
    if (Object.entries(prestamoCliente).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: []
      }
      );
    }else
    {
    res.status(200).send(
      {
        status:'success',
        message: "",
        result: prestamoCliente
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



prestamoClienteController.getByIdSession = async function (req, res) {
  var idSession = req.params.idSession;
  try {
    var prestamoCliente = await model.getByIdSession(idSession);
    if (Object.entries(prestamoCliente).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result: []
      }
      );
    }else
    {
    res.status(200).send(
      {
        status:'success',
        message: "",
        result: prestamoCliente
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


prestamoClienteController.getAllByIdTipoPrestamo = async function (req, res) {
  var idTipoPrestamo = req.params.idTipoPrestamo;
  try {
    var prestamoCliente = await model.getAllByIdTipoPrestamo(idTipoPrestamo);
    if (Object.entries(prestamoCliente).length === 0) {
      res.status(404).send(
        {
          status:'failed',
          message: "No se pudo encontrar el recurso necesario",
          result:[]
        }
      );
    } else {
      res.status(200).send(
        {
          status:'success',
          message: "",
          result: prestamoCliente
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

prestamoClienteController.getAllByIdCliente = async function (req, res) {
    var idCliente = req.params.idCliente;
    try {
      var prestamoCliente = await model.getAllByIdCliente(idCliente);
      if (Object.entries(prestamoCliente).length === 0) {
        res.status(404).send(
          {
            status:'failed',
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
            result: prestamoCliente
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


prestamoClienteController.create = async function (req, res) {
  var prestamoCliente = req.body;
  try {
    var result = await model.create(prestamoCliente);
    if (result.affectedRows > 0) {
      res.status(200).send({
        status:'success',
        message: "Prestamo Cliente creado correctamente",
        result:result  
      });   
    } else {
        res.status(400).send({
        status:'failed',
        message: "La creación ha fallado",
        result: result
        
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



prestamoClienteController.updateIdSession = async function (req, res) {
  var idSession = req.params.idSession;
  var prestamoCliente = req.body;
  try {
    var result = await model.updateIdSession(idSession, prestamoCliente);
    if(result.affectedRows>0)
    {
      res.status(200).send({
      status:'success',
      message: "Prestamo cliente actualizado correctamente",
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
    res.status(500).send({
      status:'error',
      message: "Ha ocurrido un error",
      result: error     
    });  
  } 
}



module.exports = prestamoClienteController;
