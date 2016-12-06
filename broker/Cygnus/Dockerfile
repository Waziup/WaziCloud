FROM fiware/cygnus-ngsi

# Environment variables
ENV CYGNUS_MONGO_HOSTS "brokerdb:27017"
ENV CYGNUS_MONGO_USER ""
ENV CYGNUS_MONGO_PASS ""

# Copy some files needed for starting cygnus-ngsi
#COPY docker/cygnus-ngsi/cygnus-entrypoint.sh /
COPY agent.conf ${FLUME_HOME}/conf/


