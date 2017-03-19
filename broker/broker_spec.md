
WAZIUP broker and data model
============================

In Waziup, the data management is done using FIWARE Orion context broker.
The data model is IoT-Lite.


IoT-Lite
--------

IoT lite is a lightweight data model based on semantic sensor network (SSN) ontology . This ontology describes IoT concepts that allow interoperability and discovery of sensory data in heterogeneous IoT platforms. IoT-lite reduces the complexity of other IoT models describing only the main concepts of the IoT domain. Moreover, IoT-Lite can be extended by different models to increment its expressiveness.

The figure below depicts the key concepts of the ontology and the main relationships between them.

![IoTLite Description](https://github.com/diopBabacar/myImages/blob/master/IoTLiteIMG.png)
 
Devices are classified into three classes: 

* sensing devices 
* actuating devices 
* tag devices

Each device has a coverage area that represents the 2D-spatial covered by the IoT device. This area could be a polygon, circle or rectangle. Each device exposes services which is are associated with the entity. This latter defines the concept of real life objects that are subject to observation. Therefore, each entity has a geographical location and has attributes (QuantityKind, Unit) as defined in [SSN QU](https://www.w3.org/2005/Incubator/ssn/ssnx/qu/qu-rec20.html), describing the quantity type and measurement unit associated with it.

IoT Lite has been chosen to represent concepts in the Waziup platform.
It represents Internet of Things (IoT) resources, entities and services, based on 18 Concepts :
* System/ sub-system
* Platform
* Device (Sensing device, Tag device, Actuating device) 
* Sensor
* Attribute
* Service
* Entity
* Coverage (Polygon, Rectangle, Circle) 
* Point (latitude, longitude, relativeLocation)
* Quantity kind, Unit 



WAZIUP data model
-----------------

The data model used in waziup for the sensors is the following.

```
{
  "id": "<SensorID>",
  "type": "SensingDevice",
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [
        <latitude>,
        <longitude>
      ]
    }
  },
  "owner": {
    "type": "String",
    "value": "<owner>"
  },
  "<measurement>": {
    "type": "Number",
    "value": 23,
    "metadata": {
      "timestamp": {
        "type": "DateTime",
        "value": "<dateTime>"
      },
      "unit": {
        "type": "string",
        "value": "<Unit>"
      }
    }
  }
}
```

- SensorID is the name of the sensor.
- latitude and longitude are the coordinates on earth in decimal notation (e.g. "40.418889").
- owner is the sensor owner. By convention it is the user name in Keycloak.
- dateTime is the date and time at which the measurement has been taken. It is in ISO 8601 format: YYY-MM-DDThh:mm:ss.00Z
- measurement is the measured quantity as defined in [SSN QU](https://www.w3.org/2005/Incubator/ssn/ssnx/qu/qu-rec20.html), in lower case.
In particular, the following measurements are supported:
  - temperature
  - pressure
  - distance
  ...
- Unit is the unit as defined in [SSN QU](https://www.w3.org/2005/Incubator/ssn/ssnx/qu/qu-rec20.html).



Here is a valid example of sensor:
```
{
  "id": "Sensor1",
  "type": "SensingDevice",
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [
        14.52839,
        35.89389
      ]
    }
  },
  "owner": {
    "type": "String",
    "value": "cdupont",
    "metadata": {}
  },
  "temperature": {
    "type": "Number",
    "value": 23,
    "metadata": {
      "timestamp": {
        "type": "DateTime",
        "value": "2016-06-08T18:20:27.00Z"
      },
      "unit": {
        "type": "string",
        "value": "Celsius"
      }
    }
  }
}
```


Orion Context Broker
--------------------

Orion is an implementation of the NGSI9/10 REST API binding developed as a part of the FIWARE platform. Orion allows to
manage lifecycle of context information through: updates, queries, registrations and subscriptions. This table below summarizes descriptions of different operations in Orion.

![Orion Description](https://github.com/DiopBabacarEdu/test-GIT/blob/master/orion-operation.png)

Building an Orion image
----------------------

Download Orion's source code from Github:

```
$ git clone https://github.com/telefonicaid/fiware-orion/)
$ cd fiware-orion/docker
```

Using an automated scenario with docker-compose and building your new image: sudo docker-compose up. You may also modify the provided docker-compose.yml file if you need so.

Manually, running MongoDB on another container: 1. sudo docker run --name mongodb -d mongo:3.2
```
$ sudo docker build -t orion .
```

Check that everything works with
```
$ curl localhost:1026/version
```

cygnus-common
-------------

You will need docker installed and running in your machine. Please, check this link (https://docs.docker.com) for official start guide.
The installation of cygnus-ngsi must be preceeded by the installation of cygnus-common. Follow this next section to do so.

###Installing cygnus-common###

Start by cloning the `fiware-cygnus` repository:

```
$ git clone https://github.com/telefonicaid/fiware-cygnus.git
```

Point into the directory of cygnus-common :
```
$ cd fiware-cygnus/docker/cygnus-common
```

And run the following command:
```
$ docker build -t cygnus-common .
```

One could check whether the image has been built by typing:
```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
cygnus-common       latest              0d2e537ac922        41 minutes ago      673.8 MB
centos              6                   61bf77ab8841        6 weeks ago         228.9 MB
```

###Using the cygnus-common image###

Start a container for this image by typing in a terminal:
```
$ docker run cygnus-common
```

Logging traces:

```
+ exec /usr/lib/jvm/java-1.6.0/bin/java -Xmx20m -Dflume.root.logger=INFO,console -cp '/opt/apache-flume/conf:/opt/apache-flume/lib/*:/opt/apache-flume/plugins.d/cygnus/lib/*:/opt/apache-flume/plugins.d/cygnus/libext/*' -Djava.library.path= com.telefonica.iot.cygnus.nodes.CygnusApplication -f /opt/apache-flume/conf/agent.conf -n cygnus-common
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/opt/apache-flume/lib/slf4j-log4j12-1.6.1.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/apache-flume/plugins.d/cygnus/libext/cygnus-common-1.0.0_SNAPSHOT-jar-with-dependencies.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
time=2016-05-17T06:36:23.867UTC | lvl=INFO | corr= | trans= | srv= | subsrv= | function=main | comp= | msg=com.telefonica.iot.cygnus.nodes.CygnusApplication[166] : Starting Cygnus, version 1.0.0_SNAPSHOT.d7cfee4455a59a1854cc53f37e16ff4866b26010
...
...
time=2016-05-17T06:36:25.046UTC | lvl=INFO | corr= | trans= | srv= | subsrv= | function=main | comp=cygnus-common | msg=com.telefonica.iot.cygnus.nodes.CygnusApplication[286] : Starting a Jetty server listening on port 8081 (Management Interface)
```

Stop the container as:
```
$ docker stop c88bc1b66cdc
c88bc1b66cdc
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

In order to use a specific configuration, one must edit both the `Dockerfile` and/or `agent.conf` file under `docker/cygnus-common` and building the cygnus-common image from the scratch.


cygnus-ngsi
-----------

###Building cygnus-ngsi from sources###

Change directory:

```
$ cd fiware-cygnus
```

And run the following command:
```
$ sudo docker build -f docker/cygnus-ngsi/Dockerfile -t cygnus-ngsi .
```

Once finished (it may take a while), you can check the available images at your docker by typing:

```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
cygnus-ngsi         latest              6a9e16550c82        10 seconds ago      462.1 MB
centos              6                   273a1eca2d3a        2 weeks ago         194.6 MB
```

###Using docker hub image###

Instead of building an image from the scratch, you may download it from [hub.docker.com](docker pull fiware/cygnus-ngsi):
```
$ docker pull fiware/cygnus-ngsi
```

It can be listed the same way than above:

```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
cygnus-ngsi         latest              6a9e16550c82        10 seconds ago      462.1 MB
centos              6                   273a1eca2d3a        2 weeks ago         194.6 MB
```

###Running the image###

The cygnus-ngsi image (either built or downloaded from hub.docker.com) allows running a Cygnus agent in charge of receiving NGSI-like notifications and persisting them into a database (MySQL by default).

Start a container for this image by typing in a terminal
```
$ docker run cygnus-ngsi
```

Logging traces:

```
+ exec /usr/lib/jvm/java-1.6.0/bin/java -Xmx20m -Dflume.root.logger=INFO,console -cp '/opt/apache-flume/conf:/opt/apache-flume/lib/*:/opt/apache-flume/plugins.d/cygnus/lib/*:/opt/apache-flume/plugins.d/cygnus/libext/*' -Djava.library.path= com.telefonica.iot.cygnus.nodes.CygnusApplication -f /opt/apache-flume/conf/agent.conf -n cygnus-ngsi
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/opt/apache-flume/lib/slf4j-log4j12-1.6.1.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/apache-flume/plugins.d/cygnus/lib/cygnus-ngsi-0.13.0_SNAPSHOT-jar-with-dependencies.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/apache-flume/plugins.d/cygnus/libext/cygnus-common-0.13.0_SNAPSHOT-jar-with-dependencies.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
time=2016-05-05T09:57:55.150UTC | lvl=INFO | corr= | trans= | srv= | subsrv= | function=main | comp= | msg=com.telefonica.iot.cygnus.nodes.CygnusApplication[166] : Starting Cygnus, version 0.13.0_SNAPSHOT.5200773899b468930e82df4a0b34d44fd4632893
...
...
time=2016-05-05T09:57:56.287UTC | lvl=INFO | corr= | trans= | srv= | subsrv= | function=main | comp=cygnus-ngsi | msg=com.telefonica.iot.cygnus.nodes.CygnusApplication[286] : Starting a Jetty server listening on port 8081 (Management Interface)
```

Check the running container (in a second terminal shell):

```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED              STATUS              PORTS                NAMES
9ce0f09f5676        cygnus-ngsi         "/cygnus-entrypoint.   About a minute ago   Up About a minute   5050/tcp, 8081/tcp   focused_kilby
```

Check the IP address of the container above by doing:

```
$ docker inspect 9ce0f09f5676 | grep \"IPAddress\"
        "IPAddress": "172.17.0.13",
```
Ask for the Cygnus version (in a second terminal shell):
```
$ curl "http://172.17.0.13:8081/v1/version"
{"success":"true","version":"0.13.0_SNAPSHOT.5200773899b468930e82df4a0b34d44fd4632893"}
```

Stop the container as:
```
$ docker stop 9ce0f09f5676
9ce0f09f5676
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```


###Using a specific configuration###

The default configuration distributed with the image is tied to certain values that may not be suitable for our tests. Specifically:

* It only works for building historical context data in MySQL.
* The endpoint for MySQL is `mysql`.
* The logging level is `INFO`.
* The logging appender is `console`.
Here is the link to the official configuration file of cygnus : https://github.com/Waziup/Platform/blob/master/broker/cygnus/agent.conf

Orion headers
-------------

When sending a request to Orion, the HTTP headers should be set as follows:

```
fiware-service = waziup
```
```
Fiware-ServicePath = /organization/what/ever/tree/you/want/here
```

Organization is one of following:

- "UPPA"
- "EGM"
- "IT21"
- "CREATENET"
- "CTIC"
- "UI"
- "ISPACE"
- "UGB" 
- "WOELAB"
- "FARMERLINE"
- "C4A"
- "PUBD"

