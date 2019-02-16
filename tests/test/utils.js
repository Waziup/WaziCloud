let chai = require('chai');
let chaiHttp = require('chai-http');
let baseUrl = require('../config/env').apiUrl;
let adminCredentials = require('../config/creds').user.admin;
let rootAdminCredentials = require('../config/creds').user.root_admin;
let normalCredentials = require('../config/creds').user.normal;

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
async function getRootAdminAuth() {
  let res= await chai.request(baseUrl).post('/auth/token').send(rootAdminCredentials)
  return {'authorization': `Bearer ${res.text}`}
}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

module.exports={getAdminAuth, getNormalAuth, getRootAdminAuth, getAdminToken, sleep}
