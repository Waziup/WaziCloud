FROM centos:latest
RUN yum -y install epel-release
RUN yum -y upgrade
RUN yum -y install https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.1.2/mod_auth_openidc-2.1.2-1.el7.centos.x86_64.rpm https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.1.0/cjose-0.4.1-1.el7.centos.x86_64.rpm 
RUN yum -y install mod_ssl
RUN rm -f /etc/httpd/conf.d/ssl.conf
COPY identityproxy.conf /etc/httpd/conf.d
EXPOSE 80/tcp
ENTRYPOINT /usr/sbin/httpd -k start -X
#ENTRYPOINT /bin/bash
#CMD /usr/sbin/httpd -DFOREGROUND
