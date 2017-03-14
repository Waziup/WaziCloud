
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
$ cd images/smsproxy
$ docker build -t waziup/smsproxy .
$ docker push waziup/smsproxy
$ cd ../../images/smsapp
$ docker build -t waziup/smsapp .
$ docker push waziup/smsapp
$ cd ../..
$ kubectl delete -f SMSServer.yaml
$ kubectl apply -f SMSServer.yaml 
```

