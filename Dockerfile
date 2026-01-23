FROM php:8.2-apache

# Installa estensioni PHP utili (pdo_mysql per MySQL)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Abilita mod_rewrite per Apache
RUN a2enmod rewrite

# Imposta cartella di lavoro
WORKDIR /var/www/html

# Configura DocumentRoot per il public folder
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/public>|g' /etc/apache2/apache2.conf

# Copia il codice dell'applicazione
COPY . /var/www/html/

# Imposta permessi
RUN chown -R www-data:www-data /var/www/html
