
SMS REST API
===============

This folder contains the SMS API of WAZIUP.

Install [swagger-codegen](https://github.com/swagger-api/swagger-codegen).

To view the API capbalilities visit:

http://petstore.swagger.io/?url=https://raw.githubusercontent.com/Waziup/Platform/master/UIManager/SMS/swagger.json


Here's a sample CURL to send a Test sms. Change the Phone number and message to suit

```
$ curl -X POST -H "Content-Type: application/json" -H "Api-Token: 53fdb4b2-0ad4-4767-99ea-2271f16f6f1d" -H "Cache-Control: no-cache" -d '{
  "sender_id" : "WAZIUP",
  "contacts" : ["+233262500105" , "+393806412093"],
    "message" : "Pond 1 temperature reading of 32 degrees at 13:00 GMT"
}' "http://api.waziup.io/v1/sms/send"
```

Here is another example showing how to send a sensor data point to Waziup:
```
curl --request POST  
     --url http://sms2.waziup.io/v1/sms/receive
     --header 'cache-control: no-cache'
     --header 'content-type: application/x-www-form-urlencoded'
     --header 'postman-token: 38acc026-68fd-5bb8-d91f-9983994a0c7f'
     --data 'From=%2B233262500105&Text=SensorData%20Sensor1%20temperature%2027'
```


## Install on Kubernetes

```
$ docker build -t waziup/smsapp .
$ docker push waziup/smsapp
$ cd manifests
$ kubectl apply -f smsdb.yaml
$ kubectl apply -f smsapp.yaml 
```

