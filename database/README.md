Data model
=======
IoT-Lite
-----------
IoT lite is a lightweight data model based on semantic sensor network (SSN) ontology . This ontology describes IoT concepts that allow interoperability and discovery of sensory data in heterogeneous IoT platforms. IoT-lite reduces the complexity of other IoT models describing only the main concepts of the IoT domain. Moreover, IoT-Lite can be extended by different models to increment its expressiveness.

The figure below depicts the key concepts of the ontology and the main relationships between them.

![IoTLite Description](https://github.com/diopBabacar/myImages/blob/master/IoTLiteIMG.png)
 
Devices are classified into three classes: 

* sensing devices 
* actuating devices 
* tag devices

Each device has a coverage area that represents the 2D-spatial covered by the IoT device. This area could be a polygon, circle or rectangle. Each device exposes services which is are associated with the entity. This latter defines the concept of real life objects that are subject to observation. Therefore, each entity has a geographical location and has attributes (QuantityKind, Unit) describing the quantity type and measurement unit associated with it.

IoT Lite has been chosen to represent concepts in the Waziup platform
IoT-Lite is a lightweight ontology to represent Internet of Things (IoT) resources, entities and services
IoT Lite ontology is based on 18 Concepts 
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


Orion Context Broker
-----------
Orion is an implementation of the NGSI9/10 REST API binding developed as a part of the FIWARE platform. Orion allows to
manage lifecycle of context information through: updates, queries, registrations and subscriptions. This table below summarizes descriptions of different operations in Orion.

![Orion Description](https://github.com/DiopBabacarEdu/test-GIT/blob/master/OrionImg.tiff)

Mapping between IoT-Lite - Orion
-----------
Entity describes the same concept in IoT-lite and Orion. In IoT-lite, entity is the virtual representation of devices
They have location, attributes, services and meta-data.

How can we map IoT-Lite and Orion context broker concepts?

The mapping below has been proposed :
For each entity, we have the following attributes and meta-data:

* Attributes of sensor (ex: temperature, humidity, …) with the following meta data : Timestamp, unit (ex :Celsius, ...)
* Attribute location
* Attribute plateform
* System and subsystem (Fiware-ServicePath)
Example:  
System (e.g. : SmartCampus), Subsystem (ex: PrecisionAgric)
