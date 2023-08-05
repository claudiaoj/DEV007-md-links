
![header](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/997cd8e5-1828-4da9-8942-2c9e8c5bc861)

# Markdown Link

## Índice

* [1. Introducción](#1-introducción)
* [2. Resumen del Proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de Flujo](#3-diagrama-de-flujo)
* [4. Documentación Técnica de la Libreria](#4-documentación-técnica-de-la-libreria)
* [5. Instalación y Guía de Uso](#5-instalación-y-guía-de-uso)
* [6. Pruebas Unitarias](#6-pruebas-unitarias)
* [7. Checklist](#7-checklist)
* [8. Board con la Implementación de la Librería](#8-board-con-la-implementación-de-la-librería)

***

## 1. Introducción

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md.

Estos archivos Markdown normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Resumen del Proyecto

MdLinks es una herramienta de línea de comandos desarrollada en Node.js que te permite analizar archivos Markdown y extraer información sobre los enlaces presentes en ellos. Se caracteriza por:

*Entregar información detallada, verificando la válidez de cada enlace de los archivos Markdow y proporcionando detalles como la URL, el texto y el estado de cada enlace encontrado.

*Puedes analizar rápidamente los archivos Markdown y obtener información sobre los enlaces sin tener que hacerlo manualmente.

## 3. Diagrama de Flujo

El diagrama de flujo representa el proceso de funcionamiento de la herramienta mdLinks. Proporciona una visión general de las principales etapas y acciones que se llevan a cabo durante su ejecución.


<br><br><img src="/images/diagramadeflujo.png" style= width:80%>


## 4. Documentación Técnica de la Libreria

### 1) JavaScript API

#### mdLinks(path, options)

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `text`: Texto que aparecía dentro del link (`<a>`).
* `href`: URL encontrada.
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `text`: Texto que aparecía dentro del link (`<a>`).
* `href`: URL encontrada.
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.


### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.
<br>
`Total: 3
Unique: 3`
<br>
<br>
También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.
<br>
`Total: 3 
Unique: 3 
Broken: 1 
`
<br>

## 5. Instalación y Guía de Uso

### Instalación
La librería se puede instalar con el siguiente comando desde la terminal:<br>
1) **Instalación del paquete en tu proyecto actual <br>**
   ```text
   npm i claudiaortiz-mdlinks
   ```
2) **Instalación del paquete de forma global, para que puedas usar en todos tus proyectos** <br>
   ```text
   npm i claudiaortiz-mdlinks -g
   ```

### Guía de Uso
* Si utilizas la opción número 1 `npm i claudiaortiz-mdlinks`, debes colocar en la terminal `npx mdlinks + <ruta del archivo>` <br>
* Si utilizas la opción número 2 `npm i claudiaortiz-mdlinks -g`, debes colocar en la terminal `mdlinks + <ruta del archivo>`


Luego de la instalación puedes colocar alguno de los dos comandos indicados anteriormente `npx mdlinks <ruta del archivo>` ó `mdlinks <ruta del archivo>`. En ambos casos, te entregará la ruta absoluta para luego utilizarla.
<br>
<br>__Ejemplo 1__: `npx mdlinks <ruta del archivo>`
<br><br><img src="/images/ej1.png" style= width:75%>


<br>__Ejemplo 2__: `mdlinks <ruta del archivo>`
<br><br><img src="/images/ej2.png" style= width:75%>
<br>

A continuación, para obtener los links de los archivos o directorios, de la ruta absoluta indicada, debes colocar en la terminal:                                                
<br>__Ejemplo 1:__ `npx mdlinks <ruta absoluta>` 
<br><br><img src="/images/ej1.1.png" style= width:85%>

<br><br>__Ejemplo 2 :__ `mdlinks <ruta absoluta>`
<br><br><img src="/images/ej2.1.png" style= width:85%>


Ahora, puedes colocar la opciones disponibles de `--validate`, `--stats`ó `--validate --stats` para conocer los links válidos y las estadísticas de los links encontrados:

<br>__Ejemplo 1:__ `npx mdlinks <ruta absoluta> --validate` - `npx mdlinks <ruta absoluta> --stats` - `npx mdlinks <ruta absoluta> --validate --stats`
<br><br><img src="/images/ej1.2v.png" style= width:85%>
<img src="/images/ej1.3vs.png" style= width:85%>

<br><br>__Ejemplo 2 :__ `mdlinks <ruta absoluta> --validate` - `mdlinks <ruta absoluta> --stats` - `mdlinks <ruta absoluta> --validate --stats`
<br><br><img src="/images/ej2.2v.png" style= width:85%>
<img src="/images/ej2.3vs.png" style= width:85%>

<br> ***Importante: puedes utilizar `--validate` reemplazándolo por `--v`, `--stats` por `--s` y `--validate --stats` por `--v --s`***
<br>
<br>
Finalmente, existen otros mensajes que pueden aparecen en caso de que se coloque una ruta no válida o inexistente, al indicar que es un archivo pero no .md o si el archivo/directorio no contiene links.

__Ejemplos :__
<br><br> __*Ruta no válida o inexistente <br>__
<img src="/images/pathinvalid.png" style= width:75%>
<br><br> __*Es un archivo pero no .md <br>__
<img src="/images/nomd.png" style= width:75%>
<br><br> __*El archivo/directorio no contiene links <br>__
<img src="/images/fileempty.png" style= width:75%>



## 6. Pruebas Unitarias 
Los test realizados cubren el 85,1 de statements, 83,3% de branch, 81,25% de functions y 86,8% de lines.
<br>

<img src="/images/test.png" style= width:50%>



## 7. Checklist

### General

* [x] Puede instalarse via `npm install --global <github-user>/md-links`

### README.md

* [x] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [x] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).


## 8. Board con la Implementación de la Librería

Puedes visualizar el backlog con la implementación de la librería en <a href="https://github.com/users/claudiaoj/projects/1/views/1">Github Project</a>.
