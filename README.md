# puntapie-inicial

Puntapié inicial para hacer una aplicación en backend-plus desde cero

# iniciar una aplicación nueva

## arrancar con la cáscara

Hay que bajar este repositorio (sin clonar ni hacer branch) en una carpeta de un repositorio nuevo. 

Elegir un nombre (por ejemplo "nueva app") y cambiar todas las ocurrencias de puntapie inicial por nueva app, 
respetando los guiones y rayas (- ó _) y las mayúsculas y minúsculas. 
Eso debe hacerse tanto dentro de los archivos como en los nombres de los mismos. 

Copiar el archivo `example-local-config.yaml` en `local-config.yaml`.

## instalarla

```sh
npm install
npm start -- --dump-db
```
Eso generará dos archivos de dump para crear la base de datos vacía y para crear las tablas en postgres

```sh
npm start
```

En el navegador ir a `localhost:3000/nueva_app` (o como se llame la aplicación). O a `localhost:3000/nueva_app/admin` 
para administrarla. 

## ejemplo

Al instalar se puede ver una aplicación de ejemplo que muestra noticias (con título, fecha, autor y uno o más vínculos),
tiene dos tipos de usuarios, el administrador y los redactores. El administrador puede hacer lo que quiera con los datos.
Los redactores pueden agregar y modificar noticias, y publicarlas. 
No pueden ver las noticias de otros redactores hasta que no estén publicadas. 

Las tablas y procedimientos de ejemplo hay que borrarlo para empezar con la aplicación limpia. 
Simplemente hay que buscar la palabra ejemplo en el código fuente (y en los nombres de los archivos) para elimianarlo. 

## documentación

Está en [github](https://github.com/codenautas/backend-plus/blob/master/LEEME.md)
