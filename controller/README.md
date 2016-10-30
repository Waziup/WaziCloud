Waziup controller
=================


Install
-------

You can start directly the controller on your local PC with:
```
$ python3.4 waziupctrl/ctrl.py
```

To dockerize it:
```
$ cd platform/controller
$ sudo docker build -t waziup/controller ..
$ docker push waziup/controller
```
At this stage you can also test the container on your local PC:

```
$ docker run -p 33333:8080  waziup/controller
```
Test with:
```
$ nc -v locahost 33333
```
Stop the container:
```
docker stop $(docker ps -q --filter ancestor=waziup/controller) --time=0
```

Upload to Waziup platform:
```
$ docker push waziup/controller
$ cd controller/
$ kubectl delete -f controller.yaml --now
$ kubectl apply -f controller.yaml
```
