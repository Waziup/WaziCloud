let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let userCredentials = require('./sample-data').user.admin;
let notif = require('./sample-data').notification;
let sensor = require('./sample-data').sensor;
let utils = require('../utils');

let createdDomianId = "";
chai.use(chaiHttp);

var sampleNotification = "";

let getNotifs = () => chai.request(baseUrl).get(`/notifications`)
let createNotif = (notif) => chai.request(baseUrl).post(`/notifications`).send(notif)
let getNotif = (id) => chai.request(baseUrl).get(`/notifications/${id}`)
let deleteNotif = (id) => chai.request(baseUrl).delete(`/notifications/${id}`)
let createSensor = (s) => chai.request(baseUrl).post(`/sensors`).send(s)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/sensors/${id}`)

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
  describe('Get notifications', () => {
    it('it should GET all the notifications', async () => {
      await createNotif(notif).set(withAdmin)
      let res = await getNotifs()
      res.should.have.status(200);
      res.body.should.be.a('array');
    });
  });
  describe('Create notifications', () => {
    it('it should get a single notification', async () => {
      res = await createNotif(notif).set(withAdmin)
      let res2 = await getNotif(res.text)
      res2.should.have.status(200);
      res2.body.should.be.a('object');
      //all fields of original notif should be here
      res2.body.should.deep.include(notif);
    });
  });
  describe('Get one notification', () => {
    it('it should return not found for notification that doesnt exist', async () => {
      let res = await getNotif(123)
      res.should.have.status(400);
    });
  });
  describe('delete a notification', () => {
    it('it should delete a message to social networks', async () => {
      res = await createNotif(notif)
      let res2 = await deleteNotif(res.text)
      res2.should.have.status(200);
    })
    it('it should return not found for notif that doesnt exist', async () => {
      let res = await deleteNotif(123)
      res.should.have.status(404);
    })
  })
  describe('Trigger notifications', () => {
    it('Message should be sent upon notification creation', async () => {
      res = await createNotif(notif).set(withAdmin)
      let res2 = await getNotif(res.text)
      res2.should.have.status(200);
      res2.body.should.be.a('object');
      //all fields of original notif should be here
      res2.body.should.deep.include(notif);
    });
  });
})
