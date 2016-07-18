##WAZIUP containers images overview
This repository contains three main directories that correspond to three main containers (**broker**,**database** and **web server**) that will run in WAZIUP cloud.
* The repository **Platform/broker/WAZIUPKafka/** contains the Dockerfile and scripts to build an environment based on [Apache Kafka](http://kafka.apache.org/). It help to create brokers and topics
* The repository **Platform/broker/WAZIUPDatabase/** contains the Dockerfile to build an [MongoDB](https://www.mongodb.com/) container that will host the WZAIUP big data nosql based database system.
* The repository **Platform/broker/WAZIUPWildfly/** contains the  Dockerfile to build a web server container based on JBOSS community version ; [wildfly](https://www.mongodb.com/). It will help to host application based on JavaEE and/or other frameworks.
</br>
</br>
![Image of containers and their orchestration](https://github.com/Waziup/Platform/blob/master/broker/container.png)


##Prerequisites to use in local 
You need to have installed  [Docker](https://docs.docker.com/)  and [docker-compose](https://docs.docker.com/compose/install/) in your local computer. </br>
On Linux based machines here the link on how to install it  : [Docker installation on Linux](https://docs.docker.com/engine/installation/linux/). </br>
If you are on a Windows or Mac it is recommanded to install the all-in-one tool [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

##Running the docker images  - Individually or using docker-compose
The platform offer the possibility to run indeividually the docker images  and using docker-compose as well. 
</br>
* Run each docker image individually
  1. Download the docker images from [WAZIUP platform](https://github.com/Waziup/Platform.git) github repository.
  2. Build the docker images 
</br>
  `cd  Platform/broker/WAZIUPKafka`
</br>
  `$ docker build -t <image name>  .` where **image name** is the name of the container image.
</br> 
  For example  `$ docker build -t  waziupkafka .`.Do not forget the dot at the end of the command !</br>
  `cd Platform/broker/WAZIUPDatabase`
</br>
  `$ docker build -t waziupmongodb .`
</br>
  `cd Platform/broker/WAZIUPWildfly`
</br>
  `$ docker build -t waziupwildfly .`
 3. Run the images </br>
  `$ docker run -it <image name> `where **image name** is the name of container image.
</br>
  `$ docker run -it waziupkafka`
</br>
  `$ docker run -it waziupmongodb`
</br>
  `$ docker run -it waziupwildfly`

* Run all docker images all at once with docker-compose


