# Requirements for authentication/authorization manager (AAM)

### Basic roles: 
- Developer – develops and publishes an app, provides support
- User – subscribes to an app
- Data provider – provides data (in the form of data channels) to the platform 

Roles can be also mixed – e.g. if a user owns the sensors and acts also as a data provider.

### Data subscription models:
-	Data are subscribed to by developers, who provide data in their apps to users.
(A business model could be based on of a flat rate or on the amount of users or requests served with the data.)
-	Data are subscribed to by users (or by developers on behalf of users). Users provide data to apps in order to benefit from some analytics/visualization offered by the apps.
(A business model could be based on a flat rate or on amount of apps or requests consuming the data.)

### Authentication/authorization manager (AAM) keeps track of the following:
-	developers, users and data providers - Each entity has one single identity, but may assume multiple roles.
-	applications published in the platform
-	what applications users are subscribed to and when their subscription ends
-	data channels a data provider provides and of the associated business model
-	data channels a developer/user is subscribed to, under which business model and when the subscription ends
-	data channels that an application is authorized to use on behalf of a developer or a user

### Data subscription models:

When a developer publishes an application, it authorizes it to use some of the data channels he/she is subscribed to.
When a user subscribes to an application, he/she authorizes to use certain data on his/her behalf.

## User Registeration and User Access

Here we provide a draft of workflows for user registeration and user interface to Waziup services. First, we need a service to register users. Then, we have another interface to provide user access to Waziup services.

### User Registeration:

User Information, including its roles (K8S (K8S admin), Developer, User, Data Provider, Sensor Provider). List of roles is not limited to these few. We define further roles as Waziup evovles. --------------> Waziup User Management Admin will check user information, and confirms user registeration if he validates user.


### User Access:

All user types will be directed to the same interface of KeyCloak with Waziup realm for authentication---> User Provides User/Pass --> KeyCloak authenticate a user ---> KeyCloak according to roles of a user redirects her to appropriate Waziup Service

For example, now we realized a user for K8S UI. For that, we defined a user in KeyCloak with the role of k8s, and when K8S admin logins he will be redirected to K8S UI.

We need to repeat the same step of other types of users.
