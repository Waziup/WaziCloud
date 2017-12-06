let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let userCredentials = require('../config/sample-data').user.admin;
let notification = require('../config/sample-data').notification;

let createdDomianId = "";
chai.use(chaiHttp);

// create a sensor delete it
before(function (done) {
  chai.request(baseUrl)
    .post('/auth/token')
    .send(userCredentials)
    .end(function (err, response) {
      token = response.text;
      done();
    });
});

describe('Domains', () => {
  describe('post a message to social networks', () => {
    it('it should post a message to social networks', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/notifications`)
        .send(notification)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  describe('Get all notifications', () => {
    it('it should GET all the messages posted on social networks', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get a one message', () => {
    it('it should get a single notificaion', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('it should return not found for notification that doesnt exist', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications/this-id-doesnt-exist${Date.now()}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  describe('delete a message to social networks', () => {
    it('it should delete a message to social networks', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/notifications/${domainData.id}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    })
    it('it should return not found for message that doesnt exist', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/notifications/this-id-doesnt-exist${Date.now()}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    })
  })
})
