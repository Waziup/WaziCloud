#!/bin/sh

echo "=====< Start creating the topics"

$KAFKA_HOME/bin/kafka-topics.sh --create  --zookeeper $HOSTNAME:2181 --replication-factor 1 --partitions 1  --topic waziupfarmingtopic  &&

echo  "======< listing the topic"

$KAFKA_HOME/bin/kafka-topics.sh --list    --zookeeper $HOSTNAME:2181 

echo "Topics creation end"


