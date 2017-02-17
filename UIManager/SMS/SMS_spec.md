
SMS Command spec
================

The Waziup platform supports SMS.
There are two main functions:

- send SMS
- receive SMS

Send SMS
--------

The idea is that the platform should be able to send SMS.
The platform should:

- provide an API end point for sending SMS: `api.waziup.io/v1/sms/send`
- provide a data format to send the SMS, including recipient telephone number and message content.
- forward the request to an SMS service.



Implementation
-----------------

Endpoint:   http://api.waziup.io/v1/sms/send

Method: POST

Data Type: application/json

Request parameters

|Field   |Desciption   |Example   |
|---|---|---|
|sender_id   |Short name to be shown as sender's name   |WAZIUP   |
|contacts   |JSON array of phone numbers   |["+233262500105" , "+393806412093"]   |
| message  | Message body to be sent  |  "Pond 1 temperature reading of 32 degrees at 13:00 GMT" |



Here's a sample CURL to send a Test sms. Change the Phone number and message to suit

```
$ curl -X POST -H "Content-Type: application/json" -H "Api-Token: 53fdb4b2-0ad4-4767-99ea-2271f16f6f1d" -H "Cache-Control: no-cache" -d '{
"sender_id" : "WAZIUP",
"contacts" : ["+233262500105" , "+393806412093"],
  "message" : "Pond 1 temperature reading of 32 degrees at 13:00 GMT"
}' "http://api.waziup.io/v1/sms/send"
```



Response:

| Field  |Value   |Description   |
|---|---|---|
|status   |success   |Indicating request success   |
|status_code   |1000   |Code indicating request success   |
|status_text   |Variable   |Full description of status   |
|sms_succeeded   |json array   |json array of reference ids of sms that succeeded   |
|sms_failed   |json array   |json array of reference ids of sms that failed   |






Receive SMS
-----------

The platform should also be able to receive SMS.
Those SMS serve two main functions:

- add data points from sensors,
- send commands to applications.


###End point###

The platform should:

- provide an API end point for receiving SMS: `api.waziup.io/v1/sms/receive`.
- this end point will be registered with an existing SMS service.
- each time a request is received on the API end point, it is forwarded to the SMS back-end.

###SMS back-end###

The SMS back-end is in charge of receiving, decoding and dispatching the receive requests from SMS.

The SMS back-end should:

- receive requests content from the API,
- provide a data format for the request content,
- decode the request,
- dispatch the requests to other platform components and applications.

The SMS back-end also exposes its own API, allowing to configure the requests and dispatching.
For example, a Waziapp (Waziup application) will be able to register with the SMS back-end.
While registering, it will specify that some messages should be forwarded to it.
For instance, it will say "all messages begining with the word `meteo` should be forwarded to me".

The SMS back-end should:

- expose an API end-point on `api.waziup.io/v1/sms/register`
- provide a data format for the registering, allowing application/users to specify what kind of SMS should be forwarded, and where.

Implementation
---------------------

Register:


To register to for a particular command the following parameters must be sent to the register end point


Endpoint: api.waziup.io/v1/sms/register

Method: POST

Data Type: application/json

Request parameters


|Parameter   | Description  |
|---|---|---|
|name| Application name|
| keyword  | Unique identifier preceeding the sms content to be sent  |
| url  |  Url for the sms content to be posted to  |


Response:

Data Type: application/json

Response parameters

|Parameter   | Description  |
|---|---|---|
| success  | true or false |
| message  | Message describing success or failure |



Here's a sample CURL to send a Register an application named app1 with keyword 'pond'. Change the various parameters to suit

```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'name=app1&url=http://callbackurl.com&keyword=pond' "api.waziup.io/v1/sms/register"
```



Callback Payload
----------------------

Whenever an SMS is received on the phone number ( +15186760367 ) the contents of the SMS message is forwarded to the callback url of the specified application based on the keyword (first word in the phrase) of the SMS sent. 
 

Method: POST

Request parameters

|Parameter   | Description  |
|---|---|---|
| From  | The originating phone number |
| Text  | The Content of the SMS message received including the keyword |

