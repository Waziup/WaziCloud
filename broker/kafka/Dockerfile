################## Kafka configuration ========================================================================
FROM anapsix/alpine-java

## Install or update the tools for managing kafka
RUN apk add --update unzip wget curl docker jq coreutils
## Set environment variables
ENV KAFKA_VERSION="0.9.0.1" SCALA_VERSION="2.11"
## Download and unzip Kakfa into /opt/ directory
ADD download-kafka.sh /tmp/download-kafka.sh
RUN /tmp/download-kafka.sh && tar xfz /tmp/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz -C /opt && rm /tmp/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz
RUN tar xfz /tmp/apache-maven-3.3.9-bin.tar.gz -C /opt && rm /tmp/apache-maven-3.3.9-bin.tar.gz

#Create a volume for the service Kafka
VOLUME ["/kafka"]

##Set  the KAFKA_HOME and MAVEN_HOME for maven command
ENV KAFKA_HOME /opt/kafka_${SCALA_VERSION}-${KAFKA_VERSION}
ENV MAVEN_HOME /opt/apache-maven-3.3.9

#Add the script for broker management
ADD startkafka.sh   /usr/bin/startkafka.sh
ADD createtopic.sh  /usr/bin/createtopic.sh
ADD createdefaulttopic.sh  /usr/bin/createdefaulttopic.sh
ADD listtopic.sh  /usr/bin/listtopic.sh
ADD kafka-manager-1.3.1.6.zip  /opt

RUN unzip /opt/kafka-manager-1.3.1.6.zip -d /opt  && rm /opt/kafka-manager-1.3.1.6.zip

RUN  chmod +x /usr/bin/create*.sh 
RUN  chmod +x /usr/bin/listtopic.sh
RUN  ln -s  /usr/bin/createtopic.sh  /usr/local/bin/createtopic
RUN  ln -s  /usr/bin/createdefaulttopic.sh  /usr/local/bin/createdefaulttopic
RUN  ln -s  /usr/bin/listtopic.sh      /usr/local/bin/listtopic
RUN  ln -s  /opt/apache-maven-3.3.9/bin/mvn  /usr/local/bin/mvn

EXPOSE 9092 2181 9000



## Start the services WildFly and kafka
CMD ["startkafka.sh"]


