let chai = require('chai');
let chaiHttp = require('chai-http');
let baseUrl = require('../config/env').apiUrl;
let adminCredentials = require('../config/sample-data').user.admin;
let normalCredentials = require('../config/sample-data').user.normal;
let domain = require('../config/env').domain;
let sensor = require('../config/sample-data').valid;

chai.use(chaiHttp);

async function getAdminToken() {
  let res= await chai.request(baseUrl).post('/auth/token').send(adminCredentials)
  return res.text
}
async function getAdminAuth() {
  let res= await chai.request(baseUrl).post('/auth/token').send(adminCredentials)
  return {'authorization': `Bearer ${res.text}`}
}

async function getNormalAuth() {
  let res= await chai.request(baseUrl).post('/auth/token').send(normalCredentials)
  return {'authorization': `Bearer ${res.text}`}
}

module.exports={getAdminAuth, getNormalAuth, getAdminToken}
