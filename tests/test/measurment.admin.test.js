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
    it('it should GET all the measurements for a given sensor', (done) => {
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
  describe('POST Measurements', () => {
    it('it should add a measurement value for a given sensor', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors/${sensor.id}/measurements`)
        .set('Authorization', `Bearer ${token}`)
        .send(measurement)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('array');
          //console.log(res);
          done();
        });
    });
  });
  describe('Get a single Measurement', () => {
    it('it should GET all the measurements for a given sensor', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('array');
          //console.log(res);
          done();
        });
    });
  });

  describe('Update Name of a Measurement', () => {
    it('it should update the name of the measurement field', (done) => {
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
  describe('Update Dimention of a Measurement', () => {
    it('it should update the dimention of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              //res.body.should.be.a('object');
              //res.body.should.have.property('dimension').eql('degree');
              done();
            })

        });

    });
  });

  describe('Update dimention', () => {
    it('it should update the dimention of the measurement field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("degree")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
            .end((err, res) => {
              //res.body.should.be.a('object');
              //res.body.should.have.property('dimension').eql('degree');
              done();
            })

        });

    });
  });
  describe('Update unit', () => {
    it('it should update the dimention of the measurement field', (done) => {
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
              //res.body.should.be.a('object');
              //res.body.should.have.property('dimension').eql('degree');
              done();
            })

        });

    });
  });
  describe('get measurement values', () => {
    it('it should GET get measurement values', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/values`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('array');
          //console.log(res);
          done();
        });
    });
  });
  describe('get paginated measurement values', () => {
    it('it should GET get measurement values', (done) => {
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
