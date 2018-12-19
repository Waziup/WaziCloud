let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let device = require('./sample-data').valid;
let userCredentials = require('./sample-data').user.admin;
let sensor = require('./sample-data').valid.sensors[0];
let utils = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let createDevice = (s) => chai.request(baseUrl).post(`/devices`).send(s)
let deleteDevice = (id) => chai.request(baseUrl).delete(`/devices/${id}`)
let getSensors = () => chai.request(baseUrl).get(`/devices/${device.id}/sensors`)
let createSensor = (m) => chai.request(baseUrl).post(`/devices/${device.id}/sensors`).send(m)
let getSensor = (id) => chai.request(baseUrl).get(`/devices/${device.id}/sensors/${id}`)
let putSensorAttr = (id, attr, val) => chai.request(baseUrl).put(`/devices/${device.id}/sensors/${id}/${attr}`).set('content-type', 'text/plain;charset=utf-8').send(val)
let getSensorValue = (id) => chai.request(baseUrl).get(`/devices/${device.id}/sensors/${id}/value`)
let pushSensorValue = (id, val) => chai.request(baseUrl).post(`/devices/${device.id}/sensors/${id}/value`).set('content-type', 'application/json').send(val)

describe('Sensor-data', () => {
  let withAdmin = null
  let withNormal = null
  //Retrieve the tokens and create a new device
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      await deleteDevice(device.id).set(withAdmin)
      await createDevice(device).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });

  //Clean after
  afterEach(async function () {
    try {
      await deleteDevice(device.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  describe('push sensor data', () => {
    it('data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"}).set(withAdmin)
      res.should.have.status(200);
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      chai.expect(res3.body[0]).to.deep.include({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
      res3.body[0].should.have.property('date_received');
    });
    it('number data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": 25.6}).set(withAdmin)
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": 25.6});
    });
    it('string data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": "A"}).set(withAdmin)
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": "A"});
    });
    it('boolean data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": true}).set(withAdmin)
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": true});
    });
    it('array data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": [true]}).set(withAdmin)
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": [true]});
    });
    it('object data is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, {"value": {a:1, b:"2"}}).set(withAdmin)
      let res3 = await getSensorValue(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": {a:1, b:"2"}});
    });
  });
})
