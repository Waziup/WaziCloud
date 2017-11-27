FROM jboss/keycloak:3.4.0.Final

# Copy Waziup theme
RUN mkdir -p /opt/jboss/keycloak/themes/waziup/
COPY waziup /opt/jboss/keycloak/themes/waziup/

#Setup the realm
ADD waziup-realm.json /opt/jboss/keycloak/

EXPOSE 8080 8443
