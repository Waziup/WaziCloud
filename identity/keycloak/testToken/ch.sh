

RESULT=`curl --data "client_secret=060be8ce-1a65-49ce-8939-48d2dc29ea4c&grant_type=password&client_id=orion-cli&username=waziup&password=waziup" http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token`

echo $RESULT
TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`
echo $TOKEN

echo -e "\n\n"
echo -e "Accessing orion.waziup.io/v1/data --> http://broker.waziup.io/v2/ \n"

#curl -v --data "client_secret=060be8ce-1a65-49ce-8939-48d2dc29ea4c&client_id=orion-cli&access_token=$TOKEN" -H "Authorization: Bearer $TOKEN" http://orion.waziup.io/v1/data/ 
curl -L -v  -H "Content-Type: application/x-www-form-urlencoded" \
    -H "Authorization: Bearer $TOKEN" \
    -d 'token=${TOKEN}' \
     "http://orion.waziup.io/v1/data/" 

   # -d 'token_type_hint=requesting_party_token&token=${TOKEN}' \
#-H "Authorization: Basic aGVsbG8td29ybGQtYXV0aHotc2VydmljZTpzZWNyZXQ=" \

#echo -e "Accessing orion.waziup.io/ \n"
#curl -v -L orion.waziup.io/ -H "Authorization: Bearer $TOKEN"

exit 0

#RESULT=`curl --data "client_secret=614a7645-cf5e-4999-98fc-c4ba401cea97&grant_type=password&client_id=curl-cli&username=waziup&password=waziup" http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token`



curl -X POST \
    -H "Authorization: Basic aGVsbG8td29ybGQtYXV0aHotc2VydmljZTpzZWNyZXQ=" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'token_type_hint=requesting_party_token&token=${RPT}' \

RESULT=`curl -v -X POST --basic -u orion-cli:060be8ce-1a65-49ce-8939-48d2dc29ea4c -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token`

TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`

curl -k -u waziup:waziup -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=$TOKEN' http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token/introspect

exit

#
#----->Apache


#echo -e "Accessing App: http://deis.waziup.io/v2 \n"
#curl api.waziup.io/v1/app -H "Authorization: bearer $TOKEN"
#https://squirrel-staging.wpic-tools.com/rest/tasks
