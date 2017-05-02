client_secret="060be8ce-1a65-49ce-8939-48d2dc29ea4c"
client_secret_base64=`echo $client_secret | base64 -`
client_id=orion-cli
username=waziup
pass=waziup
auth_url=http://aam.waziup.io/auth/realms/waziup/protocol/openid-connect/token
introspect_url=${auth_url}/introspect
authz_url=http://aam.waziup.io/auth/realms/waziup/authz/authorize
permission_url=http://aam.waziup.io/auth/realms/waziup/authz/protection/permission
entitlement_url=http://aam.waziup.io/auth/realms/waziup/authz/entitlement/${client_id}

#Get token
result=`curl --data "grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${pass}" ${auth_url}`
echo $result

access_token=`echo $result | sed 's/.*access_token":"//g' | sed 's/".*//g'`
id_token=`echo $result | sed 's/.*id_token":"//g' | sed 's/".*//g'`

echo "access_token\n"
echo $access_token

echo "id_token\n"
echo $id_token


rpt_call=`curl -X GET -H "Authorization: Bearer ${access_token}"  "${entitlement_url}"`

rpt=`echo $rpt_call | sed 's/.*rpt":"//g' | sed 's/".*//g'`

echo "rpt: $rpt"
curl -kv -X POST -H "Authorization: Bearer ${access_token}" --data 'token_type_hint=requesting_party_token&token=${rpt}' http://orion.waziup.io/v1/data/

exit 
echo "SECOND CALL"
curl -kv -u waziup:waziup -H "Authorization: Bearer ${access_token}" -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token_type_hint=requesting_party_token&token=$rpt' http://orion.waziup.io/v1/data/

exit

#AAT
curl -kv -X POST \
    -H "Authorization: Bearer ${client_secret_base64}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'username=${username}&password=${pass}&client_id=${client_id}&grant_type=client_credentials' \
    "${auth_url}"

#PAT
curl -kv -X POST \
    -H "Authorization: Bearer ${client_secret_base64}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'grant_type=client_credentials&client_id=${client_id}' \
    "${auth_url}"

AAT=$access_token
AAT=$access_token
AAT=`echo $access_token | base64 -`

#RPT
curl -kv -X POST \
    -H "Authorization: Bearer ${AAT}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d '{"ticket" : 798687d9-d4c4-4488-a92e-2da363f12024}' \
    "${authz_url}"

PERMISSION_TICKET="798687d9-d4c4-4488-a92e-2da363f12024"

#Get Permission
curl -kv -X POST \
   -H "Authorization: Bearer ${AAT}" \
   -H "Content-Type: application/x-www-form-urlencoded" \
   -d '{"resource_set_id": "orion-cli"}' \
    "${permission_url}"

#   -d '{"resource_set_id": "798687d9-d4c4-4488-a92e-2da363f12024"}' \


exit 
curl -X POST \
    -H "Authorization: Basic aGVsbG8td29ybGQtYXV0aHotc2VydmljZTpzZWNyZXQ=" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'token_type_hint=requesting_party_token&token=${RPT}' \
    "http://localhost:8080/auth/realms/hello-world-authz/protocol/openid-connect/token/introspect"

