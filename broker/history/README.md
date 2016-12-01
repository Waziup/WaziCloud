Broker History API
==================

This API allows to retrieve the history of sensor measurements.

Install
-------

Build the image:

```
$ docker build -t waziup/brokerhistory .
$ docker run -t --net=host waziup/brokerhistory

```

Test
----

Querying historical data:

Parameters : 
- colName (Name of the collection) 
- dbName (Name of the database to connect, optional), 

Example of a HTTP request: 
```
$ curl -S -s 'http://127.0.0.1:8080/?colName=sth_/TEST_Sensor1_SensingDevice'

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
