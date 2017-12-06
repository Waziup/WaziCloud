let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let domainData = require('../config/sample-data').domains;
let userCredentials = require('../config/sample-data').user.admin;
let measurement = require('../config/sample-data').measurement;

let createdDomianId = "";
chai.use(chaiHttp);

// create a sensor delete it
before(function (done) {
  chai.request(baseUrl)
    .post('/auth/token')
    .send(userCredentials)
    .end(function (err, response) {
      token = response.text;
      chai.request(baseUrl)
        .delete(`/domains/${domainData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          chai.request(baseUrl)
            .post(`/domains`)
            .set('Authorization', `Bearer ${token}`)
            .send({"id" : "testfarm1"})
            .end((error, response) => {
              console.log(response.body);
              done();
            });
        });
    });
});

describe('Domains ', () => {
  describe('create a domain', () => {
    it('it should Create a domain', (done) => {
      chai.request(baseUrl)
        .post(`/domains`)
        .send(domainData)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  describe('Get all Domains', () => {
    it('it should GET all the domains', (done) => {
      chai.request(baseUrl)
        .get(`/domains`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get a single domain', () => {
    it('it should get a single domain', (done) => {
      chai.request(baseUrl)
        .get(`/domains/testfarm1`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should return not found for domain that doesnt exist', (done) => {
      chai.request(baseUrl)
        .get(`/domains/this-id-doesnt-exist${Date.now()}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('Remove Domain', () => {
    it('it should remove a single domain', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domainData.id}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  })
})
