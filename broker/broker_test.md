
Orion and Cygnus test
=====================


Start Orion/Cygnus/Mongo:

```
$ cd platform/broker
$ docker-compose up
```

Create an entity:

```
$ curl http://localhost:1026/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X POST -d @- <<EOF
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
Register the updates with Cygnus:
```
(curl localhost:1026/v1/subscribeContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' -d @- | python -mjson.tool) <<EOF
{
    "entities": [
        {
            "type": "SensingDevice",
            "isPattern": "false",
            "id": "Sensor1"
        }
    ],
    "attributes": [
        "temperature"
    ],
    "reference": "http://cygnus:5050/notify",
    "duration": "P1M",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "temperature"
            ]
        }
    ],
    "throttling": "PT1S"
}
EOF
```

Update this entity:
```
$ curl http://localhost:1026/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X PUT -d 27
```

Connect to the DB:
```
$ mongo localhost
> show dbs
```


