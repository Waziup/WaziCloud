FROM php:fpm
RUN apt-get update && apt-get install -y libmcrypt-dev


# lumen packages
RUN apt-get install -y php5-memcached
RUN docker-php-ext-install mcrypt mbstring tokenizer mysqli pdo_mysql


RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/bin --filename=composer

RUN cd /app && composer install

COPY app /app/
WORKDIR /app/public


CMD php ../artisan migrate; php-fpm
CMD php ../artisan serve --host=localhost --port=80;