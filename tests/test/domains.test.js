let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let domainData = require('../config/sample-data').domains;

chai.use(chaiHttp);


describe('Domains ', () => {
	describe('/domains  Get all domains', () => {
		it('it should GET all the domains', (done) => {
			chai.request(baseUrl)
				.get(`/domains`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
  });
  describe('/domains create a domain', () => {
		it('it should Create a domain', (done) => {
			chai.request(baseUrl)
        .post(`/domains`)
        .send(domainData)
				.end((err, res) => {
					res.should.have.status(201);
					done();
				});
		});
  });
  describe('/domains/{domainId} get a single domain', () => {
		it('it should get a single domain', (done) => {
			chai.request(baseUrl)
        .post(`/domains/${domainData.id}`)
        .send(domainData)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
  });
})
