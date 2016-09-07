MongoDB in WAZIUP: save data from local gateway to remote cloud

MongoDB database will be run in Local gateway and remote Cloud.

In local cloud:

Step-1:
import text/json/csv file to mongodb waziup database.

	Command script for crontab:

		$ mongoimport -d <database name> -c <collection name> --type <file type, csv/json> --file 				<file name> –-headerline

Step-2:
save collection from local database to waziup cloud.
	
	A javascript file will be run from local cloud using mongo command.

	Command script for crontab:
		$ mongo <ip address:port/database name> <filename.js> 
