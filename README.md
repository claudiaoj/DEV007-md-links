
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

El siguiente diagrama de flujo representa el proceso de funcionamiento de la herramienta mdLinks. Proporciona una visión general de las principales etapas y acciones que se llevan a cabo durante su ejecución.


![diagramadeflujo](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/7f0d9b80-6c0f-4511-b4f0-848a76783dfb)


## 4. Documentación Técnica de la Libreria


## 5. Instalación y Guía de Uso



## 6. Pruebas Unitarias 
Los test realizados cubren el 85,1 de statements, 83,3% de branch, 81,25% de functions y 86,8% de lines.
<br>

![Captura de Pantalla 2023-08-01 a la(s) 14 05 12](https://github.com/claudiaoj/DEV007-md-links/assets/129541400/0e9cdca9-eb7e-4db2-9e86-ec117d08b701)


## 7. Checklist

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### README.md

* [ ] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [ ] Guía de uso e instalación de la librería

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


