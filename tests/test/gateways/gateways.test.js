let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let utils = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getGateways = () => chai.request(baseUrl).get('/gateways');
let getGateway = (id) => chai.request(baseUrl).get(`/gateways/${id}`);
let createGateway = (p) => chai.request(baseUrl).post('/gateways').set('content-type', 'application/json').send(p);
let deleteGateway = (id) => chai.request(baseUrl).delete(`/gateways/${id}`);
let updateGatewayName = (id, p) => chai.request(baseUrl).put(`/gateways/${id}/name`).set('content-type', 'application/json').send(p);

describe('Gateways', () => {
  let withAdmin = null;
  let withNormal = null;
  const gateway = {
      "name": "MyGateway",
      "id": "GW95",
  };
  //Retrieve the tokens
  before(async function () {
      try {
          withAdmin = await utils.getAdminAuth();
          withNormal = await utils.getNormalAuth();
      } catch (err) {
          console.log('error:' + err)
      }
  });

  describe('Get Gateways', () => {
    it('an admin gets list of gateways', async () => {
        await createGateway(gateway).set(withNormal);
        let res = await getGateways().set(withAdmin);
        chai.expect(res.body.map(s => s.id)).to.include(gateway.id);
        res.should.have.status(200);
        await deleteGateway(gateway.id).set(withAdmin);
    });
    it('an admin get a gateway with its id', async () => {
        let res = await createGateway(gateway).set(withNormal);
        let res2 = await getGateway(gateway.id).set(withAdmin);
        res2.should.have.status(200);
        res2.body.should.deep.include(gateway);
        res2.body.should.have.property('id');
        await deleteGateway(gateway.id).set(withAdmin);
    });
  });
  describe('Delete Gateways', () => {
    it('a normal user can delete a gateway', async () => {
        let res = await createGateway(gateway).set(withNormal);
        const delRes = await deleteGateway(gateway.id).set(withAdmin);
        delRes.should.have.status(204);
        let res2 = await getGateway(gateway.id).set(withAdmin);
        res2.should.have.status(404);
    });
  });
  describe('Update Gateways', () => {
    it('a normal user can update name', async () => {
        let res = await createGateway(gateway).set(withNormal);
        let res2 = await updateGatewayName(gateway.id, "\"MyGateway2\"").set(withAdmin);
        res2.should.have.status(204);

        let res4 = await getGateway(gateway.id).set(withAdmin);
        res4.should.have.status(200);
        res4.body.should.have.property('name').eql('MyGateway2');

        await deleteGateway(gateway.id).set(withAdmin);
    });
  });
});
