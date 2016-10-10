
Orchestrator
============

The selected orchestrator is DEIS.
DEIS is installed on top of Kubernetes, itself installed on OpenStack.

Installation
------------

#On a local PC#
We will execute DEIS using Vagrant.
It requires a relatively powerful PC.

Follow the instructions at http://docs.deis.io/en/latest/installing_deis/vagrant/
Then at http://docs.deis.io/en/latest/installing_deis/install-platform/#install-deis-platform
Taking care of executing the instructions in the "Note" boxes for vagrant.

#In a Cloud#
The supported IaaS is OpenStack.

Start 2 VM m1.large with names "kube-master" and "kube-worker1".

Edit kube-master file /etc/hosts:
```
127.0.0.1 localhost kube-master
<worker-IP> kube-worker1
```
Do the same on kube-worker1.

Edit /etc/dhcp/dhcpclient.conf and add:
```
prepend domain-name-servers 8.8.8.8, 8.8.8.4;
```

Follow the instructions at: http://kubernetes.io/docs/getting-started-guides/kubeadm/

Init the master with:
```
kubeadm init --api-advertise-addresses=<master floating IP>
```

copy the file kubelet.conf to your own machine to get access to the cluster:
```
$ ssh ubuntu@<masterIP>
$ sudo cp /etc/kubernetes/kubelet.conf /home/ubuntu/
$ sudo chown ubuntu.ubuntu /home/ubuntu/kubelet.conf
Exit master: Ctrl-D
$ scp ubuntu@<masterIP>:~/kubelet.conf .
mv kubelet.conf ~/.kube/config
```


Pushing an application
----------------------

Register with the platform:
```
deis register http://deis.waziup.io:30378
deis keys:add ~/.ssh/id_deis.pub
```

Download the application and associate it with deis:
```
$ git clone https://github.com/deis/example-go.git
$ cd example-go
$ deis create
```

We need to change the NodePort of the builder, as shown in the describe command:
```
kubectl --namespace=deis describe svc deis-router
git remote remove deis
git remote add waziup ssh://git@deis-builder.waziup.io:30235/vanity-magician.git
```

Push the application:
```
git push waziup master
```

Troubleshooting
---------------

Installing and removing the test app 'sock shop' in kubernetes currently leaves default deny network policy.
See annotations:
```
kubectl get ns default -o yaml
```
Remove annotations:
```
kubectl annotate namespace default net.beta.kubernetes.io/network-policy-
```
