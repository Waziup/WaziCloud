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

describe('Sensors with admin previledges', () => {
  before(function (done) {
    chai.request(baseUrl)
      .post('/auth/token')
      .send(userCredentials)
      .end(function (err, response) {
        token = response.text;
        chai.request(baseUrl)
          .delete(`/domains/${domain}/sensors/${sensor.id}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, rss) => {
            done();
          })
      });
  });
  describe('Get Sensors', () => {
    it('sensors are returned as an array', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Create sensors', () => {
    it('sensor is created', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .set('authorization', `Bearer ${token}`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('sensor with the same id is rejected', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .set('Authorization', `Bearer ${token}`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
    it('sensor with invalid data is rejected', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidSensor)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('Get a Single Sensor', () => {
    it('retrieved sensor has all the correct values', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          //all fields of original sensor should be here
          res.body.should.deep.include(sensor);
          //read-only fields should be here
          res.body.should.have.property('date_created');
          res.body.should.have.property('date_modified');
          done();
        });
    });
    it('non existent id is rejected', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/this-id-does-not-exist`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });

    });
  });

  describe('Insert Owner', () => {
    it('owner field should be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/owner`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("henok")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('owner').eql('henok');
              done();
            })

        });

    });
  });
  describe('Insert Name', () => {
    it('name field should be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/name`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'text/plain')
        .send("SEN1")
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('name').eql('SEN1');
              done();
            })
        });
    });
  });
  describe('Insert Location', () => {
    it('Location field should be updated', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/location`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          "latitude": 5.36,
          "longitude": 4.0083
        })
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(baseUrl)
            .get(`/domains/${domain}/sensors/${sensor.id}`)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.location.should.have.property('latitude').eql(5.36);
              res.body.location.should.have.property('longitude').eql(4.0083);
              done();
            })

        });

    });
  });
  
  describe('Get Measurements', () => {
    it('measurements are returned as an array', (done) => {
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
        .set('authorization', `Bearer ${token}`)
        .send(sensor.measurements[0])
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get a measurement', () => {
    it('retrieved measurement has all the correct values', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${sensor.measurements[0].id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          //all fields of original sensor should be here
          res.body.should.deep.include(sensor.measurements[0]);
          done();
        });
    });
  });
  describe('Create measurement value', () => {
    it('measurement value is created', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors/${sensor.id}/measurements/${sensor.measurements[0].id}/values`)
        .set('authorization', `Bearer ${token}`)
        .send({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get measurement values', () => {
    it('retrieved measurement values are correct', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${sensor.measurements[0].id}/values`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //all fields should be here
          res.body[0].should.include({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
          res.body[0].should.have.property("date_received");
          done();
        });
    });
    it('measurement last value is correct', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${sensor.measurements[0].id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          //all fields should be here
          res.body.last_value.should.include({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
          res.body.last_value.should.have.property("date_received");
          done();
        });
    });
  });

  describe('Remove Sensor', () => {
    it('sensor should be removed', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/sensors/${sensor.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});
