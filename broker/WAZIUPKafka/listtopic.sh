#!/bin/sh

echo  "======< List of the topic==============="

$KAFKA_HOME/bin/kafka-topics.sh --list --zookeeper $HOSTNAME:2181 

echo "=========================================="

