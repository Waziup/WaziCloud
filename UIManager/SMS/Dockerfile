FROM php:fpm
RUN apt-get update && apt-get install -y libmcrypt-dev


# lumen packages
RUN apt-get install -y php5-memcached
RUN docker-php-ext-install mcrypt mbstring tokenizer mysqli pdo_mysql


RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/bin --filename=composer

COPY smsapp /app/
WORKDIR /app

RUN composer install

CMD php artisan migrate; php artisan serve -vvv --host=0.0.0.0 --port=8000
