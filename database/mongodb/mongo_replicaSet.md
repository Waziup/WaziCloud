MongoDB replica set using Docker 

This document made with 3 containers from the mongo image, all inside their own docker container network. The name them mongo1, mongo2, and mongo3. 

Step-1: Adding a new network called my-mongo-cluster :
	
		$ docker network create my-mongo-cluster

	Checking new network cluster

		$ docker network ls

Step-2: Setting up our containers:

		$ docker run -p 30001:27017 --name mongo1 --net my-mongo-cluster mongo mongod --replSet my-mongo-set

	Set up the other 2 containers using different terminal by running:

		$ docker run -p 30002:27017 --name mongo2 --net my-mongo-cluster mongo mongod --replSet my-mongo-set

		$ docker run -p 30002:27017 --name mongo2 --net my-mongo-cluster mongo mongod --replSet my-mongo-set

Step-3: Setting up replication:

	Connect to the mongo shell in any of the containers.

		$ docker exec -it mongo1 mongo

	Inside the mongo shell, first create the configuration:

			> db = (new Mongo('localhost:27017')).getDB('test')

			> config = {
  				"_id" : "my-mongo-set",
  				"members" : [
  				{
  				"_id" : 0,
  				"host" : "mongo1:27017"
  				},
  				{
  				"_id" : 1,
  				"host" : "mongo2:27017"
  				},
  				{
  				"_id" : 2,
  				"host" : "mongo3:27017"
  				}
  				]
  				}

  	Finally start the replica set by running

  		$ rs.initiate(config)

  	If all goes well, prompt should change to something like this: my-mongo-set:PRIMARY>

  Step-4: Testing replicaSet

  	 First insert a document into primary database:

  	 	> db.mycollection.insert({name : 'sample'})

  	 		WriteResult({ "nInserted" : 1 })

  	 	> db.mycollection.find()

  	 		{ "_id" : ObjectId("57761827767433de37ff95ee"), "name" : "sample" }

  	 Make a new connection to one of secondary databases (located on mongo2) and test to see if the document get replicated there as well :

  	 	> db2 = (new Mongo('mongo2:27017')).getDB('test')
  	 		test
  	 	> db2.setSlaveOk()
		> db2.mycollection.find()
			{ "_id" : ObjectId("57761827767433de37ff95ee"), "name" : "sample" }

	The db2.setSlaveOk() command to let the shell know that re intentionally querying a database that is not primary. And it looks like the same document is present in secondary as well.