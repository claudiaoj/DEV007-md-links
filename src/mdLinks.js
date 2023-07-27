import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import {
  pathExists, absolutePath, directory, extname, getStats, readMdFile, getMdFilesRecursive,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función para validar un enlace
const validateLink = (link) => new Promise((resolve) => {
  const validatedLink = { ...link };
  axios.get(link.href)
    .then((response) => {
      validatedLink.status = response.status;
      validatedLink.statusText = response.statusText;
      resolve(validatedLink);
    })
    .catch(() => {
      validatedLink.status = 404;
      validatedLink.statusText = 'Not Found';
      resolve(validatedLink);
    });
});

// Función para calcular las estadísticas de los enlaces
const calculateStats = (links) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((link) => link.href)).size;
  const brokenLinks = links.filter((link) => link.status >= 400).length;
  return { totalLinks, uniqueLinks, brokenLinks };
};

// Función principal mdLinks
// eslint-disable-next-line max-len
const mdLinks = (pathUser, { validate = false, stats = false } = {}) => new Promise((resolve, reject) => {
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
    const linksPromises = mdFiles.map((file) => mdLinks(file, { validate }));
    // Usamos Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(linksPromises)
      .then((results) => results.flat())
      .then((links) => {
        if (stats) {
          const statsResult = calculateStats(links);
          resolve(statsResult);
        } else {
          resolve(links.filter((link) => link.href));
        }
      })
      .catch((error) => reject(error));
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    // Si es un archivo .md, leer los links
    // Se utiliza map para recorrer cada objeto de enlace (link) del array devuelto por readMdFile
    const links = readMdFile(pathUser).map((link) => ({
      href: link.url,
      text: link.text,
      file: path.resolve(pathUser), // La ruta del archivo .md
    }));
      // Agregar el siguiente console.log para mostrar los enlaces encontrados
    // console.log(links);

    if (links.length === 0) {
      resolve('The file is a .md file, but it does not contain any links.');
    } else if (validate && stats) {
      const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
        ...validatedLink,
        file: link.file,
      })));

      Promise.all(linkPromises)
        .then((validatedLinks) => {
          const statsResult = calculateStats(validatedLinks);
          resolve(statsResult);
        })
        .catch((error) => reject(error));
    } else if (validate) {
      const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
        ...validatedLink,
        file: link.file,
      })));

      Promise.all(linkPromises)
        .then((validatedLinks) => resolve(validatedLinks))
        .catch((error) => reject(error));
    } else if (stats) {
      const statsResult = calculateStats(links);
      resolve(statsResult);
    } else {
      resolve(links);
    }
  } else {
    reject(new Error('It is a file, but it is not .md'));
  }
});

export default mdLinks;
