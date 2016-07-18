#WAZIUP containers images overview
This repository contains three main directories that correspond to three main containers (**broker**,**database** and **web server**) that will run in WAZIUP cloud.
* The repository **Platform/broker/WAZIUPKafka/** contains the Dockerfile and scripts to build an environment based on [Apache Kafka](http://kafka.apache.org/). It help to create brokers and topics
* The repository **Platform/broker/WAZIUPDatabase/** contains the Dockerfile to build an [MongoDB](https://www.mongodb.com/) container that will host the WZAIUP big data nosql based database system.
* The repository **Platform/broker/WAZIUPWildfly/** contains the  Dockerfile to build a web server container based on JBOSS community version ; [wildfly](https://www.mongodb.com/). It will help to host application based on JavaEE and/or other frameworks.
</br>
![Image of containers and their orchestration](https://github.com/Waziup/Platform/blob/master/broker/container.png)
</center>

#Prerequisites to use in local 
You need to have installed  [Docker](https://docs.docker.com/)  and [docker-compose](https://docs.docker.com/compose/install/) in your local computer. </br>
On Linux based machines here the link on how to install it  : [Docker installation on Linux](https://docs.docker.com/engine/installation/linux/). </br>
If you are on a Windows or Mac it is recommanded to install the all-in-one tool [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

#Running the docker images  - Individually or using docker-compose
The platform offer the possibility to run indeividually the docker images  and using docker-compose as well. 
</br>
* Run each docker image individually



* Run all docker images all at one with docker-compose


