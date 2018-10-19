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
let getSensor = (id) => chai.request(baseUrl).get(`/sensors/${id}`)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/sensors/${id}`)
let pushMeasValue = (id, val) => chai.request(baseUrl).post(`/sensors/${sensor.id}/measurements/${id}/values`).set('content-type', 'application/json').send(val)

describe('Notifications', () => {
  let withAdmin = null
  let withNormal = null
  
  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      //let res = await createSensor(sensor).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  after(async function () {
    try {
      //await deleteSensor(sensor.id).set(withAdmin)
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
    it('notification is created', async () => {
      res = await createNotif(notif).set(withAdmin)
      res.should.have.status(200);
      res.text.should.be.a('string');
    });
  });
  describe('Get one notification', () => {
    it('retrieved notification has all correct values', async () => {
      let res = await createNotif(notif).set(withAdmin)
      let res2 = await getNotif(res.text)
      res2.should.have.status(200);
      //all fields of original notif should be here
      res2.body.should.deep.include(notif);
      res2.body.should.have.property('status');
    });
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
      await createSensor(sensor).set(withAdmin)
      res = await createNotif(notif).set(withAdmin)
      await pushMeasValue("TC1", {"value": "10"}).set(withAdmin) 
      await pushMeasValue("TC1", {"value": 20}).set(withAdmin) 
      let res2 = await getNotif(res.text)
      console.log(JSON.stringify(res2))
      res2.should.have.status(200);
      res2.body.should.be.a('object');
      //all fields of original notif should be here
      res2.body.should.deep.include(notif);
      res2.body.should.have.property('last_notification');
      res2.body.should.have.property('times_sent').eql(1);
      res2.body.should.have.property('status').eql("active");
      await deleteSensor(sensor.id).set(withAdmin)
    });
  });
})
