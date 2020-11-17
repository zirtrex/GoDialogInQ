# Obtener imagen de MySQL oficial
FROM mysql
#FROM mysql:5.6

# Agregar una base de datos
ENV MYSQL_DATABASE godialoginq

# Agregar el contenido de ./godialoginq.sql a la imagen
# Todos los scripts en docker-entrypoint-initdb.d/ son ejecutados
# automaticamente al iniciar
COPY ./docker_godialoginq.sql /docker-entrypoint-initdb.d/
COPY ./docker_godialoginq_views.sql /docker-entrypoint-initdb.d/