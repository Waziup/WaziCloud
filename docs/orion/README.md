
WAZIUP Internal Broker
======================

This doc is intended for WAZIUP developpers. User docs can be found in www.waziup.io.
The WAZIUP broker is an internal component of the WAZIUP plaftorm that is managing the data from the sensors and other sources.
In practice, the data broker is Orion, using a Mongo database.
The specification of the broker and data model can be found [here](broker_spec.md).
Test of the broker and historical APIs can be found [here](broker_test.md).


Test
----


You can create a sensor measuring temperature and pressure (with initial values) like that:
```
$ curl http://localhost:1026/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service: waziup' -X POST -d @- <<EOF
{
  "id": "Sensor1",
  "type": "SensingDevice",
  "temperature": {
    "value": 23,
    "type": "Number"
  },
  "pressure": {
    "value": 720,
    "type": "Number"
  }
}
EOF
```
Fiware-Service must be "waziup".


Further updates of the values are like that:
```
$ curl http://localhost:1026/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service:waziup' -X PUT -d 27
```

To retrieve the last data point inserted:
```
$ curl http://localhost:1026/v2/entities/Sensor1/attrs/temperature/value --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service:waziup' -X GET
```

To retrieve the list of sensors:
```
curl http://localhost:1026/v2/entities --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service:waziup' -X GET
```
