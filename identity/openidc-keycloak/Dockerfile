FROM solsson/httpd-openidc

COPY identityproxy.conf /usr/local/apache2/conf/extra/

RUN sed -i '/proxy_module/s/^#//g' conf/httpd.conf
RUN sed -i '/ssl_module/s/^#//g' conf/httpd.conf
RUN sed -i '/rewrite_module/s/^#//g' conf/httpd.conf
RUN sed -i '/proxy_http_module/s/^#//g' conf/httpd.conf

#comment out
#RUN sed -i '/ssl_module/s/^/#/g' conf/httpd.conf
RUN echo "Include conf/extra/identityproxy.conf" >> conf/httpd.conf
