
Broker test
===========

This document contains the procedures to test the Waziup broker.
To perform the tests, copy the commands given in a shell one by one, and check the result given.

Note: thoses tests are for the online instance of the Waziup platform.
To perform local tests, start the broker with: `docker-compose up`.
You can then perform the tests replacing `broker.waziup.io` with `localhost:1026` and `brokerhistory.waziup.io` with `localhost:8666`.

Entity creation
---------------

This command creates one entity called "Sensor1", which have the temperature measured.

```
$ curl broker.waziup.io/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X POST -d @- <<EOF
{
  "id": "Sensor1",
  "type": "SensingDevice",
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [
        14.52839,
        35.89389
      ]
    }
  },
  "owner": {
    "type": "String",
    "value": "cdupont",
    "metadata": {}
  },
  "temperature": {
    "type": "Number",
    "value": 23,
    "metadata": {
      "timestamp": {
        "type": "DateTime",
        "value": "2016-06-08T18:20:27.00Z"
      },
      "unit": {
        "type": "string",
        "value": "Celsius"
      }
    }
  }
}
EOF
```

There should be no result output for this command. If the entity already exists, the result will be:
```
{"error":"Unprocessable","description":"Already Exists"}
```

Insert datapoint
----------------

If the value measure changes for the entity, we need to update it in Orion.
With the following command we update the value of the temperature of the sensor to 19:

```
$ curl broker.waziup.io/v2/entities/Sensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' --header 'Fiware-ServicePath: /TEST' --header 'Fiware-Service: waziup' -X PUT -d 19
```
If the command succeeds, there will be no output result.

Entity subscription
-------------------

In order to collect historical data on an entity, we need to register a subscription in Orion.
This subscription will make Orion to inform Cygnus each time something changes with this entity.

```
$ (curl broker.waziup.io/v1/subscribeContext -s -S --header 'Content-Type: application/json' \
--header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' -d @- | python -mjson.tool) <<EOF
{
    "entities": [
        {
            "type": "SensingDevice",
            "isPattern": "false",
            "id": "Device_6"
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

Result should be:
```
{
    "subscribeResponse": {
        "duration": "P1M",
        "subscriptionId": "58c7fe6b43cdafd490d9217f",
        "throttling": "PT1S"
    }
}
```




Historical data
---------------

The Waziup broker is able to deliver historical data.
Here is the command to request the last 5 data point for the temperature of the entity "Sensor1".

```
$ curl -s -S --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' \
'http://brokerhistory.waziup.io/STH/v1/contextEntities/type/SensingDevice/id/Sensor1/attributes/temperature?lastN=5'

```

Expected result (if you followed all the commands above):
```
{"contextResponses":[{"contextElement":{"attributes":[{"name":"temperature","values":[{"recvTime":"2017-03-14T14:30:22.213Z","attrType":"Number","attrValue":"19"},{"recvTime":"2017-03-14T16:17:32.301Z","attrType":"Number","attrValue":"19"}]}],"id":"Sensor1","isPattern":false,"type":"SensingDevice"},"statusCode":{"code":"200","reasonPhrase":"OK"}}]}

```

Here is the command to request the data point for the temperature of the entity "Sensor1", between the dates 2016-12-01 and 2019-12-19:

```
$ curl -s -S --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' \
'http://brokerhistory.waziup.io/STH/v1/contextEntities/type/SensingDevice/id/Sensor1/attributes/temperature?hLimit=3&hOffset=0&dateFrom=2016-12-01T00:00:00.000Z&dateTo=2019-12-19T23:59:59.999Z'

```

Expected result: same as above.


Requesting aggregated data :
```
$ curl -s -S --header 'Accept: application/json' --header 'Fiware-Service: waziup' --header 'Fiware-ServicePath: /TEST' \
'http://brokerhistory.waziup.io/STH/v1/contextEntities/type/SensingDevice/id/Sensor1/attributes/temperature?aggrMethod=sum&aggrPeriod=second&dateFrom=2017-06-12T00:00:00.873Z&dateTo=2019-06-12T23:59:59.873Z'

```
