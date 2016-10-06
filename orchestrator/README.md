
Orchestrator
============

The selected orchestrator is DEIS.
DEIS is installed on top of Kubernetes, itself installed on OpenStack.

Installation
------------

On a local PC:
We will execute DEIS using Vagrant.
It requires a relatively powerful PC.

Follow the instructions at http://docs.deis.io/en/latest/installing_deis/vagrant/
Then at http://docs.deis.io/en/latest/installing_deis/install-platform/#install-deis-platform
Taking care of executing the instructions in the "Note" boxes for vagrant.

In a Cloud:
The supported IaaS is OpenStack.


Pushing an application
----------------------

Register with the platform:
```
deis keys:add ~/.ssh/id_deis.pub

deis register http://deis.waziup.io:31393
```

Download the application and associate it with deis:
```
$ git clone https://github.com/deis/example-go.git
$ cd example-go
$ deis create
```

We need to change the port of the builder:
```
kubectl --namespace=deis describe svc deis-router
git remote remove deis
git remote add waziup ssh://git@deis-builder.waziup.io:30235/vanity-magician.git
```

Push the application:
```
git push waziup master
```

