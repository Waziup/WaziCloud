Broker History API
==================

This API allows to retrieve the history of sensor measurements.

Install
-------

Copy these files below in the same folder : 
--------
- history.js (all history data)
- id_history.js (history for an entity)
- package.json
- Dockerfile


Type these two commands for building the image :
-------
```
$ docker build -t waziup/brokerhistory .
$ docker push waziup/brokerhistory
$ docker run -t waziup/brokerhistory

```
Querying historical data ...
-------
Parameters : 
- dbName (name of the database to connect), 
- colName (Name of the collection) 
- id 

Example of a HTTP request : http://127.0.0.1:8081/?id=457845487848784&colName=sth/_Room1_Room&dbName=sth_waziupdb
