let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let userCredentials = require('../config/sample-data').user.admin;
let token = "";

chai.use(chaiHttp);

describe('Sensors with normal priviledges', () => {
  before(function (done) {
    chai.request(baseUrl)
      .post('/auth/token')
      .send(userCredentials)
      .end(function (err, response) {
        chai.expect(err, "Cannot retrieve credentials").to.be.null;
        token = response.text;
        chai.request(baseUrl)
          .delete(`/domains/${domain}/sensors/${sensor.id}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            done();
          })
      });
  });


  describe('Get Sensors', () => {
    it('sensors are returned as an array', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Create sensor', () => {
    it('sensor is created', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('sensor with the same id is rejected', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
    it('sensor with invalid data is rejected', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(invalidSensor)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('Get single sensor', () => {
    it('retrieved sensor has all the correct values', (done) => {

      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.deep.include(sensor);

          done();
        });
    });
    it('non existent id is rejected', (done) => {

      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/this-id-does-not-exist`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });

    });
  });

  describe('Insert owner', () => {
    it('owner field should NOT be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/owner`)
        .set('content-type', 'text/plain')
        .send("henok")
        .end((err, res) => {

        res.should.have.status(403);
        chai.request(baseUrl)
          .get(`/domains/${domain}/sensors/${sensor.id}`)
          .end((err, res) => {
            res.body.owner.should.not.eql("henok");
            done();
            });
        });

    });
  });
  describe('insert name', () => {
    it('it should update the name field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/name`)
        .set('content-type', 'text/plain')
        .send("SEN1")
        .end((err, res) => {
          res.should.have.status(403);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}`)
            .end((err, res) => {
              res.body.owner.should.not.eql("SEN1");
              done();
              });
        });
    });
  });
  describe('insert location', () => {
    it('location should NOT be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/location`)
        .send({
          "latitude": 5.36,
          "longitude": 4.0083
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('insert sensor kind', () => {
    it('sensor kind should NOT be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/sensor_kind`)
        .set('content-type', 'text/plain')
        .send("Soil moisture sensor")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('Remove sensor', () => {
    it('sensor should NOT be removed', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/sensors/${sensor.id}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

});
