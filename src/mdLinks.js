// import fs from 'fs'; // modulo fs, sistema de
// import chalk from 'chalk';
import path from 'path';

import {
  absolutePath, pathExists, file,
  directory, extname, readMdFile,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función mdLinks
const mdLinks = (pathUser /* options */) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    reject(new Error('La ruta no existe. Por favor, ingresa una ruta valida.'));
  }
  if (!absolutePath(pathUser)) {
    resolve(`La ruta absoluta es: ${path.resolve(pathUser)}`);
  }
  if (file(pathUser).isFile()) {
    if (extname(pathUser) === '.md') {
      // Si es un archivo .md, leer los links
      const links = readMdFile(pathUser);
      if (links.length === 0) {
        resolve('Es un archivo .md, pero no contiene links.');
      } else {
        resolve(links);
      }
    } else {
      reject(new Error('No es un archivo .md'));
    }
  }
  if (directory(pathUser)) {
    resolve('Es un directorio');
  }
});

export default mdLinks;
