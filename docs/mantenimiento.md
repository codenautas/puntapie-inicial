# Mantenimiento de puntapie-inicial y puntapie-ejemplo-noticias

Cada tanto hay que actualizar las versiones y ver que todo compile bien. 
Si se cambia puntapie-inicial hay que avanzar la base en puntapie-ejemplo-noticias

## prueba del sistema de ejemplo

### código fuente

Clonar, actualizar e instalar

```sh
git clone https://github.com/codenautas/puntapie-ejemplo-noticias
cd puntapie-ejemplo-noticias
ncu -u         # hay que tener instalado en npm-update-check
npm install
```

Si hay errores de imcompatibilidad de versione o errores de tipo hay que arreglarlos a mano e ir ejecutando
```sh
npm install      # o si el install no falló:
npm run prepare
```
hasta que no haya errores

### base de datos

copiar el archivo `example-local-config.yaml` en `local-config.yaml` y cambiar si es necesario el puerto del postgres y las contraseñas. 

Luego generar los archivos de creación de la base de datos y del esquema de tablas:

```sh
npm start -- --dump-db
```

Y crear la base de datos y las tablas:

Usando [coderun](https://github/codenautas/coderun):

```sh
c:\hecho\npm\coderun\devel\local-path.bat
run-sql create-db
run-sql create-schema
```

O a mano corriendo los scripts `local-db-dump-create-db.sql` y `local-db-dump.sql` en la base de datos usando el comando `psql`.

###

Arrancar el backend

```sh
npm start
```

Y abrir el navegador en [http://localhost:3000/puntapie_inicial](http://localhost:3000/puntapie_inicial) o el puerto que figure en `local-config.yaml`

###

El ejemplo corresponde a un portal de noticias breves y sus vínculos. 

En el menú administrar se pueden agregar usuarios o administrar qué noticias se publican o no. 

Los usuario son los redactores `jimmy/olsen` y `lois/lane` y el jefe `perry/white`