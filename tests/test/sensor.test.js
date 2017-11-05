let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://localhost/api/v1";

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
			let sensor = {
				"id": "0d710b12-27e8-433d-ab3a-e05b7127eeaa",
				"gateway_id": "0d710b12-27e8-433d-ab3a-e05b7127eeaa",
				"name": "Sensor1",
				"owner": "cdupont",
				"sensor_kind": "Soil temperature sensor",
				"measurements": [
				  {
					"id": "0d710b12-27e8-433d-ab3a-e05b7127eeaa",
					"name": "TC1",
					"dimension": "temperature",
					"unit": "Degree C",
					"values": [
					  {
						"value": "25.6",
						"timestamp": "2016-06-08T18:20:27.873Z"
					  }
					]
				  }
				],
				"location": {
				  "latitude": 5.36,
				  "longitude": 4.0083
				}
			};
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
					console.log(res);
					res.should.have.status(200);
					// res.body.should.be.a('object');
					// res.body.should.have.property('gateway_id');
					// res.body.should.have.property('name');
					// res.body.should.have.property('owner');
					// res.body.should.have.property('sensor_kind');
					// res.body.should.have.property('measurements');
					// res.body.should.have.property('location');
					// res.body.should.have.property('id').eql("0d710b12-27e8-433d-ab3a-e05b7127eeaa");
					done();
				});

		});
	});

});