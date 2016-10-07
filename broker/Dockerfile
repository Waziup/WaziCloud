## MongoDB configuration for WAZIUP  ###############
FROM anapsix/alpine-java

#Author
MAINTAINER  DRABO Constantin  <panda.constantin@gmail.com>

#Install tools for download MongoDB
RUN apk add --update unzip wget curl docker jq coreutils

RUN wget -q https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.8.tgz -O /tmp/mongodb-linux-x86_64-3.2.8.tgz
RUN tar xfz /tmp/mongodb-linux-x86_64-3.2.8.tgz -C  /opt && rm  /tmp/mongodb-linux-x86_64-3.2.8.tgz
RUN mkdir -p /data/db
RUN ln -s /opt/mongodb-linux-x86_64-3.2.8/bin/mongod  /usr/local/bin/mongod

EXPOSE 27017 28017

ENTRYPOINT ["mongod"]
