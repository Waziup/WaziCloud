#!/bin/sh

echo "Starting up the Kafka manager server ..."
/opt/kafka-manager-1.3.1.6/bin/kafka-manager -Dkafka-manager.zkhosts="$HOSTNAME:2181" &


echo "Configure the  server.properties file"
sed -i -e  "s/#listeners=PLAINTEXT/listeners=PLAINTEXT/g"  $KAFKA_HOME/config/server.properties
sed -i -e "s/\/:9092/\/$HOSTNAME:9092/g"  $KAFKA_HOME/config/server.properties


echo "Configure the zookeeper.properties file"
sed -i -e "s/=localhost:2181/=$HOSTNAME:2181/g"  $KAFKA_HOME/config/server.properties

echo "Configure consumer.properties file"
sed -i -e "s/127.0.0.1/$HOSTNAME/g"  $KAFKA_HOME/config/consumer.properties

echo "Configure the producer.properties file"
sed -i -e "s/localhost/$HOSTNAME/g"  $KAFKA_HOME/config/producer.properties
sed -i -e "s/localhost/$HOSTNAME/g"  $KAFKA_HOME/config/connect-standalone.properties



echo "Starting WAZIUP kafka broker servers ..... "

$KAFKA_HOME/bin/zookeeper-server-start.sh  $KAFKA_HOME/config/zookeeper.properties &          

$KAFKA_HOME/bin/kafka-server-start.sh  $KAFKA_HOME/config/server.properties 


 


