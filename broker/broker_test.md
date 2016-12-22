
Broker test
===========

Create one entity :

```
$ curl http://broker.waziup.io/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X POST -d @- <<EOF
{
  "id": "Room1",
  "type": "Room",
  "humidity": {
    "value": 720,
    "type": "Number"
  }
}
EOF
```
Orion needs to inform Cygnus each time something changes with this entity.
lo we create a subscription on the updates in Orion:

```
(curl broker.waziup.io/v1/subscribeContext -s -S --header 'Content-Type: application/json' \
--header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' -d @- | python -mjson.tool) <<EOF
{
    "entities": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Room1"
        }
    ],
    "attributes": [
        "humidity"
    ],
    "reference": "http://cygnus:5050/notify",
    "duration": "P1M",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "humidity"
            ]
        }
    ],
    "throttling": "PT1S"
}
EOF
```

Update the entity, to have a new data point in the database:
```
$ curl http://broker.waziup.io/v2/entities/Room1/attrs/humidity/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X PUT -d 800
```

Requesting raw data :
```
$ curl -s -S --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' \
'http://brokerhistory.waziup.io/STH/v1/contextEntities/type/Room/id/Room1/attributes/humidity?hLimit=3&hOffset=0&dateFrom=2016-12-01T00:00:00.000Z&dateTo=2019-12-19T23:59:59.999Z'
```
Requesting aggregated data :
```
$ curl -s -S --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' \
'http://brokerhistory.waziup.io/STH/v1/contextEntities/type/Room/id/Room1/attributes/humidity?aggrMethod=sum&aggrPeriod=second&dateFrom=2016-06-12T00:00:00.873Z&dateTo=2019-06-12T23:59:59.873Z'
```
