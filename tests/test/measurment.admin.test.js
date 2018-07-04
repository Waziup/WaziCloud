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

describe('Measurements with admin previledges', () => {
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
    it('measurements are returned in an array', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Create measurement', () => {
    it('measurement is created', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors/${sensor.id}/measurements`)
        .set('Authorization', `Bearer ${token}`)
        .send(measurement)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get a single Measurement', () => {
    it('retrieved measurement values are correct', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          //all fields of original sensor should be here
          res.body.should.deep.include(measurement);
          done();
        });
    });
  });

  describe('Update Name of a Measurement', () => {
    it('name of measurement is updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/name`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("ss1")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('name').eql('ss1');
              done();
            })
        });
    });
  });
  describe('Update quantity kind of a Measurement', () => {
    it('quantity kind is updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/quantity_kind`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("Temperature")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('quantity_kind').eql('Temperature');
              done();
            })
        });
    });
  });

  describe('Update sensing device', () => {
    it('sensing device is updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/sensing_device`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("Thermometer")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('sensing_device').eql('Thermometer');
              done();
            })
        });
    });
  });
  describe('Update unit', () => {
    it('unit should be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/unit`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('unit').eql('degree');
              done();
            })
        });
    });
  });
  describe('get measurement values', () => {
    it('values are returned in an array', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/values`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //console.log(res);
          done();
        });
    });
  });
  describe('get paginated measurement values', () => {
    it('only a few values are returned', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/values?vLimit=10&vOffset=0&vDateFrom=2016-01-01T00:00:00.000Z&vDateTo=2016-01-31T23:59:59.999Z`)
        .set('Authorization', `Bearer ${token}`)
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
