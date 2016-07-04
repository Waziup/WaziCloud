################## Kafka configuration ========================================================================
FROM anapsix/alpine-java

## Install or update the tools for managing kafka
RUN apk add --update unzip wget curl docker jq coreutils
## Set environment variables
ENV KAFKA_VERSION="0.10.0.0" SCALA_VERSION="2.11"
## Download and unzip Kakfa into /opt/ directory
ADD download-kafka.sh /tmp/download-kafka.sh
RUN /tmp/download-kafka.sh && tar xfz /tmp/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz -C /opt && rm /tmp/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz

#Create a volume for the service Kafka
VOLUME ["/kafka"]

##Set  the KAFKA_HOME
ENV KAFKA_HOME /opt/kafka_${SCALA_VERSION}-${KAFKA_VERSION}
ADD startkafka.sh  /usr/bin/startkafka.sh

## Start the services WildFly and kafka
CMD ["startkafka.sh"]


