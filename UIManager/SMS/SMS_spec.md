
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


Receive SMS
-----------

The platform should also be able to receive SMS.
Those SMS serve two main functions:

- add data points from sensors,
- send commands to applications.


#End point#

The platform should:

- provide an API end point for receiving SMS: `api.waziup.io/v1/sms/receive`.
- this end point will be registered with an existing SMS service.
- each time a request is received on the API end point, it is forwarded to the SMS back-end.

#SMS back-end#

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
==============

TDB.
-> which service to use?
-> precise data format

