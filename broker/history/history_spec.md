
Historical API end points
-------------------------

The Api mimics Orion end points, returning list of data points instead of single points.

Base end point:
```
http://api.waziup.io/v1/data/history
```

Get history of the value of a sensor:
```
http://api.waziup.io/v1/data/history/entities/Sensor1/attrs/temperature/value
```
Example result:
```
[(01/01/2017-16:30, 27), (01/01/2017-16:31, 28), (01/01/2017-16:32, 29)]
```
