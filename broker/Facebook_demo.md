
Facebook demo
=============

This demo shows how to use Orion to send a notification containing the sensor data.

#### Create notification on Orion

If the sensor WS_UPPA_Sensor2 is not existing, create it:

```
$ curl broker.waziup.io/v2/entities -s -S --header 'Content-Type: application/json' --header 'Fiware-ServicePath:/UPPA/TESTS' --header 'Fiware-Service:watersense' -X POST -d @- <<EOF
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
curl broker.waziup.io/v2/subscriptions -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Fiware-Service:watersense' --header 'Fiware-ServicePath:/UPPA/TESTS' -d @- <<EOF
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

The authorization code is generated from the login and auth token from Plivo:
```
$ echo -n "MAMDA5ZDJIMDM1NZVMZD:NzRlNWJiNmU2MmFjYWJlODhlNTk3MTkyZGEzNzIy" | base64
TUFNREE1WkRKSU1ETTFOWlZNWkQ6TnpSbE5XSmlObVUyTW1GallXSmxPRGhsTlRrM01Ua3laR0V6TnpJeQ==
```

The payload field need to be URL-encoded:
```
$ urlencode "{ \"src\": \"00393806412092\", \"dst\": \"00393806412093\", \"text\": \"WaterSense: Field is too dry. \${id} humidity value is \${SM1} \"}"
%7B%20%22src%22%3A%20%2200393806412092%22%2C%20%22dst%22%3A%20%2200393806412093%22%2C%20%22text%22%3A%20%22WaterSense%3A%20Field%20is%20too%20dry.%20%24%7Bid%7D%20humidity%20value%20is%20%24%7BSM1%7D%20%22%7D
```



Debug
-----

*POST SMS with sensor data to Waziup SMS receiver:*

```
curl -X POST http://sms2.waziup.io/v1/sms/receive -H 'cache-control: no-cache' -H 'content-type: multipart/form-data' -F 'From=+393806412093' -F 'Text=SensorData Sensor10  TC 40 waziup /UPPA' > t.html; firefox t.html
```


*See value of Sensor10:*

```
curl http://broker.waziup.io/v2/entities/Sensor10  --header 'Fiware-ServicePath:/UPPA' --header 'Fiware-Service:waziup' -X GET | jq "." 
```

*See the list of notifications*

```
curl broker.waziup.io/v2/subscriptions -s -S --header 'Fiware-Service:waziup' --header 'Fiware-ServicePath:/UPPA' | jq "."
```

*Send one SMS:*
```
curl -X POST -H "Cache-Control: no-cache" "http://sms2.waziup.io/v1/sms/send?contact='00393806412093'&msg='test'"
```


curl -vvv -X POST http://localhost:10839/v1/Account/MAMDA5ZDJIMDM1NZVMZD/Message/ -L -H "Authorization: Basic TUFNREE1WkRKSU1ETTFOWlZNWkQ6WXpoaU5ESmpPRE5oTkRreE1qaGlZVGd4WkRkaE5qYzNPV1ZsTnpZMA==" -H 'Content-Type: application/json' -d '{"src":"00393806412092","dst":"00393806412093","text":"test"}'

curl -vvv -X POST https://api.plivo.com/v1/Account/MAMDA5ZDJIMDM1NZVMZD/Message/ -L -u MAMDA5ZDJIMDM1NZVMZD:YzhiNDJjODNhNDkxMjhiYTgxZDdhNjc3OWVlNzY0 -H 'Content-Type:application/json' -d @- <<EOF
{
   "src": "00393806412092",
   "dst": "00393806412093",
   "text": "test SMS from Waziup"
}
EOF

00923006581713 sohail
00923004075566 mehboob

