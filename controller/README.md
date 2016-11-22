Waziup controller
=================

The controller presents an API to allow access to all internal Waziup components.

Install
-------

To dockerize it:
```
$ cd platform/controller
$ sudo docker build -t waziup/controller-proxy ..
$ docker push waziup/controller-proxy
```
Upload to Waziup platform:
```
$ kubectl delete -f controller-proxy.yaml --now
$ kubectl apply -f controller-proxy.yaml
```
