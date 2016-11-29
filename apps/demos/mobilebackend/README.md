# wm-backend

## Installation

Clone the repository and run the following commands under your project root:

```shell
npm install
npm start
```

## Install on Kubernetes

```
$ docker build -t waziup/mobilebackend .
$ docker push waziup/mobilebackend
$ kubectl delete -f mobilebackend.yaml
$ kubectl apply -f mobilebackend.yaml 
```

