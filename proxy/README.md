
WAZIUP Proxy
============

This proxy is the entry point to the waziup platform in a Cloud configuration.


Usage
-----

The proxy is intended to be run as a docker container in a Cloud.
To create the container:
```
docker build -t waziup/proxy .
```

Develop
-------

To run the proxy locally, you need to generate a self-signed certificate:
```
 sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -subj '/CN=*.waziup.io'
```
The certificate will be used by the proxy. To start it:
```
docker run -it -p 80:80 -p 443:443 -v <platform_host_path>/proxy:/certs/live/dev.waziup.io/ waziup/proxy
```

To test the proxy, we will use cURL. However, it is necessary to trust the self-signed certificate:
```
sudo cp fullchain.pem /usr/local/share/ca-certificates/fullchain.crt
sudo update-ca-certificates
```
We can finally launch the cURL command:
```
curl --resolve api.waziup.io:443:127.0.0.1 https://api.waziup.io:443/
```
We need to trick cURL with --resolve, so the request to api.waziup.io is re-routed to our localhost proxy.
The proxy will then take care to fetch the online platform.





