echo "******** Starting the platform... **********"
docker-compose up > /dev/null &

attempt_counter=0
max_attempts=40
#Wait until the platform started
until $(curl --output /dev/null --silent --head --fail  http://localhost:800/api/v1/domains/waziup/sensors); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached: platform didn't start correctly"
      exit 1
    fi

    printf '.'
    attempt_counter=$(($attempt_counter+1))
    sleep 5
done

echo "******** Platform stated, running tests... *********"
cd tests
npm install
#run tests
npm test 2>&1 > log.txt
exit_code=$?
echo "******** Tests finished, stand by for the result... *********"
docker-compose down
echo "******** Tests results: ********"
cat log.txt
exit $exit_code

