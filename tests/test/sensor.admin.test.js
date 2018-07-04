let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let utils = require('./utils');
let token = utils.getToken();

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getSensors = () => chai.request(baseUrl).get(`/domains/${domain}/sensors`).set('authorization', `Bearer ${token}`)
let createSensor = (s) => chai.request(baseUrl).post(`/domains/${domain}/sensors`).set('authorization', `Bearer ${token}`).send(s)
let getSensor = (id) => chai.request(baseUrl).get(`/domains/${domain}/sensors/${id}`).set('Authorization', `Bearer ${token}`)
let setSensorAttr = (id, attr, value) => chai.request(baseUrl).put(`/domains/${domain}/sensors/${id}/${attr}`).set('Authorization', `Bearer ${token}`).set('content-type', 'text/plain').send(value)
let setSensorLocation = (id, value) => chai.request(baseUrl).put(`/domains/${domain}/sensors/${id}/location`).set('Authorization', `Bearer ${token}`).set('content-type', 'application/json').send(value)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/domains/${domain}/sensors/${id}`).set('Authorization', `Bearer ${token}`)

describe('Sensors with admin previledges', () => {
  before(async function () {
    try {
      await deleteSensor(id)
    } catch (err) {
      console.log('error:' + err)
    }
  });

  describe('Get Sensors', () => {
    it('sensors are returned as an array', async () => {
      let res = await getSensors()
      res.should.have.status(200);
      res.body.should.be.a('array');
    });
  });
  describe('Create sensor', () => {
    it('sensor is created', async () => {
      let res = await createSensor(sensor)
      res.should.have.status(200);
    });
    it('sensor with the same id is rejected', async () => {
      let res = await createSensor(sensor)
      res.should.have.status(422);
    });
    it('sensor with invalid data is rejected', async () => {
      let res = await createSensor(invalidSensor)
      res.should.have.status(400);
    });
  });

  describe('Get a Single Sensor', () => {
    it('retrieved sensor has all the correct values', async () => {
      let res = await getSensor(sensor.id)
      res.should.have.status(200);
      res.body.should.be.a('object');
      //all fields of original sensor should be here
      res.body.should.deep.include(sensor);
      //read-only fields should be here
      res.body.should.have.property('date_created');
      res.body.should.have.property('date_modified');
    });
    it('non existent id is rejected', async () => {
      let res = await getSensor('this-id-does-not-exist')
      res.should.have.status(404);
    });
  });

  describe('Insert Owner', () => {
    it('owner field should be updated', async () => {
      let res = await setSensorAttr(sensor.id, "owner", "henok")
      res.should.have.status(200);
      let res2 = await getSensor(sensor.id)
      res2.body.should.have.property('owner').eql('henok');
    });
  });
  describe('Insert Name', () => {
    it('name field should be updated', async () => {
      let res = await setSensorAttr(sensor.id, "name", "SEN1")
      res.should.have.status(200);
      let res2 = await getSensor(sensor.id)
      res2.body.should.have.property('name').eql('SEN1');
    });
  });
  describe('Insert Location', () => {
    it('Location field should be updated', async () => {
      let res = await setSensorLocation(sensor.id, "location", {"latitude": 5.36, "longitude": 4.0083})
      res.should.have.status(200);
      let res2 = await getSensor(sensor.id)
      //res2.body.should.have.property('location').eql({"latitude": 5.36, "longitude": 4.0083});
    });
  });

  describe('Remove Sensor', () => {
    it('sensor should be removed', async () => {
      let res = await deleteSensor(sensor.id)
      res.should.have.status(200);
    });
  });

});
