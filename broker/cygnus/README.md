
Cygnus
======

Cygnus is used as an Orion subscriber and data sink, in order to save historical data into MongoDB.


Install
-------

Install cygnus by either using Dockerfile, or by getting the cygnus image from the Waziup repository.

```
$ docker build -t waziup/cygnus .
$ docker push waziup/cygnus
$ kubectl apply -f cygnus.yaml
```

