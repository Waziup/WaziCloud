
WAZIUP Broker
=============

The WAZIUP platform uses an internal data broker to manage the data from the sensors and other sources.
In practice, the data broker is Orion, using a Mongo database and Cygnus as adapter.
The specification of the broker and data model can be found [here](broker_spec.md).

Install
-------

To install Orion/Cygnus/Mongo locally:
```
docker-compose up
```

To install Orion/Cygnus/Mongo on Waziup platform:

```
kubectl apply -f broker.yaml
```

Test
----

Test if the broker is present:
```
$ curl www.waziup.io:30026/version
```

You can create a sensor measuring temperature and pressure (with initial values) like that:
```
$ curl http://www.waziup.io:30026/v2/entities -s -S --header 'Content-Type: application/json' -X POST -d @- <<EOF
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

Further updates of the values are like that:
```
$ curl http://www.waziup.io:30026/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' -X PUT -d 27
```

To retrieve the last data point inserted:
```
$ curl http://www.waziup.io:30026/v2/entities/Sensor1/attrs/temperature/value -X GET
```
