#FROM jboss/keycloak:3.4.3.Final
FROM quay.io/keycloak/keycloak:6.0.0
#FROM pedroigor/keycloak:jdk8

# Copy Waziup theme
RUN mkdir -p /opt/jboss/keycloak/themes/waziup/
COPY waziup /opt/jboss/keycloak/themes/waziup/

#Setup the realm
COPY imports /opt/jboss/keycloak/imports

COPY standalone.xml /opt/jboss/keycloak/standalone/configuration/
COPY docker-entrypoint.sh /opt/jboss/tools/docker-entrypoint.sh

EXPOSE 8080

