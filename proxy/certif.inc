ssl_certificate           /certs/live/dev.waziup.io/fullchain.pem;
ssl_certificate_key       /certs/live/dev.waziup.io/privkey.pem;
ssl on;
ssl_session_cache  builtin:1000  shared:SSL:10m;
ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
ssl_prefer_server_ciphers on;

