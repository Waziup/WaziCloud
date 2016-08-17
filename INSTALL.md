
WAZIUP platform installation
============================

This document describes how to install the WAZIUP platform in the Cloud.

Overview
--------

This repository contains three main directories that correspond to three main containers (**broker**,**database** and **web server**) that will run in WAZIUP cloud.

* platform/broker/ contains the Dockerfile and scripts to build an environment based on [Apache Kafka](http://kafka.apache.org/) or FIWARE Orion. It helps to create brokers and topics
* platform/database/ contains the Dockerfile to build an [MongoDB](https://www.mongodb.com/) container that will host the WZAIUP big data nosql based database system.
* platform/exec_env/wildfly/ contains the  Dockerfile to build a web server container based on JBOSS community version ; [wildfly](https://www.mongodb.com/). It will help to host application based on JavaEE and/or other frameworks.


Prerequisites to use in local
-----------------------------

Install [Docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) in your local computer.
On Linux based machines here the link on how to install it  : [Docker installation on Linux](https://docs.docker.com/engine/installation/linux/). </br>
If you are on a Windows or Mac it is recommanded to install the all-in-one tool [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

Running
-------

Run all docker images all at once with docker-compose:
```
  git clone git@github.com:Waziup/Platform.git
  cd platform
  docker-compose up
```

Usage
-----

You can connect to the container by executing the command:
```
docker exec -it <Container ID> bash
```
where **Container ID** is the broker container identifier (can be found in the result of the command `docker ps -a`.
It corresponds to the first column).
Once you have the shell prompt, execute the `listtopic` that will show the topics created.
Whenever the result is empty that means you have no topic created.
You have choice between two commands for this purpose : **createdefaulttopic** and **createtopic**.

- **createdefaulttopic** will create one default topic name **waziupfarmingtopic**.
- **createtopic** will create a topic that name has been provided at prompt.


