let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let utils = require('../utils');

chai.use(chaiHttp);
chai.Assertion.includeStack = true;

let getProjects = () => chai.request(baseUrl).get(`/projects`);
let getProject = (id) => chai.request(baseUrl).get(`/projects/${id}`);
let createProject = (p) => chai.request(baseUrl).post(`/projects`).send(p);
let deleteProject = (id) => chai.request(baseUrl).delete(`/projects/${id}`);
let updateProjectDevices = (id, p) => chai.request(baseUrl).put(`/projects/${id}/devices`).send(p);
let updateProjectGateways = (id, p) => chai.request(baseUrl).put(`/projects/${id}/gateways`).send(p);

describe('Projects', () => {
    let withAdmin = null;
    let withNormal = null;
    const project = {
        "name": "MyProject",
        "id": "5c33d34c41dabe0006000000",
        "gateways": [],
        "devices": []
    };
    //Retrieve the tokens
    before(async function () {
        try {
            withAdmin = await utils.getAdminAuth()
            withNormal = await utils.getNormalAuth()
        } catch (err) {
            console.log('error:' + err)
        }
    });

    //Clean after each test
    afterEach(async function () {
        try {
        } catch (err) {
            console.log('error:' + err)
            throw err
        }
    });

    it('an admin gets list of projects', async () => {
        let res = await getProjects().set(withAdmin);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.deep.include(project);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('gateways');
        res.body[0].should.have.property('devices');
    });

    it('an admin gets a project with its id', async () => {
        let res = await getProject(project.id).set(withAdmin);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.deep.include(project);
        res.body.should.have.property('name');
        res.body.should.have.property('id');
        res.body.should.have.property('gateways');
        res.body.should.have.property('devices');
    });

    it('a normal user can create a project, get, and delete project', async () => {
        const newProject = {
            "name": "NewProject 4",
            "gateways": ['GW3', 'GW2'],
            "devices": ['D1', 'D2']
        };

        let res = await createProject(newProject).set(withNormal);
        res.should.have.status(200);
        res.body.should.be.a('object');

        let res2 = await getProjects().set(withAdmin);
        res2.should.have.status(200);
        res2.body.should.be.a('array');
        let entry = res2.body.find(p => p.name === newProject.name);
        entry.should.deep.include(newProject);
        
        const delRes = await deleteProject(entry.id).set(withAdmin);
        delRes.should.have.status(204);
    });

    it('a normal user can create a project, get, update its devices, gateways, and delete project', async () => {
        const newProject = {
            "name": "NewProject 8",
            "gateways": ['GW3', 'GW2'],
            "devices": ['D1', 'D2']
        };
        const newProjectAfterUpdates = {
            "name": "NewProject 8",
            "gateways": ['G6', 'G7'],
            "devices": ['D6', 'D7']
        };

        let res = await createProject(newProject).set(withNormal);
        res.should.have.status(200);
        res.body.should.be.a('object');

        let res2 = await getProjects().set(withAdmin);
        res2.should.have.status(200);
        res2.body.should.be.a('array');
        let entry = res2.body.find(p => p.name === newProject.name);
        entry.should.deep.include(newProject);

        const updateDevRes = await updateProjectDevices(entry.id, ['D6', 'D7']).set(withAdmin);
        updateDevRes.should.have.status(204);
        const updateGwRes = await updateProjectGateways(entry.id, ['G6', 'G7']).set(withAdmin);
        updateGwRes.should.have.status(204);

        let res3 = await getProject(entry.id).set(withAdmin);
        res3.should.have.status(200);
        entry2 = res3.body;
        entry2.should.deep.include(newProjectAfterUpdates);

        const delRes = await deleteProject(entry.id).set(withAdmin);
        //console.log(entry, entry2)
        delRes.should.have.status(204);
    });
});