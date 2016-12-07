
Broker history test
===================


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

Orion needs to inform Cygnus each time something changes with this entity.
So we create a subscription on the updates in Orion:
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

Update this entity, to have a new data point in the database:
```
$ curl http://localhost:1026/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X PUT -d 27
```

Start the broker history API:
```
cd history
docker run -t --net=host waziup/brokerhistory
```

Perform a test query:
```
curl -S -s 'http://127.0.0.1:8080/?colName=sth_/TEST_Sensor1_SensingDevice'

[
  {
    "_id": "58402ede2ab79c00079ae256",
    "recvTime": "2016-12-01T14:08:24.508Z",
    "attrName": "temperature",
    "attrType": "Number",
    "attrValue": "23"
  },
  {
    "_id": "58402f262ab79c00079ae257",
    "recvTime": "2016-12-01T14:09:37.413Z",
    "attrName": "temperature",
    "attrType": "Number",
    "attrValue": "27"
  }
]
```


