FROM jboss/keycloak

# Copy Waziup theme
RUN mkdir -p /opt/jboss/keycloak/themes/waziup/
COPY waziup /opt/jboss/keycloak/themes/waziup/

#Setup the realm
ADD waziup-realm.json /opt/jboss/keycloak/

ENTRYPOINT [ "/opt/jboss/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/opt/jboss/keycloak/waziup-realm.json"]

EXPOSE 8080 8443
