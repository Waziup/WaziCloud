let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
const { getGateways,
        getGateway,
        createGateway,
        deleteGateway,
        updateGatewayName, 
        updateGatewayOwner, 
        getPermissionsGateways,
        getAdminAuth,
        getNormalAuth} = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

describe('Gateways', () => {
  let withAdmin = null;
  let withNormal = null;
  const gateway = {
      "name": "MyGateway",
      "id": "GW46",
      "visibility": "public"
  };
  //Retrieve the tokens
  before(async function () {
      try {
          withAdmin = await getAdminAuth();
          withNormal = await getNormalAuth();
      } catch (err) {
          console.log('error:' + err)
      }
  });

  describe('Get Permissions', () => {
    it('should return permissions', async () => {
      await getPermissionsGateways().set(withAdmin)
    });
    it('admin have permissions on gateway', async () => {
      await createGateway(gateway).set(withNormal)
      let res = await getPermissionsGateways().set(withAdmin)
      let scopes = res.body.find(p => p.resource == gateway.id).scopes
      chai.expect(scopes).members(['gateways:view', 'gateways:update', 'gateways:delete']);
    });
    it('admin have permissions on private gateway', async () => {
      await createGateway({ ...gateway, visibility: 'private' }).set(withNormal)
      let res = await getPermissionsGateways().set(withAdmin)
      let scopes = res.body.find(p => p.resource == gateway.id).scopes
      chai.expect(scopes).members(['gateways:view', 'gateways:update', 'gateways:delete']);
    });
    it('normal user have permissions on own gateway', async () => {
      await createGateway(gateway).set(withNormal)
      let res = await getPermissionsGateways().set(withNormal)
      let scopes = res.body.find(p => p.resource == gateway.id).scopes
      chai.expect(scopes).members(['gateways:view', 'gateways:update', 'gateways:delete']);
    });
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
    it('normal user CANNOT see private gateway', async () => {
      await createGateway({ ...gateway, visibility: 'private' }).set(withAdmin)
      let res = await getGateway(gateway.id).set(withNormal)
      res.should.have.status(403);
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
    it('normal user CANNOT remove gateway owned by other', async () => {
      await createGateway(gateway).set(withAdmin)
      let res = await deleteGateway(gateway.id).set(withNormal)
      res.should.have.status(403);
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
    it('admin can change gateway owner', async () => {
        let res = await createGateway(gateway).set(withNormal);
        let res2 = await updateGatewayOwner(gateway.id, "\"cdupont\"").set(withAdmin);
        res2.should.have.status(204);

        let res4 = await getGateway(gateway.id).set(withAdmin);
        res4.should.have.status(200);
        res4.body.should.have.property('owner').eql('cdupont');

        await deleteGateway(gateway.id).set(withAdmin);
    });
  });
});
