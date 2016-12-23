Identity manager
================

The identity manager is in charge of access control on the Waziup platform.
The technology selected is Keycloak.

Install
-------


```
docker build -t waziup/identityproxy .
docker push waziup/identityproxy
kubectl delete -f identityproxy.yaml
kubectl apply -f identityproxy.yaml
```

