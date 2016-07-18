#!/bin/sh

mirror=$(curl --stderr /dev/null https://www.apache.org/dyn/closer.cgi\?as_json\=1 | jq -r '.preferred')
url="${mirror}kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz"
wget -q "${url}" -O "/tmp/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz"

urlmaven="http://www-eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz"
wget -q "$urlmaven" -O "/tmp/apache-maven-3.3.9-bin.tar.gz"
