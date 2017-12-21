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
docker-compose pull
docker-compose up
```

You can then access Waziup platform on http://localhost

See [this file](INSTALL.md) for the installation instructions on Cloud platforms.


Develop
-------

To get the source code for each submodules, you need to clone with --recursive:
```
# clone the platform with submodules
git clone --recursive git@github.com:Waziup/Platform.git
cd Platform
docker-compose build
```

Tests
-----

You can run the test campain like this:
```
docker-compose up
./tests/platform_tests.sh
```

Or view the API documentation:
```
firefox localhost/docs
```


Debug
-----

If elasticsearch complains about virtual memory, run this command and restart:
```
sudo sysctl -w vm.max_map_count=262144
```

To export the keycloak configuration, run:
```
docker-compose run --entrypoint "/opt/jboss/docker-entrypoint.sh -b 0.0.0.0 -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/opt/jboss/keycloak/standalone/data/" keycloak
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

Copyright 2016.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

