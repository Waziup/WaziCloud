let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let measurement = require('../config/sample-data').measurement;

chai.use(chaiHttp);

// remove the sensor exists delete it
chai.request(baseUrl)
    .post(`/domains/${domain}/sensors`)
    .send(sensor)
    .end((err, res) => {

    });

describe('Measurements ', () => {
    describe('/domains/{domain}/sensors/{sensor_id}/measurements Get Measurements', () => {
        it('it should GET all the measurements for a given sensor', (done) => {
            chai.request(baseUrl)
                .get(`/domains/${domain}/sensors/${sensor.id}/measurements`)
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('array');
                    //console.log(res);
                    done();
                });
        });
    });
    describe('/domains/{domain}/sensors/{sensor_id}/measurements POST Measurements', () => {
        it('it should add a measurement value for a given sensor', (done) => {
            chai.request(baseUrl)
                .post(`/domains/${domain}/sensors/${sensor.id}/measurements`)
                .send(measurement)
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('array');
                    //console.log(res);
                    done();
                });
        });
    });
    describe('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id} Get a single Measurement', () => {
        it('it should GET all the measurements for a given sensor', (done) => {
            chai.request(baseUrl)
                .get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('array');
                    //console.log(res);
                    done();
                });
        });
    });

    describe('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/name Update Name', () => {
		it('it should update the name of the measurement field', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/name`)
				.set('content-type', 'text/plain')
				.send("ss1")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(baseUrl)
						.get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
						.end((err, res)=>{
							res.body.should.be.a('object');
							res.body.should.have.property('name').eql('ss1');
							done();
						})

				});

		});
    });
    describe('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/dimension Update dimention', () => {
		it('it should update the dimention of the measurement field', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
				.set('content-type', 'text/plain')
				.send("degree")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(baseUrl)
						.get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
						.end((err, res)=>{
                            console.log(res.body);
							//res.body.should.be.a('object');
							//res.body.should.have.property('dimension').eql('degree');
							done();
						})

				});

		});
    });

    describe('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/dimension Update dimention', () => {
		it('it should update the dimention of the measurement field', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/dimension`)
				.set('content-type', 'text/plain')
				.send("degree")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(baseUrl)
						.get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
						.end((err, res)=>{
                            console.log(res.body);
							//res.body.should.be.a('object');
							//res.body.should.have.property('dimension').eql('degree');
							done();
						})

				});

		});
	});
	describe('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/unit Update unit', () => {
		it('it should update the dimention of the measurement field', (done) => {
			chai.request(baseUrl)
				.put(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}/unit`)
				.set('content-type', 'text/plain')
				.send("degree")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(baseUrl)
						.get(`/domains/${domain}/sensors/${sensor.id}/measurements/${measurement.id}`)
						.end((err, res)=>{
                            console.log(res.body);
							//res.body.should.be.a('object');
							//res.body.should.have.property('dimension').eql('degree');
							done();
						})

				});

		});
	});
})

