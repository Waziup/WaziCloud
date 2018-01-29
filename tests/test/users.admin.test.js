let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let userCredentials = require('../config/sample-data').user.admin;
let userData = require('../config/sample-data.json').sampleUser;

let createdDomianId = "";
chai.use(chaiHttp);





describe('Users with admin Previledges', () => {
  before(function (done) {
    chai.request(baseUrl)
      .post('/auth/token')
      .send(userCredentials)
      .end(function (err, response) {
        token = response.text;
        done();
      });
  });
  describe('Get all users in a realm', () => {
    it('it should Get all users in a realm', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/users`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Create a new user in a realm', () => {
    it('it should Create a new user in a realm', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/users`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Search users with specific criteria', () => {
    it('it should Search users with specific criteria', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/users/search/`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get a Specific user', () => {
    it('it should Get a Specific user', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/users/${userData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('update user data', () => {
    it('it should update user data', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/users/${userData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          "firstName": "string",
          "lastName": "string",
          "id": "string"
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Remove a user', () => {
    it('it should Remove a user', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/users/${userData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
})