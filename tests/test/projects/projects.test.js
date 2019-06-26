let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let utils = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getProjects = () => chai.request(baseUrl).get('/projects');
let getProject = (id) => chai.request(baseUrl).get(`/projects/${id}`);
let createProject = (p) => chai.request(baseUrl).post('/projects').set('content-type', 'application/json').send(p);
let deleteProject = (id) => chai.request(baseUrl).delete(`/projects/${id}`);
let updateProjectDevices = (id, p) => chai.request(baseUrl).put(`/projects/${id}/devices`).set('content-type', 'application/json').send(p);
let updateProjectGateways = (id, p) => chai.request(baseUrl).put(`/projects/${id}/gateways`).set('content-type', 'application/json').send(p);

describe('Projects', () => {
  let withAdmin = null;
  let withNormal = null;
  const project = {
      "name": "MyProject",
      "gateways": ['GW3', 'GW2'],
      "devices": ['D1', 'D2']
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

  describe('Get Projects', () => {
    it('an admin gets list of projects', async () => {
        await createProject(project).set(withNormal);
        let res = await getProjects().set(withAdmin);
        chai.expect(res.body.map(s => s.name)).to.include(project.name);
        res.should.have.status(200);
        await deleteProject(res.text).set(withAdmin);
    });
    it('an admin get a project with its id', async () => {
        let res = await createProject(project).set(withNormal);
        let res2 = await getProject(res.text).set(withAdmin);
        res2.should.have.status(200);
        res2.body.should.deep.include(project);
        res2.body.should.have.property('id');
        await deleteProject(res.text).set(withAdmin);
    });
  });
  describe('Delete Projects', () => {
    it('a normal user can delete a project', async () => {
        let res = await createProject(project).set(withNormal);
        const delRes = await deleteProject(res.text).set(withAdmin);
        delRes.should.have.status(204);
        let res2 = await getProject(res.text).set(withAdmin);
        res2.should.have.status(404);
    });
  });
  describe('Update Projects', () => {
    it('a normal user can update devices and gateways', async () => {
        let res = await createProject(project).set(withNormal);
        let res2 = await updateProjectDevices(res.text, ['D6', 'D7']).set(withAdmin);
        res2.should.have.status(204);
        let res3 = await updateProjectGateways(res.text, ['G6', 'G7']).set(withAdmin);
        res3.should.have.status(204);

        let res4 = await getProject(res.text).set(withAdmin);
        res4.should.have.status(200);
        res4.body.should.have.property('gateways').eql(['G6', 'G7']);
        res4.body.should.have.property('devices').eql(['D6', 'D7']);

        await deleteProject(res.text).set(withAdmin);
    });
  });
});
