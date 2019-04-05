
Facebook demo with Orion
========================

This demo shows how to use Orion to send a notification containing the sensor data.

#### Create notification on Orion

If the sensor WS_UPPA_Sensor2 is not existing, create it:

```
$ curl localhost:1026/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath:/UPPA/TESTS' --header 'Fiware-Service:watersense' -X POST -d @- <<EOF
{
  "id": "WS_UPPA_Sensor2",
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
  "SM1": {
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

Register a notification with Facebook:

```
curl localhost:1026/v2/subscriptions -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Fiware-Service:watersense' --header 'Fiware-ServicePath:/UPPA/TESTS' -d @- <<EOF
{
  "description": "A subscription to get info about WS_UPPA_Sensor2",
  "subject": {
    "entities": [
      {
        "id": "WS_UPPA_Sensor2",
        "type": "SensingDevice"
      }
    ],
    "condition": {
      "attrs": [
        "SM1"
      ],
      "expression" : {
        "q": "SM1>400"
      }
    }
  },
  "notification": {
    "httpCustom": {
      "url": "https://graph.facebook.com/v2.6/me/messages",
      "qs": {
         "access_token": "EAAIcoXbuoZBgBAP6nNZCLbCTfZCZBkbWZBCr579lga0gLPQWsWyfvaywxmUZBPXqkF3L97v3IFM1I3ODZBUgfQx77YUWqYWggngxLRzSr27cL8f42zDZCLGHu4u9IeCw1IbjhZBe0mbOCbBEfAH6QJYxt2LdxUVgM4LEWubnEJ9PTDS1uOnON9k53xIpSzsHwf6sZD"
      },
      "headers": {
         "Content-type": "application/json"         
      },
      "method": "POST",
      "payload": "{ %22recipient%22: { %22phone_number%22:%22+22670979788%22 }, %22message%22: {%22text%22:%22Waziup: humidity too high: \${id} value is \${SM1}%22}}"
    },
    "attrs": [
      "SM1"
    ]
  },
  "expires": "2040-05-24T20:00:00.00Z",
  "throttling": 5
}
EOF
```

