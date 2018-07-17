let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/env').apiUrl;
let domain = require('../config/env').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let userCredentials = require('../config/sample-data').user.admin;
let measurement = require('../config/sample-data').valid.measurements[0];
let utils = require('./utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let createSensor = (s) => chai.request(baseUrl).post(`/domains/${domain}/sensors`).send(s)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/domains/${domain}/sensors/${id}`)
let getMeass = () => chai.request(baseUrl).get(`/domains/${domain}/sensors/${sensor.id}/measurements`)
let createMeas = (m) => chai.request(baseUrl).post(`/domains/${domain}/sensors/${sensor.id}/measurements`).send(m)
let getMeas = (id) => chai.request(baseUrl).get(`/domains/${domain}/sensors/${sensor.id}/measurements/${id}`)
let putMeasAttr = (id, attr, val) => chai.request(baseUrl).put(`/domains/${domain}/sensors/${sensor.id}/measurements/${id}/${attr}`).set('content-type', 'text/plain').send(val)
let getMeasValues = (id) => chai.request(baseUrl).get(`/domains/${domain}/sensors/${sensor.id}/measurements/${id}/values`)
let pushMeasValue = (id, val) => chai.request(baseUrl).post(`/domains/${domain}/sensors/${sensor.id}/measurements/${id}/values`).set('content-type', 'application/json').send(val)

describe('Measurements', () => {
  let withAdmin = null
  let withNormal = null
  //Retrieve the tokens and create a new sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      await deleteSensor(sensor.id).set(withAdmin)
      await createSensor(sensor).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });

  //Clean after
  afterEach(async function () {
    try {
      await deleteSensor(sensor.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  describe('Get Measurements', () => {
    it('measurements are returned in an array', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getMeass().set(withAdmin)
      res.should.have.status(200);
      res.body.should.be.a('array');
    });
  });
  describe('Create measurement', () => {
    it('admin can create a measurement', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await createMeas(measurement).set(withAdmin)
      res.should.have.status(200);
    });
    it('normal user can create a measurement on his own sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await createMeas(measurement).set(withNormal)
      res.should.have.status(200);
    });
    it('normal user CANNOT create a measurement on a sensor owned by other', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await createMeas(measurement).set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Get a single Measurement', async () => {
    it('retrieved measurement values are correct', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getMeas(measurement.id).set(withAdmin)
      res.should.have.status(200);
      //all fields of original sensor should be here
      res.body.should.deep.include(measurement);
    });
  });

  describe('Update Name of a Measurement', () => {
    it('name of measurement is updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await putMeasAttr(measurement.id, "name", "ss1").set(withAdmin)
      res.should.have.status(200);
      let res2 = await getMeas(measurement.id).set(withAdmin)
      res2.body.should.have.property('name').eql('ss1');
    });
    it('normal user CANNOT update attribute of sensor that he does not own', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await putMeasAttr(measurement.id, "name", "ss1").set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Update quantity kind of a Measurement', () => {
    it('quantity kind is updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await putMeasAttr(measurement.id, "quantity_kind", "Temperature").set(withAdmin)
      res.should.have.status(200);
      let res2 = await getMeas(measurement.id).set(withAdmin)
      res2.body.should.have.property('quantity_kind').eql('Temperature');
    });
  });

  describe('Update sensing device', () => {
    it('sensing device is updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await putMeasAttr(measurement.id, "sensing_device", "Thermometer").set(withAdmin)
      res.should.have.status(200);
      let res2 = await getMeas(measurement.id).set(withAdmin)
      res2.body.should.have.property('sensing_device').eql('Thermometer');
    });
  });
  describe('Update unit', () => {
    it('unit should be updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await putMeasAttr(measurement.id, "unit", "DegreeCelcius").set(withAdmin)
      res.should.have.status(200);
      let res2 = await getMeas(measurement.id).set(withAdmin)
      res2.body.should.have.property('unit').eql('DegreeCelcius');
    });
  });
  describe('get measurement values', () => {
    it('values are returned in an array', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getMeasValues().set(withAdmin)
      res.should.have.status(200);
      res.body.should.be.a('array');
    });
  });
  it('only a few values are returned', async () => {
  });
  describe('push measurement value', () => {
    it('value is pushed', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await pushMeasValue(measurement.id, {"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"}).set(withAdmin)
      res.should.have.status(200);
      let res2 = await getMeasValues().set(withAdmin)
      console.log(JSON.stringify(res2))
      //res2.body.should.be.an('array').that.includes({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
      let res3 = await getMeas(measurement.id).set(withAdmin)
      res3.body.last_value.should.deep.include({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
      res3.body.last_value.should.have.property('date_received');

    });
  });
})
