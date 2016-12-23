
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


## Install on Kubernetes

```
$ cd images/nginx
$ docker build -t waziup/smsnginx .
$ docker push waziup/smsnginx
$ cd ../../images/php
$ docker build -t waziup/smsphp .
$ docker push waziup/smsphp
$ cd ../..
$ kubectl delete -f SMSServer.yaml
$ kubectl apply -f SMSServer.yaml 
```

