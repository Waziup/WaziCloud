
WAZIUP REST API
===============

This folder contains the external API of WAZIUP, in the file swagger.yaml.

Install [swagger-codegen](https://github.com/swagger-api/swagger-codegen).
To generate the server:
```
java -jar /home/cdupont/.local/bin/swagger-codegen-cli.jar generate -l python-flask -o test -i swagger.yaml
```

To generate the client:
```
java -jar /home/cdupont/.local/bin/swagger-codegen-cli.jar generate -l python -o test -i swagger.yaml
```
