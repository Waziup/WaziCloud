
Kubernetes and OpenStack
========================

In Waziup, OpenStack is used as the infrastructure virtualization mechanism (Infrastructure as a Service).
OpenStack provides and manages the Virtual Machines in which Kubernetes is running.
Kubernetes is used to provide the container orchestrator infrastructure (Container as a Service).


OpenStack Installation
----------------------

This section describes how to configure 2 VMs for Kubernetes.
Start 2 VM m1.large with names "kube-master" and "kube-worker1".

Edit kube-master file /etc/hosts:
```
127.0.0.1 localhost kube-master
<worker-IP> kube-worker1
```
Edit /etc/dhcp/dhclient.conf and add:
```
prepend domain-name-servers 8.8.8.8, 8.8.8.4;
```
Do the same on kube-worker1. You should be able to ping google.com and each-other VMs by name.

Storage
-------

Create two volumes in OpenStack, and attach them to each VMs.
Mount them in the VMs:
```
sudo mkdir /mnt/vol
sudo mount /dev/vdb /mnt/vol
```


Kubenetes installation
----------------------

Follow the instructions at: http://kubernetes.io/docs/getting-started-guides/kubeadm/

Init the master with:
```
kubeadm init --api-advertise-addresses=<master floating IP>
```

Don't forget to install a pod network (e.g. Weave network) and to *taint* the master.

copy the file kubelet.conf to your own machine to get access to the cluster:
```
$ ssh ubuntu@<masterIP>
$ sudo cp /etc/kubernetes/kubelet.conf /home/ubuntu/
$ sudo chown ubuntu.ubuntu /home/ubuntu/kubelet.conf
Exit master: Ctrl-D
$ scp ubuntu@<masterIP>:~/kubelet.conf .
$ mv kubelet.conf ~/.kube/config
```

Next, install the [proxies](proxies/README.md).

Also install the kubernetes dashboard.

Troubleshooting
---------------

See annotations:
```
kubectl get ns default -o yaml
```
Remove annotations:
```
kubectl annotate namespace default net.beta.kubernetes.io/network-policy-
```

Kill/restart DEIS pods:
```
kubectl scale
```


