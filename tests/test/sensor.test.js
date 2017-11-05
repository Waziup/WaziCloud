let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://localhost/api/v1";
let sensor = require('../config/sensor');

chai.use(chaiHttp);

chai.request(server)
	.delete('/domains/cdupont/sensors/0d710b12-27e8-433d-ab3a-e05b7127eeaa')
	.end((err, rss)=>{
		
	})

describe('Sensors ', () => {

	describe('/GET Sensors', () => {
		it('it should GET all the the senseors', (done) => {
			chai.request(server)
				.get('/domains/cdupont/sensors')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
	describe('/Post sensors', ()=>{
		it('it should POST a sensor ', (done) => {
			chai.request(server)
				.post('/domains/cdupont/sensors')
				.send(sensor)
				.end((err, res) => {
					res.should.have.status(200);
				  done();
				});
		  });
	});

	describe('/GET/:id sensor', () => {
		it('it should GET a sensor by the given id', (done) => {
		
			chai.request(server)
				.get( '/domains/cdupont/sensors/0d710b12-27e8-433d-ab3a-e05b7127eeaa')
				.end((err, res) => {
					if(err){
						console.log(err);
						return;
					}
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('gateway_id');
					res.body.should.have.property('name');
					res.body.should.have.property('owner');
					res.body.should.have.property('sensor_kind');
					res.body.should.have.property('measurements');
					res.body.should.have.property('location');
					res.body.should.have.property('id').eql(sensor.id);
					done();
				});

		});
	});

});