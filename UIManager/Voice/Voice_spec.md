#
# Voice spec

The Waziup platform supports Voice.

- send Voice messages

## **Send Voice Messages**

The idea is that the platform should be able to send Voice. The platform should:

- provide an API endpoint for sending Voice messages: api.waziup.io/v1/voice/send
- provide a data format to send the Voice, including recipient telephone number and message content.
- forward the request to an external Voice service.

### Implementation


##### Create Message
Endpoint: http://api.waziup.io/v1/voice/create

Method: POST

Data Type: multipart/form-data

Request parameters

| **Field** | **Description** | **Example** |
| --- | --- | --- |
| api\_key | Api Access token to authenticate your request Unique id for the message the request sends | 318b0ca1-c1ea-445c-9db7-ae7a886d4cd9 |
| title | The Title of the voice message being sent | Testing |
| audio | File upload | File upload to MP3/ WAV File |







Response:

| **Field** | **Value** | **Description** |
| --- | --- | --- |
| status | success | Indicating request success |
| status\_code | 1000 | 1000 = success 1001 = failed |
| status\_text | Variable | Full description of the status of the request, contains reasons for the failure of a request |






##### Send Message
Endpoint:http://api.waziup.io/v1/voice/send

Method: POST

Data Type: multipart/form-data

Request parameters

| **Field** | **Description** | **Example** |
| --- | --- | --- |
| api\_key | Api Access token to authenticate your request Unique id for the message the request sends | 318b0ca1-c1ea-445c-9db7-ae7a886d4cd9 |
| message\_id | The ID of the message to be sent | 4124 |
| contacts | Comma separated phone numbers to send the calls to | +233262500105,+393806412093 |



Here&#39;s a sample CURL to send a Test sms. Change the Phone number and message to suit

curl -X POST \

  http://api.waziup.io/v1/voice/send \

  -H &#39;cache-control: no-cache&#39; \

  -H &#39;content-type: multipart/form-data;

-F api-key=53fdb4b2-0ad4-4767-99ea-2271f16f6f1d \

  -F message\_id=4124 \

  -F &#39;contacts=+233262500105&#39;



Response:

| **Field** | **Value** | **Description** |
| --- | --- | --- |
| status | success | Indicating request success |
| status\_code | 1000 | 1000 = success 1001 = failed |
| status\_text | Variable | Full description of the status of the request, contains reasons for the failure of a request |



##### Send Text to Speech
Endpoint:http://api.waziup.io/v1/voice/send

Method: POST

Data Type: multipart/form-data

Request parameters

| **Field** | **Description** | **Example** |
| --- | --- | --- |
| api\_key | Api Access token to authenticate your request Unique id for the message the request sends | 318b0ca1-c1ea-445c-9db7-ae7a886d4cd9 |
| text | The Content of the Text to Speech Message | The temparature of Pond 1 is 26 degrees celcius |
| contacts | Comma separated phone numbers to send the calls to | +233262500105,+393806412093 |



Here&#39;s a sample CURL to send a Test sms. Change the Phone number and message to suit

curl -X POST \

  http://api.waziup.io/v1/voice/send \

  -H &#39;cache-control: no-cache&#39; \

  -H &#39;content-type: multipart/form-data;

-F api-key=53fdb4b2-0ad4-4767-99ea-2271f16f6f1d \

  -F text='The temparature of Pond 1 is 26 degrees celcius'\

  -F &#39;contacts=+233262500105&#39;



Response:

| **Field** | **Value** | **Description** |
| --- | --- | --- |
| status | success | Indicating request success |
| status\_code | 1000 | 1000 = success 1001 = failed |
| status\_text | Variable | Full description of the status of the request, contains reasons for the failure of a request |




##### Get Messages List
Endpoint:http://api.waziup.io/v1/voice/messages

Method: POST

Data Type: multipart/form-data