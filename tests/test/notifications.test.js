let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let userCredentials = require('../config/sample-data').user.admin;
let notification = require('../config/sample-data').notification;

let createdDomianId = "";
chai.use(chaiHttp);


var sampleNotification = "";
// create a sensor delete it
before(function (done) {
  chai.request(baseUrl)
    .post('/auth/token')
    .send(userCredentials)
    .end(function (err, response) {
      token = response.text;
    });
  //create sample notification
  chai.request(baseUrl)
    .post(`/domains/${domain}/notifications`)
    .send(notification)
    .end((err, res) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          sampleNotification = res.body[0];
          done();
        });
    });
});

describe('Notifications', () => {
  describe('post a message to social networks', () => {
    it('it should post a message to social networks', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/notifications`)
        .set('Authorization', `Bearer ${token}`)
        .send(notification)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get all notifications', () => {
    it('it should GET all the messages posted on social networks', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get a one message', () => {
    it('it should get a single notificaion', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications/${sampleNotification.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should return not found for notification that doesnt exist', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/notifications/this-id-doesnt-exist${Date.now()}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('delete a message to social networks', () => {
    it('it should delete a message to social networks', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/notifications/${sampleNotification.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    })
    it('it should return not found for message that doesnt exist', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/notifications/this-id-doesnt-exist${Date.now()}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })
  })
})