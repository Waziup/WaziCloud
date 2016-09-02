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
