let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sensor').valid;
let invalidSensor = require('../config/sensor').invalid;

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
})

