
Field data model
================

This document details the data formats and protocols that will be used in WaterSense.


Sensor formats
--------------

The sensor data format will be the same than in Waziup.
https://github.com/Waziup/Platform/blob/master/broker/broker_spec.md#waziup-data-model

Field format
------------

```
{
  "id": "<FieldID>",
  "type": "Field",
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Polygon",
      "coordinates": [[
        <latitude>,
        <longitude>
      ]]
    }
  },
  "owner": {
    "type": "String",
    "value": "<owner>"
  },
  "humidity": {
    "type": "Percent",
    "value": 23,
    "metadata": {
      "timestamp": {
        "type": "DateTime",
        "value": "<dateTime>"
      },
      "unit": {
        "type": "string",
        "value": "Percent"
      }
    }
  }
}
```

- FieldID is the name of the field.
- latitude and longitude are coordinates on earth in decimal notation (e.g. "40.418889").
- the polygon coordinates is a list of pair (latitude, longitude), representing the shape of the field.
- owner is the field owner. By convention it is the user name in Keycloak.
- humidity is the average humidity measured in the field, as reported by the sensors.
- dateTime is the date and time at which the measurements has been taken. It is in ISO 8601 format: YYY-MM-DDThh:mm:ss.00Z
- Unit is a humidity percentage:
  - 0% is humidity in air
  - 100% is humidity in water



Here is a valid example of field:
```
{
  "id": "Field1",
  "type": "Field",
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Polygon",
      "coordinates": [
      [
        14.52839,
        35.89389
      ],
      [
        14.62839,
        35.89389
      ],
      [
        14.62839,
        35.99389
      ],
      [
        14.52839,
        35.99389
      ]
    }
  },
  "owner": {
    "type": "String",
    "value": "cdupont",
    "metadata": {}
  },
  "humidity": {
    "type": "Percent",
    "value": 50,
    "metadata": {
      "timestamp": {
        "type": "DateTime",
        "value": "2016-06-08T18:20:27.00Z"
      },
      "unit": {
        "type": "string",
        "value": "Percent"
      }
    }
  }
}
```
