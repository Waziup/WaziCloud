let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let device = require('./sample-data').valid;
let invalidDevice = require('./sample-data').invalid;
let utils = require('../utils');

console.log("baseUrl:" + baseUrl)

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getPermissions = () => chai.request(baseUrl).get(`/auth/permissions`)
let getDevices = () => chai.request(baseUrl).get(`/devices?limit=1000`)
let createDevice = (s) => chai.request(baseUrl).post(`/devices`).send(s)
let getDevice = (id) => chai.request(baseUrl).get(`/devices/${id}`)
let setDeviceAttr = (id, attr, value) => chai.request(baseUrl).put(`/devices/${id}/${attr}`).set('content-type', 'text/plain;charset=utf-8').send(value)
let setDeviceLocation = (id, value) => chai.request(baseUrl).put(`/devices/${id}/location`).set('content-type', 'application/json').send(value)
let deleteDevice = (id) => chai.request(baseUrl).delete(`/devices/${id}`)


describe('Devices', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing device
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
      await deleteDevice(device.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  //Clean after each test
  afterEach(async function () {
    try {
      await deleteDevice(device.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
      throw err
    }
  });

  describe('Get Permissions', () => {
    it('should return permissions', async () => {
      await getPermissions().set(withAdmin)
    });
    it('admin have permissions on device', async () => {
      await createDevice(device).set(withNormal)
      let res = await getPermissions().set(withAdmin)
      let scopes = res.body.find(p => p.resource == device.id).scopes
      chai.expect(scopes).members(['devices:view', 'devices:update', 'devices:delete', 'devices-data:create', 'devices-data:view']);
    });
    it('admin have permissions on private device', async () => {
      await createDevice({...device, visibility: 'private'}).set(withNormal)
      let res = await getPermissions().set(withAdmin)
      let scopes = res.body.find(p => p.resource == device.id).scopes
      chai.expect(scopes).members(['devices:view', 'devices:update', 'devices:delete', 'devices-data:create', 'devices-data:view']);
    });
    it('normal user have permissions on own device', async () => {
      await createDevice(device).set(withNormal)
      let res = await getPermissions().set(withNormal)
      let scopes = res.body.find(p => p.resource == device.id).scopes
      chai.expect(scopes).members(['devices:view', 'devices:update', 'devices:delete', 'devices-data:create', 'devices-data:view']);
    });
    it('normal user can see public device and add data', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getPermissions().set(withNormal)
      let scopes = res.body.find(p => p.resource == device.id).scopes
      chai.expect(scopes).members(['devices:view', 'devices-data:view', 'devices-data:create']);
    });
    it('normal user cannot see private device', async () => {
      await createDevice({...device, visibility: 'private'}).set(withAdmin)
      let res = await getPermissions().set(withNormal)
      res.status.should.satisfy((s) => {
        switch (s) {
          case 200:
            return ! res.body.map(s => s.id).includes(device.id);
          case 403:
            return true;
          default:
            return false;
        }
      });
    });
  });
  describe('Get Devices', () => {
    it('admin can get devices', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getDevices().set(withAdmin)
      chai.expect(res.body.map(s => s.id)).to.include(device.id);
    });
    it('admin can see private devices', async () => {
      await createDevice({...device, visibility: 'private'}).set(withNormal)
      let res = await getDevices().set(withAdmin)
      chai.expect(res.body.map(s => s.id)).to.include(device.id);
    });
    it('normal user can see public devices', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getDevices().set(withNormal)
      chai.expect(res.body.map(s => s.id)).to.include(device.id);
    });
    it('normal user can see own devices', async () => {
      await createDevice({...device, visibility: 'private'}).set(withNormal)
      let res = await getDevices().set(withNormal)
      chai.expect(res.body.map(s => s.id)).to.include(device.id);
    });
    it('normal user CANNOT see private devices', async () => {
      await createDevice({...device, visibility: 'private'}).set(withAdmin)
      let res = await getDevices().set(withNormal)
      res.status.should.satisfy((s) => {
        switch (s) {
          case 200:
            return ! res.body.map(s => s.id).includes(device.id);
          case 403:
            return true;
          default:
            return false;
        }
      });
    });
  });

  describe('Create device', () => {
    it('device is created by admin', async () => {
      console.log("Before")
      let res = await createDevice(device).set(withAdmin)
      res.should.have.status(204);
    });
    it('device is created by normal user', async () => {
      let res = await createDevice(device).set(withNormal)
      res.should.have.status(204);
    });
    it('device with the same id is rejected', async () => {
      await createDevice(device).set(withAdmin)
      let res = await createDevice(device).set(withNormal)
      res.should.have.status(422);
    });
    it('device with invalid data is rejected', async () => {
      let wrong = Object.assign({}, device)
      delete(wrong.id)
      let res = await createDevice(wrong).set(withAdmin)
      res.should.have.status(400);
    });
  });

  describe('Get a Single Device', () => {
    it('retrieved device has all the correct values', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getDevice(device.id).set(withAdmin)
      res.should.have.status(200);
      res.body.should.be.a('object');
      //all fields of original device should be here
      res.body.should.deep.include(device);
      //read-only fields should be here
      res.body.should.have.property('date_created');
      res.body.should.have.property('date_modified');
      res.body.should.have.property('owner').eql("cdupont");
    });
    it('non existent id is rejected', async () => {
      let res = await getDevice('this-id-does-not-exist').set(withAdmin)
      res.should.have.status(404);
    });
    it('admin can see private device', async () => {
      await createDevice({...device, visibility: 'private'}).set(withNormal)
      let res = await getDevice(device.id).set(withAdmin)
      res.body.should.have.property('id').eql(device.id);
    });
    it('normal user can see public device', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getDevice(device.id).set(withNormal)
      res.body.should.have.property('id').eql(device.id);
    });
    it('normal user can see own device', async () => {
      await createDevice({...device, visibility: 'private'}).set(withNormal)
      let res = await getDevice(device.id).set(withNormal)
      res.body.should.have.property('id').eql(device.id);
    });
    it('normal user CANNOT see private device', async () => {
      await createDevice({...device, visibility: 'private'}).set(withAdmin)
      let res = await getDevice(device.id).set(withNormal)
      res.should.have.status(403);
    });
  });

  describe('Insert Name', () => {
    it('name field should be updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await setDeviceAttr(device.id, "name", "SEN1").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getDevice(device.id).set(withAdmin);
      res2.body.should.have.property('name').eql('SEN1');
    });
    it('normal user can update own device', async () => {
      await createDevice(device).set(withNormal)
      let res = await setDeviceAttr(device.id, "name", "SEN1").set(withNormal)
      let res2 = await getDevice(device.id).set(withNormal);
      res2.body.should.have.property('name').eql('SEN1');
    });
    it('normal user CANNOT update device that he does not own', async () => {
      await createDevice(device).set(withAdmin)
      let res = await setDeviceAttr(device.id, "name", "SEN1").set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Insert Location', () => {
    it('Location field should be updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await setDeviceLocation(device.id, {latitude: 5.36, longitude: 4.0083}).set(withAdmin)
      res.should.have.status(204);
      let res2 = await getDevice(device.id).set(withAdmin)
      res2.body.should.have.property('location').eql({"latitude": 5.36, "longitude": 4.0083});
    });
  });
  describe('Insert Gateway', () => {
    it('gateway field should be updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await setDeviceAttr(device.id, "gateway_id", "GW1").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getDevice(device.id).set(withAdmin);
      res2.body.should.have.property('gateway_id').eql('GW1');
    });
  });

  describe('Remove Device', () => {
    it('admin can remove own device', async () => {
      await createDevice(device).set(withAdmin)
      let res = await deleteDevice(device.id).set(withAdmin)
      res.should.have.status(204);
    });
    it('admin can remove other device', async () => {
      await createDevice(device).set(withNormal)
      let res = await deleteDevice(device.id).set(withAdmin)
      res.should.have.status(204);
    });
    it('normal user can remove own device', async () => {
      await createDevice(device).set(withNormal)
      let res = await deleteDevice(device.id).set(withNormal)
      res.should.have.status(204);
    });
    it('normal user CANNOT remove device owned by other', async () => {
      await createDevice(device).set(withAdmin)
      let res = await deleteDevice(device.id).set(withNormal)
      res.should.have.status(403);
    });
  });

});


module.exports={createDevice, deleteDevice}
