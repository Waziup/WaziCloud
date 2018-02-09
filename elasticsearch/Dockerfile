FROM docker.elastic.co/elasticsearch/elasticsearch-oss:6.2.0

COPY config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
USER root
RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/config/elasticsearch.yml
USER elasticsearch
