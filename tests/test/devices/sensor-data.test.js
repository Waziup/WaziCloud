let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let device = require('./sample-data').valid;
let sensor = require('./sample-data').valid.sensors[0];
const { getAdminAuth, getNormalAuth, 
  createDevice,
  deleteDevice,
  pushSensorValue,
  getSensorData
} = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

describe('Sensor-data', () => {
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
  describe('Read sensor data', () => {
    it('data with timestamp', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);

      let res = await pushSensorValue(sensor.id, {"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"}).set(withAdmin);
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      chai.expect(res3.body[0]).to.deep.include({"value": "25.6", "timestamp": "2016-06-08T18:20:27.873Z"});
    });
    it('number data is read', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);
      let res = await pushSensorValue(sensor.id, {"value": 25.6})
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": 25.6});
    });
    it('string data is read', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);
      let res = await pushSensorValue(sensor.id, {"value": "A"})
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": "A"});
    });
    it('boolean data is read', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);
      let res = await pushSensorValue(sensor.id, {"value": true})
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": true});
    });
    it('array data is read', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);
      let res = await pushSensorValue(sensor.id, {"value": [true]})
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": [true]});
    });
    it('object data is read', async () => {
      const resC = await createDevice(device).set(withAdmin);
      resC.should.have.status(204);
      let res = await pushSensorValue(sensor.id, {"value": {a:1, b:"2"}})
      res.should.have.status(204);
      let res3 = await getSensorData(sensor.id).set(withAdmin)
      res3.body[0].should.deep.include({"value": {a:1, b:"2"}});
    });
  });
})
