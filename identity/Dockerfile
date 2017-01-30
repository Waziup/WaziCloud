FROM centos:latest
RUN yum -y install epel-release
RUN yum -y upgrade
RUN yum -y install https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.1.2/mod_auth_openidc-2.1.2-1.el7.centos.x86_64.rpm https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.1.0/cjose-0.4.1-1.el7.centos.x86_64.rpm 
COPY identityproxy.conf /etc/httpd/conf.d
#RUN echo "<html><body>Public content.</body></html>" > /var/www/html/index.html
#RUN mkdir -p /var/www/html/private
#RUN echo "<html><body>Private content.</body></html>" > /var/www/html/private/index.html
EXPOSE 80/tcp
ENTRYPOINT /usr/sbin/httpd -DFOREGROUND
#ENTRYPOINT /usr/bin/bash
