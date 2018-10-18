![travis](https://travis-ci.org/Waziup/Platform.svg?branch=master)


WAZIUP platform
===============

The WAZIUP platform is an IoT Big Data platform.
It allows to create IoT applications and deploy them both in the Cloud and in the local gateway.

For information and documentation: http://www.waziup.io

Install
-------

To install the platform, first clone it:
```
git clone git@github.com:Waziup/Platform.git
cd Platform
```

Then pull the images and run it:
```
sudo chmod 777 data/* -R
docker-compose pull
docker-compose up
```

This will take a while. Once finished, you can then access Waziup platform on http://localhost:3000

See [this file](INSTALL.md) for the installation instructions on Cloud platforms.

To run a light version of the platform, run:
```
docker-compose up api-server orion mongo dashboard keycloak socials
```

Develop
-------

To get the source code for each submodules, you need to clone with --recursive:
```
# clone the platform with submodules
git clone --recursive git@github.com:Waziup/Platform.git
cd Platform
git submodule update --remote --recursive
docker-compose build
```

Tests
-----

You can run the test campain like this:
```
./run_tests.sh
```

Or view the API documentation:
```
firefox localhost/docs
```

Backup
------

`mysqldump` is used to backup user database.
```
mysqldump -h dev.waziup.io -P 3306 -u root -proot_password --all-databases > /var/backups/mysqlbackups/`date +"%m-%d-%y"`
```

Restore the data:
```
mysql -u root -proot_password -h 127.0.0.1 <  /var/backups/mysqlbackups/`date +"%m-%d-%y"`
```

`mongodump` is used to backup sensor data:
```
mongodump --host dev.waziup.io --port 27017 --out /var/backups/mongobackups/`date +"%m-%d-%y"`
```

This command restores it in the local instance:
```
mongorestore /var/backups/mongobackups/`date +"%m-%d-%y"`
```

Debug
-----

If elasticsearch complains about virtual memory, run this command and restart:
```
sudo sysctl -w vm.max_map_count=262144
```

To export the keycloak configuration, run:
```
docker-compose run --entrypoint "/opt/jboss/tools/docker-entrypoint.sh -b 0.0.0.0 -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/opt/jboss/keycloak/standalone/data/" keycloak
#Stop keycloak when start-up is finished
cd data/keycloak
mv master-realm.json master-users-0.json waziup-realm.json waziup-users-0.json ../../keycloak/imports
```
Rebuild Keycloak image:
```
docker-compose build keycloak
docker-compose push keycloak
```

Copyright
---------

Copyright Waziup consortium 2018.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

