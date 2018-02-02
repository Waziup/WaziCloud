# https://github.com/elastic/elasticsearch-docker
FROM docker.elastic.co/elasticsearch/elasticsearch:6.0.0

COPY config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
USER root
RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/config/elasticsearch.yml
USER elasticsearch
