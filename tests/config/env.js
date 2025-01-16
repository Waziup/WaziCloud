module.exports ={
  apiUrl:  process.env.API_URL  || "http://localhost:800/api/v2",
  mqttUrl: process.env.MQTT_URL || "tcp://127.0.0.1:3883",
  domain: "waziup"
}
