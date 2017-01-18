Identity manager
================

The identity manager is in charge of access control on the Waziup platform.
The technology selected is Keycloak.

Install
-------


```
docker --tls=false --tlsverify=false build -t waziup/identityproxy -f ./Dockerfile --rm=true .
docker build -t waziup/identityproxy .
sudo docker build -t waziup/identityproxy -f ./Dockerfile .
docker login
docker push waziup/identityproxy
kubectl delete -f identityproxy.yaml
kubectl apply -f identityproxy.yaml
```

Misc:

kubectl cp --namespace=waziup ./keycloak-test.conf identityproxy-17r6c:/etc/httpd/conf.d/
kubectl exec -ti identityproxy-17r6c --namespace=waziup --  /usr/sbin/httpd -k restart
kubectl exec -ti identityproxy-17r6c --namespace=waziup --  cat /etc/httpd/conf.d/keycloak-test.conf


KeyCloak Backup & Recovery:
bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=
kubectl exec -ti aam-wtjt4 --namespace waziup -- /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/home
kubectl exec -ti aam-wtjt4 --namespace waziup -- /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/home
bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=
