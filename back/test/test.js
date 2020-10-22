const expect  = require('chai').expect;
const chai = require("chai");
const fetch   = require('node-fetch');
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

const urlBase = 'http://localhost:8081';


//************Prueba unitaria API REST Tipo de Prestamo************
describe('Prueba Funcional Tipo de Prestamo', function () {
  it('GET /tipo_prestamo ==> Devuelve todos los tipos de prestamo', async () => {
    const response = await fetch(urlBase + '/tipo_prestamo');
    expect(response.status).to.be.equal(200);
    const tipoPrestamo = await response.json();
    expect(tipoPrestamo).to.be.an('Array');
    for (let tipPres of tipoPrestamo) {
      expect(tipPres).to.be.an('Object');
      expect(tipPres.idTipoPrestamo).to.be.a('Number');
      expect(tipPres.nombreTipoPrestamo).to.be.a('String');
      expect(tipPres.estado).to.be.a('String');
    }
  });

  it("Devuelve id de tipo de prestamo por nombre", (done) => {
  const getIdTipoPrestamoByNombre = "coronavirus";
  
  chai.request(urlBase)
    .get('/tipo_prestamo/'+ getIdTipoPrestamoByNombre)
    .end((err, response) => {      
      //expect(response).to.have.status(200);
      //expect(response).to.be.an('Array');
      response.should.have.status(200);
      response.body.should.be.a('array');
      //console.log(err);
      done();           
    });  
  }); 

  it("POST /tipo_prestamo ==> Graba Tipo de Prestamo", (done) => {
  chai.request(urlBase)                
      .post('/tipo_prestamo')
      .send({
        "nombreTipoPrestamo": "Prestamo Gobierno desde Test Unit"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        //console.log(err);
        done();
      });
  });


  it("PUT /Modifica Tipo de Prestamo", (done) => {
    chai.request(urlBase)                
        .put("/tipo_prestamo/52")
        .send({
          "nombreTipoPrestamo": "Modificacion de Requisito desde Test UNIT",
          "idTipoPrestamo":"52"
        })
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            //console.log(err);
        done();
        });
  });


  it("DELETE /tipo_prestamo ==> Elimina Tipo de Prestamo", (done) => {
      const idTipoPrestamo = 39;
      chai.request(urlBase)                
          .delete("/tipo_prestamo/" + idTipoPrestamo)
          .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              //console.log(err);
          done();
          });
  });
}); 





//************ Prueba unitaria API REST Requisito ***********
describe('Prueba Funcional Requisitos', function () {

  it("GET /requisito ==> Devuelve todos los requisitos", (done) => {
    chai.request(urlBase)
        .get("/requisito")
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            //console.log(err);
        done();
        });
    });


 it("Devuelve requisito por id de Prestamo", (done) => {
  const idRequisito = 9;
  chai.request(urlBase)                
      .get('/requisito/'+idRequisito)
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          //console.log(err);
      done();
      });
}); 

it("Devuelve requisito por id de tipo de prestamo", (done) => {
  const idTipoPrestamo = 2;
  chai.request(urlBase)                
      .get('/requisito/tipo_prestamo/'+idTipoPrestamo)
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          //console.log(err);
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
          //console.log(err);
      done();
      });
});


it("PUT /Modifica Requisito", (done) => {
 chai.request(urlBase)                
      .put("/requisito/9")
      .send({
        "nombreTipoPrestamo": "Modificacion de Requisito desde Test UNIT",
	      "idTipoPrestamo":"9"
      })
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          //console.log(err);
          
      done();
      });
});


  it("DELETE /requisito ==> Elimina Tipo de Prestamo", (done) => {
      const idTipoPrestamo = 10;
      chai.request(urlBase)                
          .delete("/requisito/" + idTipoPrestamo)
          .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              //console.log(err);
          done();
          });
  });
  

}); 




