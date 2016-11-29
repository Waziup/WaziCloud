#-------------------------------------------------------------------------------
# Copyright 2016 Congduc Pham, University of Pau, France.
# 
# Congduc.Pham@univ-pau.fr
#
# This file is part of the low-cost LoRa gateway developped at University of Pau
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with the program.  If not, see <http://www.gnu.org/licenses/>.
#-------------------------------------------------------------------------------

import urllib2
import subprocess
import time
import ssl
import socket
import datetime
import sys
import re

####################################################
#server: CAUTION must exist
waziup_server="http://broker.waziup.io/v2"

#project name
project_name="waziup"

#your organization: CHANGE HERE
#choose one of the following: "UPPA", "EGM", "IT21", "CREATENET", "CTIC", "UI", "ISPACE", "UGB", "WOELAB", "FARMERLINE", "C4A", "PUBD"
organization_name="UPPA"

#service tree: CHANGE HERE at your convenience
service_tree='/LIUPPA/T2I/CPHAM'

#sensor name: CHANGE HERE but maybe better to leave it as Sensor
sensor_name="Sensor"

#service path: DO NOT CHANGE HERE
service_path='/'+organization_name+service_tree

#the entity name will then be sensor_name+scr_addr, e.g. "Sensor1"
#the Fiware-ServicePath will be service_path which is based on both organization_name and service_tree, e.g. "/UPPA/LIUPPA/T2I/CPHAM"
#the Fiware-Service will be project_name, e.g. "waziup"

####################################################

#To create a new entitiy
# curl http://broker.waziup.io/v2/entities -s -S --header 'Content-Type: application/json' -X POST -d '{ "id": "UPPASensor1", "type": "SensingDevice", "temperature": { "value": 23, "type": "Number" }, "pressure": { "value": 720, "type": "Number" } }'

#Further updates of the values are like that:
# curl http://broker.waziup.io/v2/entities/UPPASensor1/attrs/temperature/value -s -S --header 'Content-Type: text/plain' -X PUT -d 27

#To retrieve the last data point inserted:
# curl http://broker.waziup.io/v2/entities/UPPASensor1/attrs/temperature/value -X GET

#error messages from server
WAZIUP_entity_not_created="The requested entity has not been found"

# didn't get a response from thingspeak server?
connection_failure = False

# retry if return from server is 0?
retry = False

# function to check connection availability with the server
def test_network_available():
	connection = False
	iteration = 0
	response = None
	
	# we try 4 times to connect to the server.
	while(not connection and iteration < 4) :
	    	try:
	    		# 3sec timeout in case of server available but overcrowded
			response=urllib2.urlopen(waziup_server, timeout=3)
			connection = True
	    	except urllib2.URLError, e: pass
		except socket.timeout: pass
		except ssl.SSLError: pass
	    	
	    	# if connection_failure == True and the connection with the server is unavailable, don't waste more time, exit directly
	    	if(connection_failure and response is None) :
	    		print('WAZIUP: the server is still unavailable')
	    		iteration = 4
	    	# print connection failure
	    	elif(response is None) :
	    		print('WAZIUP: server unavailable, retrying to connect soon...')
	    		# wait before retrying
	    		time.sleep(1)
	    		iteration += 1
	    		
	return connection

def create_new_entity(data, src, nomenclatures):

	global connection_failure
	
	print "WAZIUP: create new entity"
	
	cmd = 'curl '+waziup_server+'/entities -s -S --header Content-Type:application/json --header Fiware-ServicePath:'+service_path+' --header Fiware-Service:'+project_name+' -X POST -d {\"id\":\"'+src+'\",\"type\":\"SensingDevice\",'
	
	i=0
	while i < len(data) :
		cmd = cmd+"\""+nomenclatures[i]+"\":{\"value\":"+data[i]+",\"type\":\"Number\"}"
		i += 1
		if i < len(data):
			cmd = cmd+","
	cmd = cmd+"}" 	
	
	print "CloudWAZIUP: will issue curl cmd"
	print(cmd)
	args = cmd.split()
	print args	

	try:
		out = subprocess.check_output(args, shell=False)
		
		if out != '':
			print 'WAZIUP: returned msg from server is'
			print out					
		else :
			print 'WAZIUP: entity creation success'
			
	except subprocess.CalledProcessError:
		print "WAZUP: curl command failed (maybe a disconnection)"
		connection_failure = True	
	
	
# send a data to the server
def send_data(data, src, nomenclatures):

	global connection_failure
	
	entity_need_to_be_created=False
	
	i=0
	while i < len(data)  and not entity_need_to_be_created:
		cmd = 'curl '+waziup_server+'/entities/'+src+'/attrs/'+nomenclatures[i]+'/value -s -S --header Content-Type:text/plain --header Fiware-ServicePath:'+service_path+' --header Fiware-Service:'+project_name+' -X PUT -d '+data[i]
		i += 1

		print "CloudWAZIUP: will issue curl cmd"
		print(cmd)
		args = cmd.split()
		print args
		
		#retry enabled
		if (retry) :
			out = 'something'
			iteration = 0
			
			while(out != '' and iteration < 6 and not connection_failure) :
				try:
					out = subprocess.check_output(args, shell=False)
	
					#if server return 0, we didn't wait 15sec, wait then
					if out != '':
						print 'WAZIUP: returned msg from server is'
						print out
						print('WAZIUP: retrying in 3sec')
						iteration += 1
						time.sleep( 3 )
					else:
						'WAZIUP: upload success'
						
				except subprocess.CalledProcessError:
					print "WAZUP: curl command failed (maybe a disconnection)"
					connection_failure = True
					
		#retry disabled
		else :
			try:
				out = subprocess.check_output(args, shell=False)
				
				if out != '':
					print 'WAZIUP: returned msg from server is'
					print out
					
					#the entity has not been created before
					if WAZIUP_entity_not_created in out:
						entity_need_to_be_created=True
						create_new_entity(data, src, nomenclatures)						
				else :
					print 'WAZIUP: upload success'
					
			except subprocess.CalledProcessError:
				print "WAZUP: curl command failed (maybe a disconnection)"
				connection_failure = True
	
def WAZIUP_uploadData(nomenclatures, data, src):
	
	connected = test_network_available()
	
	# if we got a response from the server, send the data to it
	if(connected):
		#len(nomenclatures) == len(data)
		print("WAZIUP: uploading")
		send_data(data, sensor_name+src, nomenclatures)
	else:
		print("WAZIUP: not uploading")
		
	#update grovestreams_connection_failure value
	global connection_failure
	connection_failure = not connected

# main
# -------------------

def main(ldata, pdata, rdata, tdata, gwid):

	# this is common code to process packet information provided by the main gateway script (i.e. post_processing_gw.py)
	# these information are provided in case you need them
	arr = map(int,pdata.split(','))
	dst=arr[0]
	ptype=arr[1]				
	src=arr[2]
	seq=arr[3]
	datalen=arr[4]
	SNR=arr[5]
	RSSI=arr[6]
	
	# this part depends on the syntax used by the end-device
	# we use: TC/22.4/HU/85...
	#
	# but we accept also a_str#b_str#TC/22.4/HU/85... for compatibility with ThingSpeak
	 		
	# get number of '#' separator
	nsharp = ldata.count('#')			
	#no separator
	if nsharp==0:
		#will use default channel and field
		data=['','']
		
		#contains ['', '', "s1", s1value, "s2", s2value, ...]
		data_array = data + re.split("/", ldata)		
	elif nsharp==1:
		#only 1 separator
		
		data_array = re.split("#|/", ldata)
		
		#if the first item has length > 1 then we assume that it is a channel write key
		if len(data_array[0])>1:
			#insert '' to indicate default field
			data_array.insert(1,'');		
		else:
			#insert '' to indicate default channel
			data_array.insert(0,'');		
	else:
		#contains [channel, field, "s1", s1value, "s2", s2value, ...]
		data_array = re.split("#|/", ldata)	
		
	#just in case we have an ending CR or 0
	data_array[len(data_array)-1] = data_array[len(data_array)-1].replace('\n', '')
	data_array[len(data_array)-1] = data_array[len(data_array)-1].replace('\0', '')	
	
	#test if there are characters at the end of each value, then delete these characters
	i = 3
	while i < len(data_array) :
		while not data_array[i][len(data_array[i])-1].isdigit() :
			data_array[i] = data_array[i][:-1]
		i += 2
		
	# get number of '/' separator
	nslash = ldata.count('/')
	
	index_first_data = 2
	
	if nslash==0:
		# old syntax without nomenclature key
		index_first_data=2
	else:
		# new syntax with nomenclature key				
		index_first_data=3
																		
	nomenclatures = []
	data = []
	
	if nslash==0:
		# old syntax without nomemclature key, so insert only one key
		nomenclatures.append("temp")
		data.append(data_array[index_first_data])
	else:
		#completing nomenclatures and data
		i=2
		while i < len(data_array)-1 :
			nomenclatures.append(data_array[i])
			data.append(data_array[i+1])
			i += 2
	
	#upload data to WAZIUP
	WAZIUP_uploadData(nomenclatures, data, str(src))		

if __name__ == "__main__":
	main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])