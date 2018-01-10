let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let userCredentials = require('../config/sample-data').user.admin;
let entities = require('../config/sample-data.json').entities;
let token = "";

chai.use(chaiHttp);

describe('Entities with admin previledges', () => {
	before(function (done) {
		chai.request(baseUrl)
			.post('/auth/token')
			.send(userCredentials)
			.end(function (err, response) {
				token = response.text;
				chai.request(baseUrl)
					.delete(`/domains/${domain}/entities/${entities.type}/${entities.id}`)
					.set('Authorization', `Bearer ${token}`)
					.end((err, rss) => {
						done();
					})
			});
	});
	after(function (done) {
		chai.request(baseUrl)
			.delete(`/domains/${domain}/entities/${entities.type}/${entities.id}`)
			.set('Authorization', `Bearer ${token}`)
			.end((err, rss) => {
				done();
			})
	});
	describe('create a new entity', () => {
		it('it should create a new entity', (done) => {
			chai.request(baseUrl)
				.post(`/domains/${domain}/entities`)
				.set('Authorization', `Bearer ${token}`)
				.send(entities)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe('get all known entity types', () => {
		it('it should GET all known entity types', (done) => {
			chai.request(baseUrl)
				.get(`/domains/${domain}/entities/types`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
	describe('get entities of one type', () => {
		it('it should GET entities of one type', (done) => {
			chai.request(baseUrl)
				.get(`/domains/${domain}/entities/${entities.type}`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
	describe('get a single entity', () => {
		it('it should GET a single entity', (done) => {
			chai.request(baseUrl)
				.get(`/domains/${domain}/entities/${entities.type}/${entities.id}`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
	describe('add an entity attribute value', () => {
		it('it should add an entity attribute value', (done) => {
			chai.request(baseUrl)
				.post(`/domains/${domain}/entities/${entities.type}/${entities.id}/temprature`)
				.set('Authorization', `Bearer ${token}`)
				.send({
					"value": "25.6",
					"timestamp": "2016-06-08T18:20:27.873Z"
				})
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe('get entity attribute values', () => {
		it('it should get entity attribute values', (done) => {
			chai.request(baseUrl)
				.get(`/domains/${domain}/entities/${entities.type}/${entities.id}/temprature`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe('set entity attribute values', () => {
		it('it should set entity attribute values', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/entities/${entities.type}/${entities.id}/temprature`)
				.set('Authorization', `Bearer ${token}`)
				.send({
					"value": "26.6",
					"timestamp": "2016-06-08T18:20:27.873Z"
				})
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
	describe('delete an entity attribute', () => {
		it('it should delete an entity attribute', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/entities/${entities.type}/${entities.id}/temprature`)
				.set('Authorization', `Bearer ${token}`)
				.send({
					"value": "26.6",
					"timestamp": "2016-06-08T18:20:27.873Z"
				})
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});