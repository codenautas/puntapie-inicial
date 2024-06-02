# puntapie-inicial

Puntapié inicial para hacer una aplicación en backend-plus desde cero. 

*Es preferible seguir las instrucciones de puntapie-ejemplo*

# iniciar una aplicación nueva

Para mantener este módulo, actualizar versiones, mantener los tipos de ts ver las [instrucciones de mantenimeiento](docs/mantenimiento.md)

## requisitos para arrancar

Tener instalado:
   1. git (para windows [git-scm](https://git-scm.com/) y [TortoiseGit](https://tortoisegit.org/))
   2. [PostgreSQL](https://www.postgresql.org/) cualquier versión LST (16 como mínimo)
   3. [nodejs](https://nodejs.org/es/) cualquier versión LTS (20 como mínimo)
   4. [Visual Studio Code](https://code.visualstudio.com/)

## arrancar con la cáscara

Elegir un nombre para el sistema (por ejemplo "nueva app"). 

Si se va a usar el git como repositorio (github, gitlab o lo que sea),
crear el repositorio y clonarlo en una carpeta. Pero no clonar puntapie-inicial. 
Si no generar una carpeta en blanco (o del repositorio que sea).

Bajar el `puntapie-inicial` (sin clonar ni hacer branch) en la carpeta del sistema nuevo. 

```sh
cd nueva-app
git clone --bare https://github.com/codenautas/puntapie-inicial.git
cd puntapie-inicial.git
git push --mirror https://github.com/EL-OWNER-U-ORGANIZACION/nueva-app.git
cd ..
del puntapie-inicial.git /s
git clone https://github.com/EL-OWNER-U-ORGANIZACION/nueva-app.git .
git remote add upstream https://github.com/codenautas/puntapie-inicial.git
git remote -v
```
_Más info sobre `--bare` en [github docs](https://docs.github.com/es/repositories/creating-and-managing-repositories/duplicating-a-repository)_

En este punto se tiene un repo igual a _puntapie-inicial_. 

En ese momento hay dos alternativas, empezar a trabajar desde acá con la app vacía,
o bajarse el _puntapie-ejemplo_ que tiene algunas tablas y procedimientos. 

En ese segundo caso hay que bajarse el [![el zip del repo putapie-ejemplo](code-download.png)](https://github.com/codenautas/puntapie-ejemplo/archive/refs/heads/master.zip)

Y pisar todos los archivos que tiene la carpeta nueva-app.

En ambos casos:

Cambiar todas las ocurrencias de puntapie inicial por nueva app, 
respetando los guiones y rayas (- ó _) y las mayúsculas y minúsculas
(cómo dice en la sección [reemplazos](#reemplazos)). 
Eso debe hacerse tanto dentro de los archivos como en los nombres de los mismos. 

Copiar el archivo `example-local-config.yaml` en `local-config.yaml` 
y cambiar los parámetros necesarios (url, puertos, etc) .

En el caso de usar _puntapié ejemplo_ hay que buscar y cambiar a mano
todos los archivos o código que tenga la palabra ejemplo y borrar lo que no se necesite por ahora. 

## personalizarla

Los elementos para personalizarla son:
   1. El ícono de desarrollo 🏗 que está en `.vscode/settings.json "window-title"` 
   por cualquier otro [UNICODE](http://amp-what.com)
   2. La licencia (la que viene predeterminada es MIT) en el `package.json`
   3. El nombre, versión y título de la aplicación en `package.json` y el `README.MD`
   4. La gráfica en las carpetas `img` y `css` dentro de `src/unlogged` y `src/client` 
   5. Los usuarios inicials de prueba en `install/usuarios.tab`
   6. Partiendo de puntapie-ejemplo hay que borrar las tablas de ejemplo (archivos y objetos cuyo nombre contiene la palabra `ejemplo`).
   Agregar las tablas necesarias del sistema en `src` prefijándolas con `table-`. 
   7. Hay que corregir el menú
   8. Si no habrá página deslogueado:
      1. borrar `noLoggedUrlPath: /pub` del `local-config`
      2. borrar la funión `addUnloggedServices`
   9. Borrar los procedimientos de ejemplo y agregar los que se necesiten.

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

## ejemplo

Al instalar se puede ver una aplicación de ejemplo que muestra noticias (con título, fecha, autor y uno o más vínculos),
tiene dos tipos de usuarios, el administrador y los redactores. El administrador puede hacer lo que quiera con los datos.
Los redactores pueden agregar y modificar noticias, y publicarlas. 
No pueden ver las noticias de otros redactores hasta que no estén publicadas. 

Las tablas y procedimientos de ejemplo hay que borrarlo para empezar con la aplicación limpia. 
Simplemente hay que buscar la palabra ejemplo en el código fuente (y en los nombres de los archivos) para elimianarlo. 

### remplazos

Usando VSCode se pueden usar *expresionres regulares* (case sensitive) para busacar `puntapie([-_]?)inicial` y reemplazar por `nueva$1app`. Y luego `Puntapie([-_]?)Inicial` y reemplazar por `Nueva$1App`. 

### aprovechar los cambios en puntapie-inicial 
#### Volviendo a las fuentes del fork

Puntapié Inicial es un proyecto que muestra cómo arrancar una aplicación backend-plus con la configuración típica. 
A veces puede cambiar algo en el "boilerplate" o en las inclusiones recomendadas. 
Para eso hay que sincronizar con puntapie-inicial. 

**No hacer esto si hay trabajo sin comitear**

Las instrucciones para sincronizar con un fork cualquiera pueden verse en:
   * https://www.atlassian.com/git/tutorials/git-forks-and-upstreams

```sh
cd nueva-app
git remote add upstream https://github.com/codenautas/puntapie-inicial.git
git remote -v
git fetch upstream
git chekcout master
git merge upstream/main
```

Si da conflictos lo primero que hay que hacer es resolverlos y comitear. 

Luego revisar si los cambios son apropiados, si no revertirlos introduciendo el cambio contrario. 


## documentación

Está en [github](https://github.com/codenautas/backend-plus/blob/master/LEEME.md)
