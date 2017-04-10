
SMS to SMS demo
===============

This demo shows how to use Orion to:
- Receive data through SMS from sensors
- update data on Waziup dashboard
- send a notification containing the sensor data

Step 1: Create notification on Orion
------------------------------------

```
curl broker.waziup.io/v2/subscriptions -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Fiware-Service:waziup' --header 'Fiware-ServicePath:/UPPA' -d @- <<EOF
{
  "description": "A subscription to get info about Sensor10",
  "subject": {
    "entities": [
      {
        "id": "Sensor10",
        "type": "SensingDevice"
      }
    ],
    "condition": {
      "attrs": [
        "TC"
      ]
    }
  },
  "notification": {
    "httpCustom": {
      "url": "http://sms2.waziup.io/v1/sms/send",
      "qs": {
        "contact": "+393806412093",
        "msg": "WAZIUP:%20\${id}%20pond%20temperature%20exceeded:%20\${TC}%20C"
      }
    },
    "attrs": [
      "TC"
    ]
  },
  "expires": "2040-01-01T14:00:00.00Z",
  "throttling": 5
}
EOF
```

Step 2: Send a SMS with updated value 
-------------------------------------

Send this SMS: "SensorData Sensor10  TC 40 waziup /UPPA" to +15186760367

Result: you should reveice a SMS with the message "WAZIUP: Sensor10 pond temperature exceeded: 40 C"

Debug
-----

POST SMS with sensor data to Waziup SMS receiver:

```
curl -X POST http://sms2.waziup.io/v1/sms/receive -H 'cache-control: no-cache' -H 'content-type: multipart/form-data' -F 'From=+393806412093' -F 'Text=SensorData Sensor10  TC 40 waziup /UPPA' > t.html; firefox t.html
```


See value of Sensor10:
----------------------

```
curl http://broker.waziup.io/v2/entities/Sensor10  --header 'Fiware-ServicePath:/UPPA' --header 'Fiware-Service:waziup' -X GET | jq "." 
```

See the list of notifications
-----------------------------

```
curl broker.waziup.io/v2/subscriptions -s -S --header 'Fiware-Service:waziup' --header 'Fiware-ServicePath:/UPPA' | jq "."
```


Send one SMS:
-------------
```
curl -X POST -H "Cache-Control: no-cache" "http://sms2.waziup.io/v1/sms/send?contact='00393806412093'&msg='test'"
```





