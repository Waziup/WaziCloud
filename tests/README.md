This folder contains the integration tests of Waziup platform.

### Installing

The tests are based on the mocha testing enviroment and chai assertion library to install them run

```
cd tests 
npm install --dev
```

### Running the tests

```
npm test
```

for explicit local platform:

```
API_URL=http://localhost:800/api/v2 MQTT_URL=tcp://localhost:3883 npm test
```

for tests against the cloud:

```
API_URL=https://api.waziup.io/api/v2 MQTT_URL=tcp://api.waziup.io:1883 npm test
```

for tests against the staging platform (MQTT will not work):

```
API_URL=http://wazicloud-api.staging.waziup.io/api/v2 npm test
```

### Running individual tests 

for the sensors endpoint

```
npm test test/sensors*
```

for the measurments endpoint

```
npm test measurement*
```

for socials

```
npm test socials.test
```
