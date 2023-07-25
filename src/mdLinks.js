// import fs from 'fs'; // modulo fs, sistema de
// import chalk from 'chalk';
import path from 'path';

import {
  absolutePath, pathExists, getStats,
  directory, extname, readMdFile,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función mdLinks
const mdLinks = (pathUser /* options */) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    reject(new Error('The route does not exist. Please enter a valid path'));
  }
  if (!absolutePath(pathUser)) {
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }
  if (getStats(pathUser).isFile()) {
    if (extname(pathUser) === '.md') {
      // Si es un archivo .md, leer los links
      const links = readMdFile(pathUser).map((link) => ({
        href: link.url,
        text: link.text,
        file: path.resolve(pathUser),
      }));

      if (links.length === 0) {
        resolve('It is a .md file, but it does not contain links.');
      } else {
        resolve(links);
      }
    } else {
      reject(new Error('Not a .md file'));
    }
  }
  if (directory(pathUser)) {
    resolve('Is a directory');
  }
});

export default mdLinks;
