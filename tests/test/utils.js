const chai = require('chai');
const chaiHttp = require('chai-http');
const baseUrl = require('../config/env').apiUrl;
const adminCredentials = require('../config/creds').user.admin;
const rootAdminCredentials = require('../config/creds').user.root_admin;
const normalCredentials = require('../config/creds').user.normal;
const device = require('./devices/sample-data').valid;

chai.use(chaiHttp);

console.log(adminCredentials)

async function getAdminToken() {
  const res = await chai.request(baseUrl).post('/auth/token').send(adminCredentials)
  return res.text
}
async function getAdminAuth() {
  const res = await chai.request(baseUrl).post('/auth/token').send(adminCredentials)
  return { 'authorization': `Bearer ${res.text}` }
}

async function getNormalAuth() {
  const res = await chai.request(baseUrl).post('/auth/token').send(normalCredentials)
  return { 'authorization': `Bearer ${res.text}` }
}
async function getRootAdminAuth() {
  const res = await chai.request(baseUrl).post('/auth/token').send(rootAdminCredentials)
  return { 'authorization': `Bearer ${res.text}` }
}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}


const getPermissionsDevices = () => chai.request(baseUrl).get(`/auth/permissions/devices`)
const getPermissionsProjects = () => chai.request(baseUrl).get(`/auth/permissions/projects`)
const getPermissionsGateways = () => chai.request(baseUrl).get(`/auth/permissions/gateways`)

const createDevice = (s) => chai.request(baseUrl).post(`/devices`).send(s)
const deleteDevice = (id) => chai.request(baseUrl).delete(`/devices/${id}`)
const getDevices = () => chai.request(baseUrl).get(`/devices`)
const getDevice = (id) => chai.request(baseUrl).get(`/devices/${id}`)
const setDeviceAttr = (id, attr, value) => chai.request(baseUrl).put(`/devices/${id}/${attr}`).set('content-type', 'text/plain;charset=utf-8').send(value)
const setDeviceMetaField = (id, value) => chai.request(baseUrl).put(`/devices/${id}/meta`).set('content-type', 'application/json').send(value)
const setDeviceLocation = (id, value) => chai.request(baseUrl).put(`/devices/${id}/location`).set('content-type', 'application/json').send(value)

const createSensor = (m) => chai.request(baseUrl).post(`/devices/${device.id}/sensors`).send(m)
const getSensors = () => chai.request(baseUrl).get(`/devices/${device.id}/sensors`)
const getSensor = (id) => chai.request(baseUrl).get(`/devices/${device.id}/sensors/${id}`)
const putSensorAttr = (id, attr, val) => chai.request(baseUrl).put(`/devices/${device.id}/sensors/${id}/${attr}`).set('content-type', 'text/plain;charset=utf-8').send(val)
const putSensorMetaField = (id, val) => chai.request(baseUrl).put(`/devices/${device.id}/sensors/${id}/meta`).set('content-type', 'application/json').send(val)
const pushSensorValue = (id, val) => chai.request(baseUrl).post(`/devices/${device.id}/sensors/${id}/value`).set('content-type', 'application/json').send(val)
const pushSensorValuePlain = (id, val) => chai.request(baseUrl).post(`/devices/${device.id}/sensors/${id}/value`).set('content-type', 'text/plain;charset=utf-8').send(val)

const createActuator = (device_id, s) => chai.request(baseUrl).post(`/devices/${device_id}/actuators`).send(s);
const getActuators = (device_id) => chai.request(baseUrl).get(`/devices/${device_id}/actuators`);
const getActuator = (device_id, a_id) => chai.request(baseUrl).get(`/devices/${device_id}/actuators/${a_id}`);
const deleteActuator = (device_id, a_id) => chai.request(baseUrl).delete(`/devices/${device_id}/actuators/${a_id}`);
const setActuatorValueType = (device_id, a_id, val) => chai.request(baseUrl).put(`/devices/${device_id}/actuators/${a_id}/value_type`).set('content-type', 'text/plain;charset=utf-8').send(val);
const setActuatorKind = (device_id, a_id, val) => chai.request(baseUrl).put(`/devices/${device_id}/actuators/${a_id}/actuator_kind`).set('content-type', 'text/plain;charset=utf-8').send(val);
const setActuatorValue = (device_id, a_id, val) => chai.request(baseUrl).put(`/devices/${device_id}/actuators/${a_id}/value`).set('content-type', 'application/json').send(val);
const setActuatorName = (device_id, a_id, val) => chai.request(baseUrl).put(`/devices/${device_id}/actuators/${a_id}/name`).set('content-type', 'text/plain;charset=utf-8').send(val);
const setActuatorMetaField = (device_id, a_id, val) => chai.request(baseUrl).put(`/devices/${device_id}/actuators/${a_id}/meta`).set('content-type', 'application/json').send(val);

const getSensorData = (id) => chai.request(baseUrl).get(`/sensors_data?device_id=${device.id}&sensor_id=${id}`)

const getGateways = () => chai.request(baseUrl).get('/gateways');
const getGateway = (id) => chai.request(baseUrl).get(`/gateways/${id}`);
const createGateway = (p) => chai.request(baseUrl).post('/gateways').set('content-type', 'application/json').send(p);
const deleteGateway = (id) => chai.request(baseUrl).delete(`/gateways/${id}`);
const updateGatewayName = (id, p) => chai.request(baseUrl).put(`/gateways/${id}/name`).set('content-type', 'application/json').send(p);
const updateGatewayOwner = (id, p) => chai.request(baseUrl).put(`/gateways/${id}/owner`).set('content-type', 'application/json').send(p);

module.exports = {
  getAdminAuth, getNormalAuth, getRootAdminAuth, getAdminToken, sleep,
  getPermissionsDevices, getPermissionsProjects, getPermissionsGateways,
  createDevice,
  deleteDevice,
  getDevices,
  getDevice,
  setDeviceAttr,
  setDeviceMetaField,
  setDeviceLocation,
  createSensor,
  getSensors,
  getSensor,
  putSensorAttr,
  putSensorMetaField,
  pushSensorValue,
  pushSensorValuePlain,
  createActuator,
  getActuators,
  getActuator,
  setActuatorKind,
  setActuatorName,
  setActuatorMetaField,
  setActuatorValue,
  setActuatorValueType,
  deleteActuator,
  getSensorData,
  getGateways,
  getGateway,
  createGateway,
  deleteGateway,
  updateGatewayName, 
  updateGatewayOwner}
