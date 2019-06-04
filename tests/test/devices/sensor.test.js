let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let device = require('./sample-data').valid;
let sensor = require('./sample-data').valid.sensors[0];

const {
  getAdminAuth,
  getNormalAuth,
  createDevice,
  deleteDevice,
  createSensor,
  getSensors,
  getSensor,
  putSensorAttr,
  pushSensorValue,
} = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

describe('Sensors', () => {
  let withAdmin = null
  let withNormal = null
  //Retrieve the tokens and create a new device
  before(async function () {
    try {
      withAdmin = await getAdminAuth()
      withNormal = await getNormalAuth()
      await deleteDevice(device.id).set(withAdmin)
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

  describe('Get Sensors', () => {
    it('sensors are returned in an array', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getSensors().set(withAdmin)
      res.should.have.status(200);
      chai.expect(res.body.map(m => m.id)).to.have.members(device.sensors.map(m => m.id));
    });
    it('normal user CANNOT see private sensors', async () => {
      await createDevice({ ...device, visibility: 'private' }).set(withAdmin)
      let res = await getSensors().set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Create sensor', () => {
    it('admin can create a sensor', async () => {
      await createDevice(device).set(withAdmin)
      let res = await createSensor(sensor).set(withAdmin)
      res.should.have.status(204);
    });
    it('normal user can create a sensor on his own device', async () => {
      await createDevice(device).set(withNormal)
      let res = await createSensor(sensor).set(withNormal)
      res.should.have.status(204);
    });
    it('normal user CANNOT create a sensor on a device owned by other', async () => {
      await createDevice(device).set(withAdmin)
      let res = await createSensor(sensor).set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Get a single Sensor', async () => {
    it('retrieved sensor values are correct', async () => {
      await createDevice(device).set(withAdmin)
      let res = await getSensor(sensor.id).set(withAdmin)
      res.should.have.status(200);
      //all fields of original device should be here
      res.body.should.deep.include(sensor);
    });
  });

  describe('Update Name of a Sensor', () => {
    it('name of sensor is updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await putSensorAttr(sensor.id, "name", "ss1").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.should.have.property('name').eql('ss1');
    });
    it('normal user CANNOT update attribute of device that he does not own', async () => {
      await createDevice(device).set(withAdmin)
      let res = await putSensorAttr(sensor.id, "name", "ss1").set(withNormal)
      res.should.have.status(403);
    });
  });
  describe('Update quantity kind of a Sensor', () => {
    it('quantity kind is updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await putSensorAttr(sensor.id, "quantity_kind", "Temperature").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.should.have.property('quantity_kind').eql('Temperature');
    });
  });

  describe('Update sensing device', () => {
    it('sensing device is updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await putSensorAttr(sensor.id, "sensor_kind", "Thermometer").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.should.have.property('sensor_kind').eql('Thermometer');
    });
  });
  describe('Update unit', () => {
    it('unit should be updated', async () => {
      await createDevice(device).set(withAdmin)
      let res = await putSensorAttr(sensor.id, "unit", "DegreeCelcius").set(withAdmin)
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.should.have.property('unit').eql('DegreeCelcius');
    });
  });
  describe('push sensor value', () => {
    it('string value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z" })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": "25.6", "timestamp": "2016-06-08T18:20:27Z" });
      res2.body.value.should.have.property('date_received');
    });
    it('normal user can push on public device', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z" })
      res.should.have.status(204);
    });
    it('normal user CANNOT push on private device', async () => {
      await createDevice({ ...device, visibility: 'private' }).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": "25.6", "timestamp": "2016-06-08T18:20:27Z" }).set(withNormal)
      res.should.have.status(403);
    });
    it('number value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": 25.6 })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": 25.6 });
    });
    it('string value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": "A" })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": "A" });
    });
    it('boolean value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": true })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": true });
    });
    it('array value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": [true] })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": [true] });
    });
    it('object value is pushed', async () => {
      await createDevice(device).set(withAdmin)
      let res = await pushSensorValue(sensor.id, { "value": { a: 1, b: "2" } })
      res.should.have.status(204);
      let res2 = await getSensor(sensor.id).set(withAdmin)
      res2.body.value.should.deep.include({ "value": { a: 1, b: "2" } });
    });
  });
})
