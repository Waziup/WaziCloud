This folder contains the ingress controller necessary to run on top of OpenStack.

They need to be applied in kubernetes to create the ingress controller:

```
kubectl apply -f <file>
```

In OpenStack, a Load Balancer need to be created, pointing on the port of the ingress controller.
