# puntapie-inicial

Puntapié inicial para hacer una aplicación en backend-plus desde cero

# iniciar una aplicación nueva

Para mantener este módulo, actualizar versiones, mantener los tipos de ts ver las [instrucciones de mantenimeiento](docs/mantenimiento.md)

## requisitos para arrancar

Tener instalado:
   1. git (para windows [git-scm](https://git-scm.com/) y [TortoiseGit](https://tortoisegit.org/))
   2. [PostgreSQL](https://www.postgresql.org/) versión 12 como mínimo
   3. [nodejs](https://nodejs.org/es/) versión 14 como mínimo
   4. [Visual Studio Code](https://code.visualstudio.com/)

## arrancar con la cáscara

Elegir un nombre para el sistema (por ejemplo "nueva app"). 

Si se va a usar el github como repositorio se puede hacer un fork de puntapie-inicial. 
Si no se puede crear el repositorio de cero y copiar el contenido actual de puntapie-inicial. 

Bajar el `puntapie-inicial` (sin clonar ni hacer branch) en la carpeta del sistema nuevo. 

[![code download zip](code-download.png)](https://github.com/codenautas/puntapie-inicial/archive/refs/heads/master.zip)

Cambiar todas las ocurrencias de puntapie inicial por nueva app, 
respetando los guiones y rayas (- ó _) y las mayúsculas y minúsculas
(cómo dice en la sección [reemplazos](#reemplazos)). 
Eso debe hacerse tanto dentro de los archivos como en los nombres de los mismos. 

Copiar el archivo `example-local-config.yaml` en `local-config.yaml` 
y cambiar los parámetros necesarios (url, puertos, etc) .

## personalizarla

Los elementos para personalizarla son:
   1. El ícono de desarrollo 🏗 que está en `.vscode/settings.json "window-title"` 
   por cualquier otro [UNICODE](http://amp-what.com)
   2. La licencia (la que viene predeterminada es MIT) en el `package.json`
   3. El nombre, versión y título de la aplicación en `package.json` y el `README.MD`
   4. La gráfica en las carpetas `img` y `css` dentro de `src/unlogged` y `src/client` 
   5. Los usuarios inicials de prueba en `install/usuarios.tab`
   7. Hay que agregar las opciones al menú
   8. Si habrá página deslogueado (ver ejemplo):
      1. agregar `noLoggedUrlPath: /pub` en el `def-config` 
      2. agregar la funión `addUnloggedServices`
   9. Agregar los procedimientos que se necesiten

## instalarla

```sh
npm install
npm start -- --dump-db
```
Eso generará dos archivos de dump para crear la base de datos vacía y para crear las tablas en postgres.

```sh
npm start
```

En el navegador ir a `localhost:3000/nueva_app` (o como se llame la aplicación). O a `localhost:3000/nueva_app/admin` 
para administrarla. 

Una manera simple (y peligrosa) para correr todo (que borra la base de datos cada vez) es:
`rem call npm run prepare && call npm start -- --dump-db && call run-sql create-schema && call npm start`

## repositorio de ejemplo

Se puede ver un ejemplo en [puntapie-ejemplo-noticias](https://github.com/codenautas/puntapie-ejemplo-noticias). 

### remplazos

Usando VSCode se pueden usar *expresionres regulares* (case sensitive) para busacar `puntapie([-_]?)inicial` y reemplazar por `nueva$1app`. Y luego `Puntapie([-_]?)Inicial` y reemplazar por `Nueva$1App`. 

### aprovechar los cambios en puntapie-inicial 
#### Volviendo a las fuentes del fork

Puntapié Inicial es un proyecto que muestra cómo arrancar una aplicación backend-plus con la configuración típica. 
A veces puede cambiar algo en el "boilerplate" o en las inclusiones recomendadas. 
Para eso hay que sincronizar con puntapie-inicial. 

Las instrucciones para sincronizar con un fork cualquiera pueden verse en:
   * https://www.atlassian.com/git/tutorials/git-forks-and-upstreams

## documentación

Está en [github](https://github.com/codenautas/backend-plus/blob/master/LEEME.md)
