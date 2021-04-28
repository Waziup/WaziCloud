
describe('WaziCloud API', function() {
    require('./devices/device.test.js');
    require('./devices/sensor.test.js');
    require('./devices/actuator.test.js');
    require('./gateways/gateways.test.js');
    require('./notif/notifications.test.js');
    require('./projects/projects.test.js');
    require('./users/users.test.js');
    require('./mqtt/mqtt.test.js');
});
