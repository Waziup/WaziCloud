FROM jboss/keycloak

#COPY keycloak.jks standalone.xml /opt/jboss/keycloak/standalone/configuration/ 
#COPY keycloak.jks /opt/jboss/keycloak/standalone/configuration/ 
RUN mkdir -p /opt/jboss/keycloak/themes/waziup/
COPY waziup /opt/jboss/keycloak/themes/waziup/

EXPOSE 8080 8443
