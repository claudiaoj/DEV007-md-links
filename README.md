
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


![diagramadeflujo](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/7f0d9b80-6c0f-4511-b4f0-848a76783dfb)


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
<br><br>![ej1](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/d4e3290c-c939-4f64-a96a-6ebd50548f13)


<br>__Ejemplo 2__: `mdlinks <ruta del archivo>`
<br><br>
![2](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/42eefe08-418a-4115-864e-cced64a385c7)
<br>

A continuación, para obtener los links de los archivos o directorios, de la ruta absoluta indicada, debes colocar en la terminal:                                                
<br>__Ejemplo 1:__ `npx mdlinks <ruta absoluta>` 
<br><br>![ej1 1](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/4a36494f-bac3-49a9-b435-6678c1a70ed8)

<br><br>__Ejemplo 2 :__ `mdlinks <ruta absoluta>`
<br><br>![ej2 1](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/710d9fd7-dfc4-4104-950c-5701105855cc)


Ahora, puedes colocar la opciones disponibles de `--validate`, `--stats`ó `--validate --stats` para conocer los links válidos y las estadísticas de los links encontrados:

<br>__Ejemplo 1:__ `npx mdlinks <ruta absoluta> --validate` - `npx mdlinks <ruta absoluta> --stats` - `npx mdlinks <ruta absoluta> --validate --stats`
<br><br>![ej1 v s ](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/68ecd901-7ca6-4361-8877-734d608ed598)

<br><br>__Ejemplo 2 :__ `mdlinks <ruta absoluta> --validate` - `mdlinks <ruta absoluta> --stats` - `mdlinks <ruta absoluta> --validate --stats`
<br><br>![ej2 v s](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/7809456a-ce05-4fce-b4e5-633c5ddfb349)

<br> ***Importante: puedes utilizar `--validate` reemplazándolo por `--v`, `--stats` por `--s` y `--validate --stats` por `--v --s`***
<br>
<br>
Finalmente, existen otros mensajes que pueden aparecen en caso de que se coloque una ruta no válida o inexistente, al indicar que es un archivo pero no .md o si el archivo/directorio no contiene links.

__Ejemplos :__
<br><br> __*Ruta no válida o inexistente <br>__
![path inválido](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/75885368-bbbd-457b-aaee-bbb1e99a3557)
<br><br> __*Es un archivo pero no .md <br>__
![nomd](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/61ceeaa3-c214-40c8-8ef4-dd81b3626282)
<br><br> __*El archivo/directorio no contiene links <br>__
![fileempty](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/67e39fe4-7fe8-456d-a23b-a6b152bae85a)



## 6. Pruebas Unitarias 
Los test realizados cubren el 85,1 de statements, 83,3% de branch, 81,25% de functions y 86,8% de lines.
<br>

![Captura de Pantalla 2023-08-01 a la(s) 14 05 12](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/0e9cdca9-eb7e-4db2-9e86-ec117d08b701)


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


