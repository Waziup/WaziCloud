let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let sensor = require('./sample-data').valid;
let invalidSensor = require('./sample-data').invalid;
let utils = require('../utils');

console.log("baseUrl:" + baseUrl)

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getPermissions = () => chai.request(baseUrl).get(`/auth/permissions`)
let getSensors = () => chai.request(baseUrl).get(`/sensors?limit=1000`)
let createSensor = (s) => chai.request(baseUrl).post(`/sensors`).send(s)
let getSensor = (id) => chai.request(baseUrl).get(`/sensors/${id}`)
let setSensorAttr = (id, attr, value) => chai.request(baseUrl).put(`/sensors/${id}/${attr}`).set('content-type', 'text/plain;charset=utf-8').send(value)
let setSensorLocation = (id, value) => chai.request(baseUrl).put(`/sensors/${id}/location`).set('content-type', 'application/json').send(value)
let deleteSensor = (id) => chai.request(baseUrl).delete(`/sensors/${id}`)


describe('Sensors', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      await deleteSensor(sensor.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  //Clean after each test
  afterEach(async function () {
    try {
      await deleteSensor(sensor.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
      throw err
    }
  });

  describe('Get Permissions', () => {
    it('should return permissions', async () => {
      await getPermissions().set(withAdmin)
    });
    it('admin have permissions on sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await getPermissions().set(withAdmin)
      let scopes = res.body.find(p => p.resource == sensor.id).scopes
      chai.expect(scopes).members(['sensors:view', 'sensors:update', 'sensors:delete', 'sensors-data:create', 'sensors-data:view']);
    });
    it('admin have permissions on private sensor', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withNormal)
      let res = await getPermissions().set(withAdmin)
      let scopes = res.body.find(p => p.resource == sensor.id).scopes
      chai.expect(scopes).members(['sensors:view', 'sensors:update', 'sensors:delete', 'sensors-data:create', 'sensors-data:view']);
    });
    it('normal user have permissions on own sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await getPermissions().set(withNormal)
      let scopes = res.body.find(p => p.resource == sensor.id).scopes
      chai.expect(scopes).members(['sensors:view', 'sensors:update', 'sensors:delete', 'sensors-data:create', 'sensors-data:view']);
    });
    it('normal user can see public sensor and add data', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getPermissions().set(withNormal)
      let scopes = res.body.find(p => p.resource == sensor.id).scopes
      chai.expect(scopes).members(['sensors:view', 'sensors-data:view', 'sensors-data:create']);
    });
    it('normal user cannot see private sensor', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withAdmin)
      let res = await getPermissions().set(withNormal)
      res.status.should.satisfy((s) => {
        switch (s) {
          case 200:
            return ! res.body.map(s => s.id).includes(sensor.id);
          case 403:
            return true;
          default:
            return false;
        }
      });
    });
  });
  describe('Get Sensors', () => {
    it('admin can get sensors', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getSensors().set(withAdmin)
      chai.expect(res.body.map(s => s.id)).to.include(sensor.id);
    });
    it('admin can see private sensors', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withNormal)
      let res = await getSensors().set(withAdmin)
      chai.expect(res.body.map(s => s.id)).to.include(sensor.id);
    });
    it('normal user can see public sensors', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getSensors().set(withNormal)
      chai.expect(res.body.map(s => s.id)).to.include(sensor.id);
    });
    it('normal user can see own sensors', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withNormal)
      let res = await getSensors().set(withNormal)
      chai.expect(res.body.map(s => s.id)).to.include(sensor.id);
    });
    it('normal user CANNOT see private sensors', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withAdmin)
      let res = await getSensors().set(withNormal)
      res.status.should.satisfy((s) => {
        switch (s) {
          case 200:
            return ! res.body.map(s => s.id).includes(sensor.id);
          case 403:
            return true;
          default:
            return false;
        }
      });
    });
  });

  describe('Create sensor', () => {
    it('sensor is created by admin', async () => {
      console.log("Before")
      let res = await createSensor(sensor).set(withAdmin)
      res.should.have.status(204);
    });
    it('sensor is created by normal user', async () => {
      let res = await createSensor(sensor).set(withNormal)
      res.should.have.status(204);
    });
    it('sensor with the same id is rejected', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await createSensor(sensor).set(withNormal)
      res.should.have.status(422);
    });
    it('sensor with invalid data is rejected', async () => {
      let wrong = Object.assign({}, sensor)
      delete(wrong.id)
      let res = await createSensor(wrong).set(withAdmin)
      res.should.have.status(400);
    });
  });

  describe('Get a Single Sensor', () => {
    it('retrieved sensor has all the correct values', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getSensor(sensor.id).set(withAdmin)
      res.should.have.status(200);
      res.body.should.be.a('object');
      //all fields of original sensor should be here
      res.body.should.deep.include(sensor);
      //read-only fields should be here
      res.body.should.have.property('date_created');
      res.body.should.have.property('date_modified');
      res.body.should.have.property('owner').eql("cdupont");
    });
    it('non existent id is rejected', async () => {
      let res = await getSensor('this-id-does-not-exist').set(withAdmin)
      res.should.have.status(404);
    });
    it('admin can see private sensor', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withNormal)
      let res = await getSensor(sensor.id).set(withAdmin)
      res.body.should.have.property('id').eql(sensor.id);
    });
    it('normal user can see public sensor', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await getSensor(sensor.id).set(withNormal)
      res.body.should.have.property('id').eql(sensor.id);
    });
    it('normal user can see own sensor', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withNormal)
      let res = await getSensor(sensor.id).set(withNormal)
      res.body.should.have.property('id').eql(sensor.id);
    });
    it('normal user CANNOT see private sensor', async () => {
      await createSensor({...sensor, visibility: 'private'}).set(withAdmin)
      let res = await getSensor(sensor.id).set(withNormal)
      res.should.have.status(403);
    });
  });

  describe('Insert Name', () => {
    it('name field should be updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await setSensorAttr(sensor.id, "name", "SEN1").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin);
      res2.body.should.have.property('name').eql('SEN1');
    });
    it('normal user can update own sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await setSensorAttr(sensor.id, "name", "SEN1").set(withNormal)
      let res2 = await getSensor(sensor.id).set(withNormal);
      res2.body.should.have.property('name').eql('SEN1');
    });
    it('normal user CANNOT update sensor that he does not own', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await setSensorAttr(sensor.id, "name", "SEN1").set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Insert Location', () => {
    it('Location field should be updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await setSensorLocation(sensor.id, {latitude: 5.36, longitude: 4.0083}).set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.should.have.property('location').eql({"latitude": 5.36, "longitude": 4.0083});
    });
  });
  describe('Insert Gateway', () => {
    it('gateway field should be updated', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await setSensorAttr(sensor.id, "gateway_id", "GW1").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin);
      res2.body.should.have.property('gateway_id').eql('GW1');
    });
  });

  describe('Remove Sensor', () => {
    it('admin can remove own sensor', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await deleteSensor(sensor.id).set(withAdmin)
      res.should.have.status(204);
    });
    it('admin can remove other sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await deleteSensor(sensor.id).set(withAdmin)
      res.should.have.status(204);
    });
    it('normal user can remove own sensor', async () => {
      await createSensor(sensor).set(withNormal)
      let res = await deleteSensor(sensor.id).set(withNormal)
      res.should.have.status(204);
    });
    it('normal user CANNOT remove sensor owned by other', async () => {
      await createSensor(sensor).set(withAdmin)
      let res = await deleteSensor(sensor.id).set(withNormal)
      res.should.have.status(403);
    });
  });

});


module.exports={createSensor, deleteSensor}
