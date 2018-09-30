#!/usr/bin/env sh 
envsubst '$$WAZIUP_BASE_URL' < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
