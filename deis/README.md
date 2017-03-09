
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
$ helmc repo add deis https://github.com/deis/charts
$ cd platform/deis
$ helmc fetch deis/workflow-v2.8.0
```

Edit the file workflow-v2.8.0/tpl/generate_params.toml to add you OpenStack password.
The complete instructions for storage are [here](https://deis.com/docs/workflow/installing-workflow/configuring-object-storage/).

```
$ cp workflow-v2.8.0/tpl/generate_params.toml ~/.helmc/workspace/charts/workflow-v2.8.0/tpl/
```

Waziup platform does not currently support external LoadBalancer (see corresponding issue on github), so you need to copy the deis-router-service from Waziup:
```
$ cp workflow-v2.8.0/manifests/deis-router-service.yaml ~/.helmc/workspace/charts/workflow-v2.8.0/manifests
```

Generate and install:
```
$ helmc generate -x manifests workflow-v2.8.0
$ helmc install workflow-v2.8.0
```

Check your deployement with:

```
kubectl get pods -n deis -w
```

Pushing an application
----------------------

Install Deis client:
```
$ curl -sSL http://deis.io/deis-cli/install-v2.sh | bash
$ sudo ln -fs $PWD/deis /usr/local/bin/deis
```

Register with the platform:
```
deis register http://deis.waziup.io
deis keys:add ~/.ssh/<your public key>
```

Download the application and associate it with deis:
```
$ git clone https://github.com/deis/example-go.git
$ cd example-go
$ deis create
```

Push the application:
```
git push waziup master
```

API
---

As an example, here is how to retrieve the list of applications:

Register:
```
$ curl http://deis.waziup.io/v2/auth/register/ -s -S --header 'Content-Type: application/json' -X POST -d @- <<EOF
{"username": "ttt", "password": "test", "email": "c@c.com"}
EOF
```

Login and get token:
```
$ curl http://deis.waziup.io/v2/auth/login/ -s -S --header 'Content-Type: application/json' -X POST -d @- <<EOF
{"username": "ttt", "password": "test"}
EOF

{"token":"0321d7f462380b2c968acbf0785d2485a0dd58a9"}
```

Get list of apps:
```
$ curl http://deis.waziup.io/v2/apps --header 'Authorization: token 0321d7f462380b2c968acbf0785d2485a0dd58a9' | jq "."

  [ 
    {
      "uuid": "858e9b3f-0910-40df-8321-3946afd5dbc9",
      "id": "app1",
      "owner": "ousmaneo",
      "structure": {},
      "created": "2016-12-15T12:50:53Z",
      "updated": "2017-03-04T23:42:55Z"
    },
    {
      "uuid": "3b21f10f-a72c-4f1b-94c8-5597aeab4007",
      "id": "app2",
      "owner": "ousmaneo",
      "structure": {},
      "created": "2016-12-15T13:28:40Z",
      "updated": "2017-03-04T23:42:55Z"
    }
  ]
```
For example, the app named "app1" should be available on `app1.waziup.io`.


Troubleshooting
---------------

Removing DEIS:
```
kubectl delete ns deis
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_database'
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_registry'
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_builder'
```
