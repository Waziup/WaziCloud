let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let device = require('../devices/sample-data').valid;
let sensor = require('../devices/sample-data').valid.sensors[0];
let mqttUrl = require('../../config/env').mqttUrl;

const mqtt = require('mqtt');
const { getAdminAuth, getNormalAuth,
  createDevice,
  deleteDevice,
  createSensor,
  getSensor,
  pushSensorValue,
  createActuator,
  setActuatorValue,
  getActuator
} = require('../utils');

chai.use(chaiHttp);
chai.config.includeStack = true;


describe('MQTT Unit Tests', () => {
  let withAdmin = null
  let withNormal = null
  //Retrieve the tokens and delete pre-existing device
  before(async function () {
    try {
      withAdmin = await getAdminAuth();
      withNormal = await getNormalAuth();
      await deleteDevice(device.id).set(withAdmin);
    } catch (err) {
      console.log('error:' + err)
    }
  });

  //Clean after each test
  afterEach(async function () {
    try {
      await deleteDevice(device.id).set(withAdmin);
    } catch (err) {
      console.log('error:' + err)
      throw err;
    }
  });

  it('Test PUB', (done) => {
    createDevice(device).set(withAdmin).then(async () => {
      const mqttClient = mqtt.connect(mqttUrl);

      let res = await createSensor(sensor).set(withAdmin)
      res.should.have.status(204);

      mqttClient.on('connect', function () {
        const value = { "value": "55.6", "timestamp": "2016-06-08T18:20:27Z" };

        mqttClient.publish(`devices/${device.id}/sensors/${sensor.id}/value`, JSON.stringify(value),
          { qos: 1 }, async (err) => {
            if (!err) {
              let res2 = await getSensor(sensor.id).set(withAdmin);
              res2.body.value.should.deep.include(value);
              res2.body.value.should.have.property('date_received');
            } else
              console.log('callback of publish', err);

            mqttClient.end();
            done();
          });
      });
    });
  });

  it('Test SUB 2', (done) => {
    createDevice(device).set(withAdmin).then(async () => {
      const mqttClient = mqtt.connect(mqttUrl);
      const value = { "value": "155.6", "timestamp": "2016-06-08T18:20:27Z" };

      mqttClient.on('message', function (topic, message) {
        const data = JSON.parse(message.toString());

        console.log(`Message ${message} received on topic ${topic}`, data);
        data.should.deep.include(value);
        mqttClient.end();
        done();
      });

      let res = await createSensor(sensor).set(withAdmin);
      res.should.have.status(204);

      mqttClient.on('connect', async function () {
        mqttClient.subscribe(`devices/${device.id}/sensors/${sensor.id}/value`, { qos: 1 });

        let res = await pushSensorValue(sensor.id, value).set(withAdmin);
        res.should.have.status(204);

        let res2 = await getSensor(sensor.id).set(withAdmin);
        res2.body.value.should.deep.include(value);
        res2.body.value.should.have.property('date_received');
      });
    });
  });

  it('Test SUB WILDCARD +', (done) => {
    createDevice(device).set(withAdmin).then(async () => {
      const mqttClient = mqtt.connect(mqttUrl);
      const value = { "value": "255.6", "timestamp": "2016-06-08T18:20:27Z" };

      mqttClient.on('message', function (topic, message) {
        const data = JSON.parse(message.toString());

        console.log(`Message ${message} received on topic ${topic}`, data);
        data.should.deep.include(value);
        mqttClient.end();
        done();
      });

      let res = await createSensor(sensor).set(withAdmin);
      res.should.have.status(204);

      mqttClient.on('connect', async function () {
        mqttClient.subscribe(`devices/+/sensors/+/value`, { qos: 1 });

        let res = await pushSensorValue(sensor.id, value).set(withAdmin);
        res.should.have.status(204);

        let res2 = await getSensor(sensor.id).set(withAdmin);
        res2.body.value.should.deep.include(value);
        res2.body.value.should.have.property('date_received');
      });
    });
  });

  // it('Test PUB private sensor', (done) => {
  //   createDevice({ ...device, visibility: 'private' }).set(withAdmin).then(async () => {
  //     const value = { "value": "255.6", "timestamp": "2016-06-08T18:20:27Z" };
  //     const mqttClient = mqtt.connect(mqttUrl); //, { username: 'guest', password: 'guest' }
  //     let res = await createSensor(sensor).set(withAdmin);
  //     res.should.have.status(204);
  //     mqttClient.on('connect', async function () {
  //       //it does not allow you to publish. Here it gets blocked. I can set a timeout.
  //       mqttClient.publish(`devices/${device.id}/sensors/${sensor.id}/value`, JSON.stringify(value),
  //         { qos: 1, connectTimeout: 3 * 1000, keepalive: 3 }, async (err) => {
  //           if (!err) {
  //             //- check the value did NOT arrive on the sensor (GET)
  //             let res2 = await getSensor(sensor.id).set(withAdmin);
  //             res2.body.value.should.deep.include(value);
  //           } else
  //             console.log('callback of publish', err);

  //           mqttClient.end();
  //           done();
  //         });
  //     });
  //   });
  // });

  it('Test SUB private sensor', (done) => {
    createDevice({ ...device, visibility: 'private' }).set(withAdmin).then(async () => {
      const value = { "value": "255.6", "timestamp": "2016-06-08T18:20:27Z" };
      const mqttClient = mqtt.connect(mqttUrl); //, { username: 'guest', password: 'guest' }
      let res = await createSensor(sensor).set(withAdmin);
      res.should.have.status(204);
      mqttClient.on('connect', async function () {
        mqttClient.subscribe(`devices/${device.id}/sensors/${sensor.id}/value`, { qos: 1 });
        mqttClient.publish(`devices/${device.id}/sensors/${sensor.id}/value`, JSON.stringify(value),
          { qos: 1 }, async (err) => {
            if (!err) {
              let res2 = await getSensor(sensor.id).set(withAdmin);
              expect(res2.body).to.not.have.property('value');
              expect(res2.body).to.not.have.property('timestamp');
              res2.body.should.deep.include(sensor);
            } else
              console.log('callback of publish', err);

            mqttClient.end();
            done();
          });
      });
    });
  });

  it('Test SUB Actuator', (done) => {
    const actuator = require('../devices/sample-data').valid.actuators[0];
    createDevice(device).set(withAdmin).then(async () => {
      const mqttClient = mqtt.connect(mqttUrl);
      const value = { "value": "false" };

      const resC = await createActuator(device.id, actuator).set(withAdmin);
      resC.should.have.status(204);

      mqttClient.on('message', function (topic, message) {
        const data = JSON.parse(message.toString());

        console.log(`Message ${message} received on topic ${topic}`, data);
        data.should.deep.include(value);
        mqttClient.end();
      });

      mqttClient.on('connect', async function () {
        mqttClient.subscribe(`devices/${device.id}/actuators/${sensor.id}/value`, { qos: 1 });

        let res = await setActuatorValue(device.id, actuator.id, "false").set(withAdmin);
        res.should.have.status(204);

        let res2 = await getActuator(device.id, actuator.id).set(withAdmin);
        res2.body.should.have.property('value').eql(false);
        done();
      });
    });
  });

});
