
WAZIUP Broker
=============

The WAZIUP broker is an *internal* component of the WAZIUP plaftorm that is managing the data from the sensors and other sources.
In practice, the data broker is Orion, using a Mongo database and Cygnus as adapter.
The specification of the broker and data model can be found [here](broker_spec.md).

Install
-------

To install WAZIUP broker locally:
```
docker-compose up
```

To install directly on WAZIUP Cloud platform:

```
kubectl apply -f broker.yaml
```

Test
----

Test if the broker is present:
```
$ curl broker.waziup.io/version
```

You can create a sensor measuring temperature and pressure (with initial values) like that:
```
$ curl http://broker.waziup.io/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service: waziup' -X POST -d @- <<EOF
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

For pilots, Fiware-ServicePath must be one of the following:
- "UPPA"
- "EGM"
- "IT21"
- "CREATENET"
- "CTIC"
- "UI"
- "ISPACE"
- "UGB"
- "WOELAB" 
- "FARMERLINE"
- "C4A"
- "PUBD" 

For example:
```
--header 'Fiware-ServicePath:/UPPA'
```


Further updates of the values are like that:
```
$ curl http://broker.waziup.io/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service:waziup' -X PUT -d 27
```

To retrieve the last data point inserted:
```
$ curl http://broker.waziup.io/v2/entities/Sensor1/attrs/temperature/value --header 'Fiware-ServicePath:/TEST' --header 'Fiware-Service:waziup' -X GET
```
