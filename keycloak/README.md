Keycloak
========

Keycloak is in charge of access control on the Waziup platform.


Development
-----------


Retrieve a client token:
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq ".access_token"
```

Request permission from Keycloak:
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{ "permissions" : [ { "resource_set_name" : "MySensor", "scopes" : [ "view:sensors" ] }]}' "http://localhost:8080/auth/realms/waziup/authz/entitlement/api-server"
```
