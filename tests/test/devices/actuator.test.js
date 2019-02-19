let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let actuator = require('./sample-data').valid.actuators[0];
let device = require('./sample-data').valid;
const { getAdminAuth, getNormalAuth,
  createDevice,
  deleteDevice,
  createActuator, getActuators, deleteActuator, setActuatorKind,
  setActuatorName,
  setActuatorValue,
  setActuatorValueType, getActuator } = require('../utils');

chai.use(chaiHttp);

describe('actuators', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing Actuator
  before(async function () {
    try {
      withAdmin = await getAdminAuth()
      withNormal = await getNormalAuth()
      await createDevice(device).set(withAdmin);
    } catch (err) {
      console.log('error:' + err)
    }
  });

  after(async function () {
    await deleteDevice(device.id).set(withAdmin);
  })

  afterEach(async function () {
    try {
      await deleteActuator(device.id, actuator.id).set(withAdmin)
    } catch (err) {
      console.log('error:' + err)
      throw err
    }
  });

  describe('Get actuators', () => {
    it('admin can get actuators', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await getActuators(device.id).set(withAdmin);
      console.log(res.body);
      chai.expect(res.body.map(s => s.id)).to.include(actuator.id);
    });
  });

  describe('Create Actuator', () => {
    it('Actuator is created by admin', async () => {
      let res = await createActuator(device.id, actuator).set(withAdmin)
      res.should.have.status(204);
    });

    it('Actuator with the same id is rejected', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin)
      cRes.should.have.status(204);

      let res = await createActuator(device.id, actuator).set(withAdmin)
      res.should.have.status(400);
    });

    it('Actuator with invalid data is rejected', async () => {
      let wrong = Object.assign({}, actuator)
      delete (wrong.id)

      let res = await createActuator(device.id, wrong).set(withAdmin)
      res.should.have.status(400);
    });
  });

  describe('Get a Single Actuator', () => {
    it('retrieved actuator has all the correct values', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await getActuator(device.id, actuator.id).set(withAdmin);
      res.should.have.status(200);
      res.body.should.be.a('object');
      //all fields of original Actuator should be here
      res.body.should.deep.include(actuator);
      //read-only fields should be here
      res.body.should.have.property('actuator_value_type');
      res.body.should.have.property('actuator_kind');
      res.body.should.have.property('value');
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      //res.body.should.have.property('owner').eql("cdupont");
    });

    it('non existent id is rejected', async () => {
      let res = await getActuator(device.id, 'this-id-does-not-exist').set(withAdmin)
      res.should.have.status(404);
    });
  });

  describe('Insert Name', () => {
    it('name field should be updated', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await setActuatorName(device.id, actuator.id, "My Actuator Buzzer").set(withAdmin);
      res.should.have.status(204);

      let res2 = await getActuator(device.id, actuator.id).set(withAdmin);
      res2.body.should.have.property('name').eql("My Actuator Buzzer");
    });
  });

  describe('Insert Kind', () => {
    it('kind field should be updated', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await setActuatorKind(device.id, actuator.id, "New Buzzer").set(withAdmin);
      res.should.have.status(204);

      let res2 = await getActuator(device.id, actuator.id).set(withAdmin);
      res2.body.should.have.property('actuator_kind').eql("New Buzzer");
    });
  });

  describe('Insert Value Type', () => {
    it('Value Type field should be updated', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);
      //"string", "number", "bool", "null", "object" and "array"
      let res = await setActuatorValueType(device.id, actuator.id, "bool").set(withAdmin);
      res.should.have.status(204);

      let res2 = await getActuator(device.id, actuator.id).set(withAdmin);
      res2.body.should.have.property('actuator_value_type').eql("bool");
    });
  });

  describe('Insert Value', () => {
    it('value field should be updated', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await setActuatorValue(device.id, actuator.id, false).set(withAdmin);
      res.should.have.status(204);

      let res2 = await getActuator(device.id, actuator.id).set(withAdmin);
      res2.body.should.have.property('value').eql(false);
    });
  });

  describe('Remove Actuator', () => {
    it('admin can remove own Actuator', async () => {
      let cRes = await createActuator(device.id, actuator).set(withAdmin);
      cRes.should.have.status(204);

      let res = await deleteActuator(device.id, actuator.id).set(withAdmin)
      res.should.have.status(204);
    });

    it('normal user can remove own Actuator', async () => {
      const resD = await deleteDevice(device.id).set(withAdmin);
      resD.should.have.status(204);

      const resC = await createDevice(device).set(withNormal);
      resC.should.have.status(204);

      let cRes = await createActuator(device.id, actuator).set(withNormal);
      cRes.should.have.status(204);

      let res = await deleteActuator(device.id, actuator.id).set(withNormal)
      res.should.have.status(204);
    });

    // it('normal user cannot remove admin Actuator', async () => {
    //   let cRes = await createActuator(device.id, actuator).set(withAdmin);
    //   cRes.should.have.status(204);

    //   let res = await deleteActuator(device.id, actuator.id).set(withNormal)
    //   res.should.have.status(403);
    // });

  });
});