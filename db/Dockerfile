FROM mysql:8.0

ENV MYSQL_DATABASE=gonguerie \
    MYSQL_USER=gonguerie \
    MYSQL_PASSWORD=gonguerie \
    MYSQL_ROOT_PASSWORD=rootpass

# Preload schema
COPY schema.sql /docker-entrypoint-initdb.d/01-schema.sql

EXPOSE 3306
