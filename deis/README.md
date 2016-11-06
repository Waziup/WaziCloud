
DEIS
====

Waziup uses DEIS to provide a Platform as a Service layer.
DEIS allows end users to 'push' their program source code, which is compiled and deployed on Kubernetes.
DEIS is itself installed inside [Kubernetes](../kubernetes/INSTALL.md).

Installation
------------

#On a local PC#
If you want to experiment with Deis, you can execute it using Vagrant.
It requires a relatively powerful PC.

Follow the instructions at http://docs.deis.io/en/latest/installing_deis/vagrant/
Then at http://docs.deis.io/en/latest/installing_deis/install-platform/#install-deis-platform
Taking care of executing the instructions in the "Note" boxes for vagrant.

#In a Cloud#
DEIs will be installed in Kubernetes.
The instructions are [here](https://deis.com/docs/workflow/installing-workflow).

After fetching the deis-workflow, you need to edit the configuration for the Swift object storage:

```
$ helmc fetch deis/workflow-v2.8.0
$ edit deis/workflow-v2.8.0/tpl/generate_params.toml
$ cp deis/workflow-v2.8.0/tpl/generate_params.toml ~/.helmc/workspace/charts/workflow-v2.8.0/tpl/
$ helmc generate -x manifests workflow-v2.8.0
$ helmc install workflow-v2.8.0
```

Edit the generate_params.toml to add you OpenStack password.
The complete instructions for storage are [here](https://deis.com/docs/workflow/installing-workflow/configuring-object-storage/).

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



