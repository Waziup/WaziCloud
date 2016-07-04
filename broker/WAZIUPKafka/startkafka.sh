#!/bin/sh

$KAFKA_HOME/bin/zookeeper-server-start.sh  $KAFKA_HOME/config/zookeeper.properties  

$KAFKA_HOME/bin/kafka-server-start.sh  $KAFKA_HOME/config/server.properties 

