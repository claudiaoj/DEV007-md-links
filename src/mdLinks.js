import path from 'path';
import chalk from 'chalk';
import {
  pathExists, absolutePath, directory, extname, getStats, readMdFile,
  getMdFilesRecursive,
// eslint-disable-next-line import/extensions
} from './functions.js';

const mdLinks = (pathUser) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    // Si la ruta no existe, rechazamos la promesa con un mensaje de error
    reject(new Error('The route does not exist. Please enter a valid path'));
  }

  if (!absolutePath(pathUser)) {
    // Si la ruta no es absoluta, resolvemos la promesa usando path.resolve
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }

  if (directory(pathUser)) {
    // Obtenemos todos los archivos .md de todos los directorios usando getMdFilesRecursive
    const mdFiles = getMdFilesRecursive(pathUser);
    // eslint-disable-next-line max-len
    // Mapeamos los archivos .md obtenidos en un array de promesas llamando a mdLinks para cada uno de ellos
    const linksPromises = mdFiles.map((file) => mdLinks(file));
    // Usamos Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(linksPromises)
      .then((results) => results.flat()) // Concatenamos los resultados en un solo array de links
      .then((links) => {
        // eslint-disable-next-line max-len
        resolve(links.filter((link) => link.href)); // Filtramos los enlaces indefinidos antes de resolver la promesa
      })
      .catch((error) => reject(error)); // Si hay algún error, rechazamos la promesa con el error
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    // Si es un archivo .md, leer los links
    // Se utiliza map para recorrer cada objeto de enlace (link) del array devuelto por readMdFile
    const links = readMdFile(pathUser).map((link) => ({
      href: link.url,
      text: link.text,
      file: path.resolve(pathUser), // La ruta del archivo .md
    }));

    if (links.length === 0) {
      // Si el archivo .md no contiene links, resolvemos la promesa con un mensaje
      resolve(chalk.red.bold('It is a .md file, but it does not contain links.'));
    } else {
      // Si el archivo .md contiene links, resolvemos la promesa con el array de links
      resolve(links);
    }
  } else {
    // Si no es un archivo .md ni un directorio, rechazamos la promesa con un mensaje de error
    reject(new Error(chalk.red('it is a file, but it is not .md')));
  }
});

export default mdLinks;
