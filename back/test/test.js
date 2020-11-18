const expect  = require('chai').expect;
const chai = require("chai");
const fetch   = require('node-fetch');
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

const urlBase = 'http://localhost:8081';
var  idTipoPrestamo;
var  idRequisito; 

//************Prueba unitaria API REST Tipo de Prestamo************
describe('Prueba Unitaria Tipo de Prestamo', function () {
  it('GET /tipo_prestamo ==> Devuelve todos los tipos de prestamo', async () => {
    const response = await fetch(urlBase + '/tipo_prestamo');
    expect(response.status).to.be.equal(200);
    const tipoPrestamo = await response.json();
    expect(tipoPrestamo.result).to.be.an('Array');
    const resultado = tipoPrestamo.result;
    for (let tipPres of resultado) {
      expect(tipPres.idTipoPrestamo).to.be.a('Number');
      expect(tipPres.nombreTipoPrestamo).to.be.a('String');
      expect(tipPres.estado).to.be.a('String');
    } 

  });

  it("Devuelve id de tipo de prestamo por nombre", (done) => {
    var getIdTipoPrestamoByNombre = "7A";
  
    chai.request(urlBase)
    .get('/tipo_prestamo/nombre/'+ getIdTipoPrestamoByNombre)
    .end((err, response) => {      
      response.should.have.status(200);
      response.body.should.be.a('object');
      done();           
    });  
  }); 



  it("POST /tipo_prestamo ==> Graba Tipo de Prestamo", (done) => {
  chai.request(urlBase)                
      .post('/tipo_prestamo')
      .send({
        "nombreTipoPrestamo": "graba desde test"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');

        idTipoPrestamo = response.body.result.insertId
        done();
      });
  });


  it("PUT /Modifica Tipo de Prestamo", (done) => {
    chai.request(urlBase)                
        .put("/tipo_prestamo/"+idTipoPrestamo)
        .send({
          "nombreTipoPrestamo": "Modificacion de Requisito desde Test Unitaria",
          "idTipoPrestamo":idTipoPrestamo
        })
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');

          done();
        });
  });
  

  it("DELETE /tipo_prestamo ==> Elimina Tipo de Prestamo", (done) => {
      chai.request(urlBase)                
          .delete("/tipo_prestamo/" + idTipoPrestamo)
          .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
     
          done();
          });
  });
 

}); 


//************ Prueba unitaria API REST Requisito ***********
describe('Prueba Unitaria Requisitos', function () {
  it("GET /requisito ==> Devuelve todos los requisitos", (done) => {
    chai.request(urlBase)
        .get("/requisito")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('Object');
        done();
        });
    });

 
 it("POST /tipo_prestamo ==> Graba Requisito", (done) => {
  chai.request(urlBase)                
      .post('/requisito')
      .send({
        "descripcionRequisito": "Declaración de impuestos personales del o los dueños",
        "idTipoPrestamo":"2"
      })
      .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          idRequisito = response.body.result.insertId
      done();
      });
});


it("Devuelve requisito por id de Prestamo", (done) => {
  chai.request(urlBase)
    .get('/requisito/'+ idRequisito)
    .end((err, response) => {      
      response.should.have.status(200);
      //response.body.should.be.a('Object');
      done();           
    });  
  }); 


/* it("Devuelve requisito por id de tipo de prestamo", (done) => {
  chai.request(urlBase)
    .get('/requisito/tipo_prestamo/'+ 2)
    .end((err, response) => {      
      response.should.have.status(200);
      done();           
    });  
  });  */


it("PUT /Modifica Requisito", (done) => {
 chai.request(urlBase)                
      .put("/requisito/"+idRequisito)
      .send({
        "nombreTipoPrestamo": "Modificacion de Requisito desde Test Unitaria",
	      "idTipoPrestamo":idRequisito
      })
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
      done();
      });
});


  it("DELETE /requisito ==> Elimina Tipo de Prestamo", (done) => {
      chai.request(urlBase)                
          .delete("/requisito/" + idRequisito)
          .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
          done();
          });
  }); 
  

}); 




