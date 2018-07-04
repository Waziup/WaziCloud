let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let userCredentials = require('../config/sample-data').user.admin;
let measurement = require('../config/sample-data').measurement;

chai.use(chaiHttp);

describe('Measurements', () => {

  before(function (done) {
    chai.request(baseUrl)
      .post('/auth/token')
      .send(userCredentials)
      .end(function (err, response) {
        token = response.text;
        chai.request(baseUrl)
          .post(`/domains/${domain}/sensors`)
          .set('authorization', `Bearer ${token}`)
          .send(sensor)
          .end((err, res) => {
            done();
          });
      });
  });

  after(function (done) {
    chai.request(baseUrl)
      .delete(`/domains/${domain}/sensors/${sensor.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(sensor)
      .end((err, res) => {
        done();
      });
  });

  describe('Get Measurements', () => {
    it('it should GET all the measurements for a given sensor', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('POST Measurements', () => {
    it('it should add a measurement value for a given sensor', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors/${sensor.id}/measurements`)
        .send(measurement)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get a single Measurement', () => {
    it('it should GET a single the measurements for a given sensor', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Update Name of a Measurement', () => {
    it('it should update the name of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/name`)
        .set('content-type', 'text/plain')
        .send("ss1")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  })
  describe('Update Dimention of a Measurement', () => {
    it('it should update the dimention of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('Update dimention', () => {
    it('it should update the dimention of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  describe('Update unit', () => {
    it('it should update the dimention of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/unit`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('get paginated measurement values', () => {
    it('it should GET get measurement values', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/values?vLimit=10&vOffset=0&vDateFrom=2016-01-01T00:00:00.000Z&vDateTo=2016-01-31T23:59:59.999Z`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.below(11);
          //console.log(res);
          done();
        });
    });
  });
})