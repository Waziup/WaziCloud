
client_secret=a
client_id=confidentialClient
username=waziup
pass=waziup
auth_url=http://aam:8080/auth/realms/waziup/protocol/openid-connect/token

#RESULT=`curl --data "client_secret=060be8ce-1a65-49ce-8939-48d2dc29ea4c&grant_type=password&client_id=orion-cli&username=waziup&password=waziup" http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token`

result=`kubectl exec curl-deployment-2343139252-10ljh -- curl --data "grant_type=password&client_id=${client_id}&username=${username}&password=${pass}" ${auth_url}`

echo $result

access_token=`echo $result | sed 's/.*access_token":"//g' | sed 's/".*//g'`
id_token=`echo $result | sed 's/.*id_token":"//g' | sed 's/".*//g'`
echo $access_token

echo "id_token\n"

echo $id_token

kubectl exec curl-deployment-2343139252-10ljh -- curl -k -v -X POST -H 'Content-Type: application/x-www-form-urlencoded' --data 'token=${access_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -H "Authorization: Bearer ${access_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${access_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -H "Authorization: Bearer ${id_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${access_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -H "Authorization: Bearer ${access_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${id_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -X POST -H "Authorization: Bearer ${id_token}" -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&token=${id_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect
exit 0
#This is wrong, I think
kubectl exec curl-deployment-2343139252-10ljh -- curl -k -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'access_token=$access_token' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect
