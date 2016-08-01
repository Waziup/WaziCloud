
Platform Controller spec
========================

The role of the Plaform Controller is to start and monitor all the components of the WAZIUP platform.
Additionally, it provides a comprehensive API that gives a single entry point for the platform.
The Platform Controller is an application with the name `waziup-ctrl`.


Running
-------

The following command will start the platform:

```
waziup-ctrl start --url=http://www.waziup.io --adminname=cdupont --adminpass=****
```

The platform will start with the given admin name and password.
All the platform components will be instanciated and the API will be listening on the URL `http://www.waziup.io`.


```
Usage: waziup-ctrl [-url=<ctrl-url>] [--adminname] [--adminpass]

Arguments:
<controller> is the address of the WAZIUP Cloud platform.

Options:
  --url=<ctrl-url>
    provide a url for the API.
  --adminname=<username>
    provide a username for the administrator.
  --adminpass=<password>
    provide a password for the administrator.
```


API
---

The Controller provides a REST API for accessing all the functionalities of WAZIUP.

All the API endpoints are of the form:
```
http://<ctrl-url>/<version>/<resource>/<subresource>?<param>=<value>&<param>=<value>
```

###apps

This API is basically wrapping the DEIS API.
See http://docs.deis.io/en/latest/reference/api-v1.7/ for the full details.

REST end point:
```
http://<ctrl-url>/<version>/apps

GET apps/: list of all owned applications
POST apps/: create an application
DELETE apps/example/: delete application "example"
GET apps/example/: get details of application "example"
POST apps/example/: update details of application "example"
PUT apps/example/: actions an application (deploy, scale)
GET apps/example/containers/: get all containers from a specific application
```

###gateways

REST end point:
```
http://<ctrl-url>/<version>/gateways

GET gateways/: list of all gateways
POST gateways/: connect a gateway
DELETE gateways/{gateway_id}: delete a gateway
GET gateways/{gateway_id}: list details of a gateway
GET gateways/{gateway_id}/sensors: list sensors of a gateway

```

###data
This API is wrapping FIWARE Orion REST API.
See http://fiware-orion.readthedocs.io/en/develop/user/walkthrough_apiv2/index.html


REST end point:
```
http://<ctrl-url>/<version>/data

Entities:

GET data/entities: list all the stored entities
GET data/entities/{entity_id}: get data from one entity
GET data/entities/{entity_id}/attrs/{attrName}: get atribute from one entity
PATCH data/entities/{entity_id}/attrs: update atributes from one entity
PUT data/entities/{entity_id}/attrs: replace attributes from one entity
PUT data/entities/{entity_id}/attrs/{attrName}: update atribute value from one entity

Subscriptions:

GET data/subscriptions: get all subscriptions
POST data/subscriptions: create a subscription
GET data/subscriptions/{subId}: get one subscription
PATCH data/subscription/{subId}: update one subscription
DELETE data/subscriptions/{subId}: remove one subscription
```

###users

REST end point:
```
http://<ctrl-url>/<version>/users

GET /v1/users: get the list of all users
```


Configuration
-------------

A configuration file allows to store the configuration of the platform for the next start.
The Controller will launch and configure the components of the platform using a Dockerfile.
The configuration contains:
- DEIS endpoint
- Orion endpoint
- gateway manager endpoint
- user manager endpoint
- database endpoint

