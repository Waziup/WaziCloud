
client_secret=db987cd0-a513-4ce1-9cd3-7104e4f2975f
client_id=mynginx
username=adminwaziup
pass=waziup
auth_url=http://aam:8080/auth/realms/waziup/protocol/openid-connect/token
introspect_url=${auth_url}/introspect

#Get token
result=`kubectl exec curl-deployment-2343139252-10ljh -- curl --data "grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${pass}" ${auth_url}`
echo $result

access_token=`echo $result | sed 's/.*access_token":"//g' | sed 's/".*//g'`
id_token=`echo $result | sed 's/.*id_token":"//g' | sed 's/".*//g'`

echo "access_token\n"
echo $access_token

echo "id_token\n"
echo $id_token

echo "Accessing https://aam/kcamm\n"

kubectl exec curl-deployment-2343139252-10ljh -- curl -k -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&token=${access_token}' https://172.17.0.6/kcaam

echo "Accessing https://aam/ngamm\n"

kubectl exec curl-deployment-2343139252-10ljh -- curl -k -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&access_token=${access_token}' https://172.17.0.6/ngaam

echo "Accessing http://identityproxy/\n"

kubectl exec curl-deployment-2343139252-10ljh -- curl -k -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&access_token=${access_token}' http://identityproxy/

exit 

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&access_token=${access_token}' https://172.17.0.6/kcaam

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&access_token=${access_token}' https://172.17.0.6/ngaam

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam' -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&access_token=${access_token}&id_token=${id_token}'  https://172.17.0.6/

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam'  https://172.17.0.7/kcaam

kubectl exec curl-deployment-2343139252-10ljh -- curl -k  https://172.17.0.6:443
kubectl exec curl-deployment-2343139252-10ljh -- curl -k  https://identityproxy

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk https://identityproxy -H "host: aam"

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam'  https://172.17.0.7/kcaam
kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam'  https://172.17.0.7/ngaam
kubectl exec curl-deployment-2343139252-10ljh -- curl -vk -H 'Host: aam'  https://identityproxy/ngaam

kubectl exec curl-deployment-2343139252-10ljh -- curl -vk  https://identityproxy/ng


url -H "Authorization: Bearer ${access_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${access_token}' $introspect_url

curl -k -u waziup:waziup -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=$TOKEN' http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token/introspect
curl -k -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=$rpt' http://orion.waziup.io/

curl -X POST \
    -H "Authorization: Basic aGVsbG8td29ybGQtYXV0aHotc2VydmljZTpzZWNyZXQ=" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'token_type_hint=requesting_party_token&token=${RPT}' \
    "http://localhost:8080/auth/realms/hello-world-authz/protocol/openid-connect/token/introspect"
exit

kubectl exec curl-deployment-2343139252-10ljh -- curl -H "Authorization: Bearer ${id_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${access_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -H "Authorization: Bearer ${access_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=${id_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect

kubectl exec curl-deployment-2343139252-10ljh -- curl -X POST -H "Authorization: Bearer ${id_token}" -H 'Content-Type: application/x-www-form-urlencoded' --data 'token_type_hint=requesting_party_token&token=${id_token}' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect
exit 0
#This is wrong, I think
kubectl exec curl-deployment-2343139252-10ljh -- curl -k -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'access_token=$access_token' http://aam:8080/auth/realms/waziup/protocol/openid-connect/token/introspect
