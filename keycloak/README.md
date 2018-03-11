Keycloak
========

Keycloak is in charge of access control on the Waziup platform.


Development
-----------


Retrieve a client token:
```
TOKEN=`curl -X POST  -H "Content-Type: application/x-www-form-urlencoded" -d 'username=cdupont&password=password&grant_type=password&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`
```

Request one permission from Keycloak:
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{ "permissions" : [ { "resource_set_name" : "MySensor11", "scopes" : [ "sensors:view" ] }]}' "http://localhost:8080/auth/realms/waziup/authz/entitlement/api-server"
```

Get all permissions from Keycloak:
```
curl -H "Authorization: Bearer $TOKEN"  "http://localhost:8080/auth/realms/waziup/authz/entitlement/api-server" | jq .rpt -r | cut -d "." -f2 | base64 -d  | jq .authorization.permissions
```
