#!/bin/sh

echo -n "Enter the name of the topic :"

read  topicname ;

if  [ -n "$topicname" ]

 then 

   $KAFKA_HOME/bin/kafka-topics.sh --create  --zookeeper $HOSTNAME:2181 --replication-factor 1 --partitions 1  --topic $topicname  &&

   echo  " $topicname created ..."

else 

   echo  " The topic name is null"

fi


echo "Here the list of topics" 

$KAFKA_HOME/bin/kafka-topics.sh --list    --zookeeper $HOSTNAME:2181 



