let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let domain = require('../../config/env').domain;
let userCredentials = require('./sample-data').user.admin;
let notification = require('./sample-data').notification;
let sensor = require('./sample-data').sensor;

let createdDomianId = "";
chai.use(chaiHttp);

let domain = 'waziup'
var sampleNotification = "";

let getNotifs = () => chai.request(baseUrl).get(`/domains/${domain}/notifications`)
let postNotif = (notif) => chai.request(baseUrl).post(`/domains/${domain}/notifications`).send(notif)
let getNotif = (id) => chai.request(baseUrl).get(`/domains/${domain}/notifications/${id}`)
let deleteNotif = (id) => chai.request(baseUrl).delete(`/domains/${domain}/notifications/${id}`)
let createSensor = (s) => chai.request(baseUrl).post(`/domains/${domain}/sensors`).send(s)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/domains/${domain}/sensors/${id}`)

describe('Notifications', () => {
  let withAdmin = null
  let withNormal = null
  
  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      let res = await createSensor(sensor).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  after(async function () {
    try {
      await deleteSensor(sensor.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
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
