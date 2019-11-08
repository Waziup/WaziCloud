
WAZIUP performance analysis
===========================

This folder contains scripts to analyse the platform performance.

Trace runtime analysis
----------------------

The traces log should be prepared carefully to be analysed.
It should look like that:
```
1 2019-10-28T17:00:29.120727240000 "Get devices"
2 2019-10-28T17:00:29.120850530000 "ORION GET"
3 2019-10-28T17:00:29.320373606000 "Got entities"
4 2019-10-28T17:00:29.320441559000 "Mapped entities"
```

[This gnuplot program](traceGraph.g) will generate the graph.

![runtime](./img/traceanalysis.png)


Response time
-------------

In order to generate a response time graph, run:

```
USERTOKEN=`curl -X POST  -H "Content-Type: application/x-www-form-urlencoded" -d 'username=cdupont&password=password&grant_type=password&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`

ab -n 100 -c 2 -H "Authorization: Bearer $USERTOKEN" http://localhost:800/api/v2/devices?limit=1000
```
Once this is done, run [This gnuplot program](responseTime.g) to generate the graph.

[response time](img/response time.png)

Concurrency
-----------

You can obtain a concurrency graph by running the script `generateConc.sh`.

The output data should look like: 
```
1 1257.608 1257.608
2 508.521 254.261
3 705.586 235.195
4 939.310 234.827
```

Then run [this gnuplot program](concGraph.g).

[concurrency](img/concurrency.png)

