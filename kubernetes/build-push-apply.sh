
docker build -t waziup/$1 .
docker push waziup/$1
kubectl delete -f $1.yaml --now
kubectl apply -f $1.yaml
