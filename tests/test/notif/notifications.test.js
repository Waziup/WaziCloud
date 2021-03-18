let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let notif = require('./sample-data').notif_social;
let notif_actuation = require('./sample-data').notif_actuation;
let device = require('../devices/sample-data').valid;
const { getAdminAuth, getNormalAuth, sleep,
  createDevice, pushSensorValue, deleteDevice, getActuator, getDevice, getSensor
} = require('../utils');


chai.use(chaiHttp);

let getNotifs = () => chai.request(baseUrl).get(`/notifications`)
let createNotif = (notif) => chai.request(baseUrl).post(`/notifications`).set('content-type', 'application/json;charset=utf-8').send(notif)
let getNotif = (id) => chai.request(baseUrl).get(`/notifications/${id}`)
let putNotifStatus = (id, st) => chai.request(baseUrl).put(`/notifications/${id}/status`).set('content-type', 'text/plain;charset=utf-8').send("inactive")
let deleteNotif = (id) => chai.request(baseUrl).delete(`/notifications/${id}`)

describe('Notifications', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await getAdminAuth();
      withNormal = await getNormalAuth();
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
      await deleteNotif(res.text)
    });
  });
  describe('Create notifications', () => {
    it('notification is created', async () => {
      res = await createNotif(notif).set(withAdmin)
      res.should.have.status(200);
      res.text.should.be.a('string');
      await deleteNotif(res.text)
    });
  });
  describe('Get one notification', () => {
    it('social notification has all correct values', async () => {
      let res = await createNotif(notif).set(withAdmin)
      let res2 = await getNotif(res.text)
      res2.should.have.status(200);
      //all fields of original notif should be here
      res2.body.should.deep.include(notif);
      res2.body.should.have.property('status').eql("active");
      await deleteNotif(res.text)
    });
    it('actuation notification has all correct values', async () => {
      let res = await createNotif(notif_actuation).set(withAdmin)
      let res2 = await getNotif(res.text)
      res2.should.have.status(200);
      //all fields of original notif should be here
      res2.body.should.deep.include(notif_actuation);
      res2.body.should.have.property('status').eql("active");
      await deleteNotif(res.text)
    });
    it('it should return not found for notification that doesnt exist', async () => {
      let res = await getNotif(123)
      res.should.have.status(400);
    });
  });
  describe('delete a notification', () => {
    it('it should delete a notification', async () => {
      res = await createNotif(notif)
      let res2 = await deleteNotif(res.text)
      res2.should.have.status(204);
      let res3 = await deleteNotif(res.text)
      res3.should.have.status(404);
    })
    it('it should return not found for notif that doesnt exist', async () => {
      let res = await deleteNotif(123)
      res.should.have.status(404);
    })
  })
  describe('Trigger notifications', () => {
    before(async function () {
      await deleteDevice(device.id).set(withAdmin)
      await createDevice(device).set(withAdmin)
    });

    after(async function () {
      //await deleteDevice(device.id).set(withAdmin)
    });

    it('Social message should be sent upon notification creation', async () => {
      let res = await createNotif(notif).set(withAdmin)
      await pushSensorValue("TC1", { "value": 50 }).set(withAdmin)
      await pushSensorValue("TC1", { "value": 51 }).set(withAdmin)
      sleep(1000)
      let res2 = await getNotif(res.text)
      //fields showing that the notification has been sent
      res2.body.should.have.property('last_notif');
      res2.body.should.have.property('times_sent').eql(2);
      await deleteNotif(res.text)
    });

    it('Simple actuation notification', async () => {
      let res_notif = await createNotif({...notif_actuation, action: {type: "ActuationAction", value: {device_id: device.id, actuator_id: "Act1", actuator_value: "MyVal1"}}}).set(withAdmin)
      await pushSensorValue("TC1", { "value": 101 }).set(withAdmin)
      sleep(1000)
      let res = await getActuator(device.id, "Act1").set(withAdmin);
      res.body.should.have.property('value').eql("MyVal1");
      await deleteNotif(res_notif.text)
    });

    it('Templated actuation notification', async () => {
      //Create an notification that copies the sensor value into an actuator
      let res_notif = await createNotif({...notif_actuation, action: {type: "ActuationAction", value: {device_id: device.id, actuator_id: "Act1", actuator_value: "${TC1}"}}}).set(withAdmin)
      //Push a value to the sensor
      await pushSensorValue("TC1", {"value": 100}).set(withAdmin)
      await sleep(1000)
      //It should now be copied to the actuator
      let res_act = await getActuator(device.id, "Act1").set(withAdmin);
      res_notif2 = await getNotif(res_notif.text)
      res_act.body.should.have.property('value').eql('100');
      res_notif2.body.should.have.property('last_success_code').eql(204);
      await deleteNotif(res_notif.text)
    });
    
    it('Templated actuation notification with no expression', async () => {
      //Create an notification that copies the sensor value into an actuator
      let res_notif = await createNotif({...notif_actuation, 
                                            condition: {"sensors": ["TC1"], 
                                                        "devices": ["MyDevice"],
                                                        "expression": ""},
                                            action: {type: "ActuationAction", 
                                                     value: {device_id: device.id, 
                                                             actuator_id: "Act1", 
                                                             actuator_value: "${TC1}"}}}).set(withAdmin)
      //Push a value to the sensor
      await pushSensorValue("TC1", {"value": 100}).set(withAdmin)
      await sleep(1000)
      //It should now be copied to the actuator
      let res_act = await getActuator(device.id, "Act1").set(withAdmin);
      res_notif2 = await getNotif(res_notif.text)
      res_act.body.should.have.property('value').eql('100');
      res_notif2.body.should.have.property('last_success_code').eql(204);
      await deleteNotif(res_notif.text)
    });

    it('inactive notification should do nothing', async () => {
      let res = await createNotif(notif).set(withAdmin)
      await putNotifStatus(res.text, "inactive")
      await pushSensorValue("TC1", { "value": 10 }).set(withAdmin)
      let res2 = await getNotif(res.text)
      //all fields of original notif should be here
      res2.body.should.have.property('status').eql("inactive");
      res2.body.should.have.property('times_sent').eql(1);
      await deleteNotif(res.text)
    });
  });
})
