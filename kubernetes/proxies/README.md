
WAZIUP Proxies
==============

The Waziup platform contains several proxies:
- A front-end proxy VM,
- A ingress controller in Kubernetes,
- A router in DEIS.


Front-end proxy
---------------

Boot a tiny VM in OpenStack, running Ubuntu.
Log in the VM and type:

```
$ sudo apt-get install haproxy
$ mv /etc/haproxy/haproxy.cfg{,.original}
```
Copy the content of the haproxy.cfg file from this folder in /etc/haproxy/haproxy.cfg
Restart the proxy:
```
sudo service haproxy restart
```



Kubernetes Ingress Controller
-----------------------------

The Ingress Controller allows to give kubernetes services externally-reachable urls.
This folder contains the ingress controller necessary to run on top of OpenStack.
They need to be applied in kubernetes to create the ingress controller:

```
kubectl apply -f <file>
```


In OpenStack, a Load Balancer need to be created, pointing on the port of the ingress controller.
