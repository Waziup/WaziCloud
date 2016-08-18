
WAZIUP platform installation
============================

This document describes how to install the WAZIUP platform in local or on the Cloud.

Overview
--------

This repository contains several directories that each corresponds to a container:

* platform/broker: Dockerfile and scripts to build an environment based on [Apache Kafka](http://kafka.apache.org/) or FIWARE Orion. It also to creates topics/entities.
* platform/database: Dockerfile to build an [MongoDB](https://www.mongodb.com/) container that will host the WAZIUP data models.
* platform/exec_env: Dockerfile to build a web server container based on JBOSS community version; [wildfly](https://www.mongodb.com/).


Local installation
------------------

Install [Docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) in your local computer.


Run all docker images at once with docker-compose:
```
  git clone git@github.com:Waziup/Platform.git
  cd platform
  docker-compose up
```

###Usage
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


Cloud deployment
----------------

WAZIUP Cloud is a DEIS PaaS installed at deis.waziup.io (currently deis.217.77.95.64.xip.io).
To deploy the platform, first compile all the containers:

```
docker-compose build
```
You then need to push each containers individually on dockerhub:
```
docker push waziup/<repo_name>
```
You can finally deploy them in DEIS:
```
deis pull waziup/<repo_name>
```



