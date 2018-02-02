Keycloak
========

Keycloak is in charge of access control on the Waziup platform.


Development
-----------

KeyCloak Backup & Recovery:
bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=
