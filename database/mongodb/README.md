# Pull mongo image from docker hub

	docker pull mongo:latest


# Launch MongoDB container:

	docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles

# Connecting to Mongo database

	docker run -it --link mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'

# MongoDB in WAZIUP: save data from local gateway to remote cloud. MongoDB database will be run in Local gateway and remote Cloud.

# In local cloud:

Step-1:
import text/json/csv file to mongodb waziup database.

	Command script for crontab:

		$ mongoimport -d <database name> -c <collection name> --type <file type, csv/json> --file 				<file name> –-headerline

Step-2:
save collection from local database to waziup cloud.
	
	A javascript file will be run from local cloud using mongo command.

	Command script for crontab:
		$ mongo <ip address:port/database name> <filename.js> 
