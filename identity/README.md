Identity manager
================

Identity Manager
The identity manager is in charge of access control on the Waziup platform.
The identity manager consists of two services: the identity proxy and Keycloak. 

Identity proxy is an apache Web server that is acting as a proxy to several services of Waziup.
This apache is using [a module](https://github.com/pingidentity/mod_auth_openidc/) that connects with KeyCloak.
The purpose of this connection is that Apache validates users access to services with the help of KeyCloak.


Cloud Install
-------------

First install KeyCloack:
```
cd keycloak
docker build -t waziup/keycloak .
docker push waziup/keycloak
kubectl delete -f aam.yaml
kubectl apply -f aam.yaml
```

Then install the identity proxy:
```
cd proxy
docker build -t waziup/identityproxy .
docker push waziup/identityproxy
kubectl delete -f identityproxy.yaml
kubectl apply -f identityproxy.yaml
```


Development
-----------

KeyCloak Backup & Recovery:
bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=
kubectl exec -ti aam-wtjt4 --namespace waziup -- /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/home
kubectl exec -ti aam-wtjt4 --namespace waziup -- /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/home
bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=

kubectl apply -f aam-proxy.yam

mod_auth_openidc is an authentication/authorization module for the Apache 2.x HTTP server that authenticates users against an OpenID Connect Provider.
It can also function as an OAuth 2.0 Resource Server, validating access tokens presented by OAuth 2.0 clients against an OAuth 2.0 Authorization Server.
In particular, this proxy has not be used for services in which does not provide OAuth functionality, such as Orion, Kubernetes UI, etc.
For instance, we have secured access to Waziup dashboard through with apache proxy first; so when users were accessing dashboard.waziup.io for the first time, they were redirected to KeyCloak for username/password; but then when dashboard has used KeyCloak adaptor (JavaScript adaptor) to integrate itself with KeyCloak, we have removed this requirement from identity proxy, because it was not required anymore to use identity proxy (mod_auth_openidc) for authentication.

See identityproxy.conf for apache configuration providing VirtualHost entries for Waziup services that need to be secured by mod_auth_openidc and KeyCloak. The ServerName in each VirtualHost should match the corresponding Ingress endpoint for a Waziup service. e.g. for orion it is orion.waziup.io.
Currently, we have not secured access to Orion, but the entry is there. However, we have secured Web-based access to Kubernetes UI. We have secured access to dashboard.waziup.io, but then we have removed because dashboard itself has used KC Javascript adaptor.


Selected Container Image:
We have had difficulty with Apache image from Centos. We were not able to run a container out of this Docker image reliably. This was mainly due to a problem with Apache that was handling signal wrongly and container were stopping. In order to resolve this problem, we have used -i -d option in docker run, and have ran the container from docker pull solsson/httpd-openidc. Then, we have used "docker exec" to add identityproxy.conf file into the container. So we were making necessary changes we have needed for our identity proxy. And at the end we have commited the container as a new image as  "docker commit --message="xx" ContainerID waziup/oidc:siris. Because apache configuration was specific to our SIRIS installation of Waziup we have named it as waziup/oidc:siris. For AWS deployment, we need to create another image named waziup/oidc:aws, and make necessary changes in identityproxy.conf.

docker pull solsson/httpd-openidc
https://hub.docker.com/r/solsson/httpd-openidc/
    - name: identityproxy
        image: waziup/oidc:siris

Misc commands to make necessary changes to identityproxy container, add identityproxy.conf, see the log, etc.

kubectl cp --namespace=waziup ./keycloak-test.conf identityproxy-17r6c:/etc/httpd/conf.d/
kubectl exec -ti identityproxy-17r6c --namespace=waziup --  /usr/sbin/httpd -k restart
kubectl exec -ti identityproxy-17r6c --namespace=waziup --  cat /etc/httpd/conf.d/keycloak-test.conf
kubectl exec -ti identityproxy-17r6c --namespace=waziup --  cat /var/log/httpd/error_log

Kubernetes Deployment File:
identityproxy.yaml contains the Kubernetes deployment file. The ingress resource is as the following. As you can see there is not dashboard.waziup.io here, because we don't need to pass dashboard through identity proxy. That's it for the moment.

kind: Ingress
metadata:
  name: identityproxy
  namespace: waziup
spec:
  rules:
  - host: cloudplatform.waziup.io
    http:
      paths:
      - backend:
          serviceName: identityproxy
          servicePort: 80
  - host: orion.waziup.io
    http:
      paths:
      - backend:
          serviceName: identityproxy
          servicePort: 80
  - host: app.waziup.io
    http:
      paths:
      - backend:
          serviceName: identityproxy
          servicePort: 80
  - host: sms.waziup.io
    http:
      paths:
      - backend:
          serviceName: identityproxy
          servicePort: 80

KeyCloak configuration:

Similarly, we have ran a container from jboss/keycloak, and added Waziup themes to KeyCloak container, and enabled SSL for KeyCloak, and created an image from running container as waziup/keycloak:https2. This operations have been done with docker exec, and docker commit.

Kubernetes Deployment File:
    spec:
      containers:
      - name: aam
        image: waziup/keycloak:https2
        ports:
        - containerPort: 8080
        env:
        - name: KEYCLOAK_USER 
          value: "admin"
        - name: KEYCLOAK_PASSWORD 
          value: "KCadminW"
        volumeMounts:
        - mountPath: /opt/jboss/keycloak/standalone/data
          name: vol
      volumes:
      - name: vol
        hostPath:
          path: /mnt/vol



kubectl -n waziup exec identityproxy-ykb2t cat conf/extra/identityproxy.conf
kubectl -n waziup exec identityproxy-ykb2t ls 


docker commit --message='copied waziup image' eddc23cf9f213c6ca158ae529a184f48831aeed62dd422522b596744847b8c6a waziup/keycloak:https2

