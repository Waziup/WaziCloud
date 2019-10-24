Keycloak
========

Keycloak is in charge of access control on the Waziup platform.


Development
-----------

*Database management*

Re-create the Keycloak DB:
```
mysql -u root -proot_password -h 127.0.0.1

$ drop database keycloak;
$ CREATE DATABASE keycloak CHARACTER SET utf8 COLLATE utf8_unicode_ci;
$ GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak'@'%';
```
This should allow Keycloak to restart fresh.


*Tokens*

Retrieve a user token:
```
USERTOKEN=`curl -X POST  -H "Content-Type: application/x-www-form-urlencoded" -d 'username=cdupont&password=password&grant_type=password&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`
```

Retrieve a client token:
```
CLIENTTOKEN=`curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`
```

*Resources*

Create a resource:
```
curl -X POST "http://localhost:8080/auth/realms/waziup/authz/protection/resource_set" -H "Authorization: Bearer $CLIENTTOKEN" -H "Content-Type: application/json" -d '{"name":"Sensortest3", "scopes":["devices:view","devices:update","devices:delete"],"owner":"cdupont", "ownerManagedAccess": true}'
```

Read resources:
```
curl -X GET "http://localhost:8080/auth/realms/waziup/authz/protection/resource_set?name=" -H "Authorization: Bearer $CLIENTTOKEN"
```

*Permissions*

Get a permission:
```
curl -X POST http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token -H "Authorization: Bearer $USERTOKEN" -d "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=api-server&permission=ce023344-a01e-4d3c-8ba8-dc626e088dfd#sensors:view" | jq .access_token -r | cut -d "." -f2 | base64 -d | jq ".authorization.permissions"
```

Get all permissions:
```
curl -X POST http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token -H "Authorization: Bearer $USERTOKEN" -d "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=api-server&permission=#devices:view&response_mode=permissions"
```

*UMA*

```
curl http://localhost:8080/auth/realms/waziup/authz/protection/uma-policy/d157a5d7-389c-4418-8c0e-67539ef052b2 -H "Authorization: Bearer $USERTOKEN"
```


USERTOKEN=`curl -X POST  -H "Content-Type: application/x-www-form-urlencoded" -d 'username=cdupont&password=password&grant_type=password&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`; curl -v -X POST http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token -H "Authorization: Bearer $USERTOKEN" -d "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=api-server&permission=#sensors:view&response_mode=permissions" | jq


*Users*
```
curl -X GET "http://localhost:8080/admin/realms/waziup/users" -H "Authorization: Bearer $CLIENTTOKEN" -v
```

