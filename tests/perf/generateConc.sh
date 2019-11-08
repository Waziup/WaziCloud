
USERTOKEN=`curl -X POST  -H "Content-Type: application/x-www-form-urlencoded" -d 'username=cdupont&password=password&grant_type=password&client_id=api-server&client_secret=4e9dcb80-efcd-484c-b3d7-1e95a0096ac0' "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | jq .access_token -r`

for i in {1..100}
do
  echo "Using concurrency $i"
  echo -n "$i " >> concperf.data
  #ab -n $i -c $i -H "Fiware-Service:waziup" "http://localhost:1026/v2/entities?limit=1000" | grep "Time per request" | awk '{print $4}' >> concperf.data
  ab -n $i -c $i -H "Authorization: Bearer $USERTOKEN" http://localhost:800/api/v2/devices?limit=1000 | grep "Time per request" | awk '{print $4}' >> concperf.data
  #ab -p "./post.txt" -v 4 -n $i -c $i -T "application/x-www-form-urlencoded" -H "Authorization: Bearer $USERTOKEN" "http://localhost:8080/auth/realms/waziup/protocol/openid-connect/token" | grep "Time per request" | awk '{print $4}' >> concperf.data
done
