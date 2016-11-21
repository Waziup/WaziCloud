
SMS REST API
===============

This folder contains the SMS API of WAZIUP.

Install [swagger-codegen](https://github.com/swagger-api/swagger-codegen).

To view the API capbalilities visit:

http://petstore.swagger.io/?url=https://raw.githubusercontent.com/Waziup/Platform/master/UIManager/SMS/swagger.json


Here's a sample CURL to send a Test sms. Change the Phone number and message to suit

```curl -X POST -H "Content-Type: application/json" -H "Api-Token: 53fdb4b2-0ad4-4767-99ea-2271f16f6f1d" -H "Cache-Control: no-cache" -H "Postman-Token: d424994b-27dd-1f5a-4151-a8b2aa0ac22b" -d '{
"sender_id" : "WAZIUP",
"contacts" : ["+233262500105"],
  "message" : "Testing"
}' "https://messaging.mergdata.com/api/v1/sms/send"```


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

