FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql gd

RUN echo "upload_max_filesize=10M\npost_max_size=12M" > /usr/local/etc/php/conf.d/uploads.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel files
COPY . .

# Install dependencies
RUN composer install

# Expose port for Laravel server (8000)
EXPOSE 8000

# Run PHP Artisan Serve
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
