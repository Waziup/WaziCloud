let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let socialData = require('./sample-data').socials;
let utils = require('../utils');

chai.use(chaiHttp);
let domain = 'waziup'

let getSocialMsgs = () => chai.request(baseUrl).get(`/domains/${domain}/socials`)
let postSocialMsg = (msg) => chai.request(baseUrl).post(`/domains/${domain}/socials`).send(msg)
let getSocialMsg = (id) => chai.request(baseUrl).get(`/domains/${domain}/socials/${id}`)
let deleteSocialMsg = (id) => chai.request(baseUrl).delete(`/domains/${domain}/socials/${id}`)

describe('Socials', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  describe('Get all messages sent', () => {
    it('it should GET all the messages sent', async () => {
      let res = await getSocialMsgs().set(withNormal)
      res.should.have.status(200);
      res.body.should.be.a('array');
      console.log(JSON.stringify(res.body));
     
    });
  });
  describe('post a message to social networks', () => {
    it('it should post a message to twitter', async () => {
      let res = await postSocialMsg(socialData).set(withNormal)
      res.should.have.status(200);
      console.log(JSON.stringify(res.body));
    });
  });
  describe('Get one message sent', () => {
    it('it should GET the messages sent', async () => {
      let res = await getSocialMsg().set(withNormal)
      res.should.have.status(200);
      res.body.should.be.a('array');
      console.log(JSON.stringify(res.body));
     
    });
  });
})
