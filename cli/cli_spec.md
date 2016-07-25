
WAZIUP CLI
==========

This document describes the command line interface for WAZIUP.
The command line is named "waziup".
It is used by the end users and developers to interact with the WAZIUP platform.
Here are the top level commands:

- auth
- apps
- gateways
- sensors
- users


Authentication
--------------
The command `auth` allows to register, login and logout from the platform.
Here is an example:

```
$ waziup auth register --name=cdupont --password=**** http://www.waziup.io
```

### register

This sub-command allows to create a new user in the platform.
The request will be forwarded to the identity manager.

```
Usage: waziup auth register <controller> [--username] [--password] [--email]

Arguments:
<controller> is the address of the WAZIUP Cloud platform.

Options:
  --username=<username>
    provide a username for the new account.
  --password=<password>
    provide a password for the new account.
  --email=<email>
    provide an email address.
```

### login

This sub-command allows to login into the platform.
The request will be forwarded to the identity manager.
After the login, all other commands will user that identity (until the logout or a delay is elapsed).

```
Usage: waziup auth login <controller> [--username] [--password]

Arguments:
<controller> is the address of the WAZIUP Cloud platform.

Options:
  --username=<username>
    provide a username for the new account.
  --password=<password>
    provide a password for the new account.
```


### logout

This sub-command allows to logout from the platform.
The request will be forwarded to the identity manager.

```
Usage: waziup auth logout
```

apps
----

This command gives access to the PaaS functionalities.
Example: 

```
$ waziup apps create
```
This command will register the application present in the current directory with the DEIS controller.

Subcommands:

- create
- list
- deploy
- scale
- destroy

###create

Creates an application in WAZIUP platform using the current folder.

```
Usage: waziup apps create

Options:
  -b --buildpack BUILDPACK
    a buildpack url to use for this app
```

###list

Lists the applications owned by the current user.
```
Usage: waziup apps list
```

###deploy

Deploy the application in the current directory.
This command will trigger the compilation and deployement of the application in the Cloud instance and in the attached gateways.
This deployement is guided by the Manifest file (+ Dockerfile).

```
Usage: waziup apps deploy
```

###scale

Scale the application.
This will scale up the number of Cloud instances of the application.

```
Usage: waziup apps scale <type>=<num>

Arguments:
  <type>
    the process name as defined in the Procfile, such as 'web' or 'worker'.
    Note that Dockerfile apps have a default 'cmd' process type.
  <num>
    the number of processes.

Options:
  -a --app=<app>
    the uniquely identifiable name for the application.

```

###destroy

Destroy an application.
This will remove the corresponding running application from WAZIUP.

```
Usage: waziup apps destroy
```


gateways
--------

This command allows to manage the connected gateways.
Example:

```
$ waziup gateway add http://123.456.1.1
```

This command adds the device located at IP `123.456.1.1`.

subcommands:

- add
- remove
- list
- sensors

###add

Add a gateway.
This will add a new gateway to the WAZIUP platform and connect it.

```
Usage: waziup gateway add <gatewayIP>

Arguments:
  <gatewayIP>
    The IP of the gateway.
```

###remove

Remove a gateway.
This will remove a connected gateway from the WAZIUP platform.

```
Usage: waziup gateway remove <gatewayIP>

Arguments:
  <gatewayIP>
    The IP of the gateway.
```

###list

List connected gateways.

```
Usage: waziup gateway list
```


###sensors

List sensors connected to a specific gateway.

```
Usage: waziup gateway sensors <gatewayIP>

Arguments:
  <gatewayIP>
    The IP of the gateway.
```


users
-----

Users management.
Subcommands:

- add
- remove
- list


data
----

This command gives statistics on the data collected by sensors and from internet sources.

Example:

```
$ waziup data observations
```

This command lists the observations currently in the database.

subcommands:

- observations

###observations

Gives the lists of observations currently in the database.
The output is in yaml/json so it can be further filtered.

```
Usage: waziup data observations
```
