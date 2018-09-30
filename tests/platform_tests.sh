
URL=${1:-localhost}

echo "Running tests on $URL"

curl -s $URL > /dev/null
dashbordRet=$?

if [ $dashbordRet -eq 0 ]; then
   echo Dashboard up
else
   echo Dashboard down
fi

curl -s $URL:8080 > /dev/null
keycloakRet=$?

if [ $keycloakRet -eq 0 ]; then
   echo Keycloak up
else
   echo Keycloak down
fi

curl -s $URL/api/v1/orion > /dev/null
orionRet=$?

if [ $orionRet -eq 0 ]; then
   echo Orion up
else
   echo Orion down
fi

if [ $dashbordRet -eq 0 ] && [ $keycloakRet -eq 0 ] && [ $orionRet -eq 0 ] && [ $elsRet -eq 0 ] && [ $kibanaRet -eq 0 ]; then
   echo Platform tests: Success
   true
else
   echo Platform tests: Failure
   false
fi
