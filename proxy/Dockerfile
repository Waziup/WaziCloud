FROM httpd

COPY proxy.conf /usr/local/apache2/conf/extra/

COPY ssl/server.crt /usr/local/apache2/conf/server.crt
COPY ssl/server.key /usr/local/apache2/conf/server.key

RUN sed -i '/proxy_module/s/^#//g' conf/httpd.conf
RUN sed -i '/ssl_module/s/^#//g' conf/httpd.conf
RUN sed -i '/rewrite_module/s/^#//g' conf/httpd.conf
RUN sed -i '/proxy_http_module/s/^#//g' conf/httpd.conf
RUN sed -i '/socache_shmcb_module/s/^#//g' conf/httpd.conf

RUN echo "Include conf/extra/proxy.conf" >> conf/httpd.conf
RUN echo "Include conf/extra/httpd-ssl.conf" >> conf/httpd.conf
