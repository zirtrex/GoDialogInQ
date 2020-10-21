const expect  = require('chai').expect;
const chai = require("chai");
const fetch   = require('node-fetch');
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

const server = 'http://localhost:8081';


//Obtiene
describe('API REST', function () {
  it('GET /tipo_prestamo ==> Devuelve todos los tipos de prestamo', async () => {
 
    const response = await fetch(server + '/tipo_prestamo');
    expect(response.status).to.be.equal(200);
    const tipoPrestamo = await response.json();
    expect(tipoPrestamo).to.be.an('Array');

    for (let tipPres of tipoPrestamo) {
      expect(tipPres).to.be.an('Object');
      //console.log(tipoPrestamo);
      expect(tipPres.idTipoPrestamo).to.be.a('Number');
      expect(tipPres.nombreTipoPrestamo).to.be.a('String');
      expect(tipPres.estado).to.be.a('String');
      //expect(tipPres.idTipoPrestamo).to.be.equal(2);
      
    }
  });


  /* 
  it("GET /tipo_prestamo ==> Devuelve todos los tipos de prestamo", (done) => {
    chai.request(server)
        .get("/tipo_prestamo")
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            //response.body.length.should.be.eq(3);
            console.log(err);
        done();
        });
    });
 */




 //Obtiene por id nombre de Prestamo
 it("Devuelve id de tipo de prestamo por nombre", (done) => {
  const getIdTipoPrestamoByNombre = "Prestamo Coronavirus";
  chai.request(server)                
      .get('/tipo_prestamo/'+getIdTipoPrestamoByNombre)
     
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          //response.body.should.be.a('object');

          console.log(err);
      done();
      });
}); 

  
//Inserta
 it("POST /tipo_prestamo ==> Graba Tipo de Prestamo", (done) => {
  chai.request(server)                
      .post('/tipo_prestamo')
      .send({
        "nombreTipoPrestamo": "Prestamo Gobierno desde Test Unit"
      })
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          console.log(err);
      done();
      });
});


//Actualiza
it("PUT /Modifica Tipo de Prestamo", (done) => {
 
  chai.request(server)                
      .put("/tipo_prestamo/1")
      .send({
        "nombreTipoPrestamo": "Modificacion de Requisito desde Test UNIT",
	      "idTipoPrestamo":"1"
      })
      .end((err, response) => {
          //expect(response.body.result.affectedRows).to.be.equal(1);
          //expect(response).to.have.status(200);
          response.should.have.status(200);
          response.body.should.be.a('object');
          //response.body.should.have.property('id').eq(1);
          //response.body.should.have.property('name').eq("Task 1 changed");
          //expect(res.body).to.have.property('days').to.be.equal(20);
          //console.log(response.body)
          //console.log(response.body.result.affectedRows)
          //expect(response).to.have.status(200);
          console.log(err);
          
      done();
      });
});


  
//Delete
  it("DELETE //tipo_prestamo ==> Elimina Tipo de Prestamo", (done) => {
      const idTipoPrestamo = 1;
      chai.request(server)                
          .delete("/tipo_prestamo/" + idTipoPrestamo)
          .end((err, response) => {
              response.should.have.status(401);
              response.body.should.be.a('object');

              console.log(err);
          done();
          });
  });




}); 


