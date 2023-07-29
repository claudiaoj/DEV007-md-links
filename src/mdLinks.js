// import fs from 'fs';
import path from 'path';
import {
  pathExists, absolutePath, directory, extname,
  getStats, readMdFile, getMdFilesRecursive,
  validateLink, calculateStats,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función principal mdLinks
const mdLinks = (pathUser, { validate = false, stats = false, unique = false }
= {}) => new Promise((resolve, reject) => {
  // Comprueba si la ruta existe. Si no existe, rechaza la promesa con un error
  if (!pathExists(pathUser)) {
    reject(new Error('The route does not exist. Please enter a valid path'));
  }
  // Comprueba si la ruta no es absoluta, si no es absoluta, la convierte a absoluta
  if (!absolutePath(pathUser)) {
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }

  // Si la ruta es un directorio
  if (directory(pathUser)) {
    // Obtiene todos los archivos .md recursivamente en el directorio
    const mdFiles = getMdFilesRecursive(pathUser);
    // Crea un array de promesas para llamar a mdLinks para cada archivo .md encontrado
    const linksPromises = mdFiles.map((file) => mdLinks(file, { validate }));
    // Resuelve todas las promesas creadas y aplana el resultado para obtener un array de enlaces
    Promise.all(linksPromises)
      .then((results) => results.flat())
      .then((links) => {
        // Crea un set de enlaces únicos y un array a partir del conjunto
        const uniqueLinksSet = new Set(links.map((link) => link.href));
        const uniqueLinksArray = Array.from(uniqueLinksSet);

        // Si se seleccionan validate y stats
        if (validate && stats) {
          // Crea un array de promesas para validar cada enlace y
          // añade la propiedad "file" al resultado
          const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
            ...validatedLink,
            file: link.file,
          })));

          // Resuelve todas las promesas de validate y calcula las stats
          Promise.all(linkPromises)
            .then((validatedLinks) => {
              const statsResult = calculateStats(validatedLinks);
              // Si selecciona la opción unique, actualiza
              // el resultado con el número de enlaces únicos y el array de enlaces únicos
              statsResult.uniqueLinks = unique ? uniqueLinksArray.length : statsResult.uniqueLinks;
              statsResult.uniqueLinksArray = unique ? uniqueLinksArray : [];
              resolve(statsResult);
            })
            .catch((error) => reject(error));
        // Si solo se selecciona validate
        } else if (validate) {
          // Crea un array de promesas para validar cada enlace y
          // añade la propiedad "file" al resultado
          const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
            ...validatedLink,
            file: link.file,
          })));
          // Resuelve todas las promesas de validate
          Promise.all(linkPromises)
            .then((validatedLinks) => resolve(validatedLinks))
            .catch((error) => reject(error));
          // Si solo se selecciona stats
        } else if (stats) {
          // Calcula las stats de los enlaces y si se selecciona unique,
          // actualiza el resultado con el número de enlaces únicos y el array de enlaces únicos
          const statsResult = calculateStats(links);
          statsResult.uniqueLinks = unique ? uniqueLinksArray.length : statsResult.uniqueLinks;
          statsResult.uniqueLinksArray = unique ? uniqueLinksArray : [];
          resolve(statsResult);
          // Si solo se selecciona la opción de enlaces únicos
        } else if (unique) {
          // Resuelve el array de enlaces únicos
          resolve(uniqueLinksArray);
        } else {
          resolve(links);
        }
      })
      .catch((error) => reject(error));
  // Si la ruta es un archivo y tiene extensión .md
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    // Lee los enlaces del archivo .md
    const links = readMdFile(pathUser);
    // Si se selecciona las opciones validate y stats
    if (validate && stats) {
      // Crea un array de promesas para validar cada enlace y añade la propiedad "file" al resultado
      const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
        ...validatedLink,
        file: link.file,
      })));

      Promise.all(linkPromises)
        .then((validatedLinks) => {
          const statsResult = calculateStats(validatedLinks);
          // Si se selecciona unique actualiza el resultado con el nº de enlaces únicos
          // y el array de enlaces únicos
          statsResult.uniqueLinks = unique ? 1 : statsResult.uniqueLinks;
          statsResult.uniqueLinksArray = unique ? [links[0].href] : [];
          resolve(statsResult);
        })
        .catch((error) => reject(error));
      // Si solo se selecciona la opción validate
    } else if (validate) {
      // Crea un array de promesas para validar cada enlace y añade la propiedad "file" al resultado
      const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
        ...validatedLink,
        file: link.file,
      })));

      Promise.all(linkPromises)
        .then((validatedLinks) => resolve(validatedLinks))
        .catch((error) => reject(error));
      // Si solo se selecciona stats
    } else if (stats) {
      // Calcula las stats de los enlaces y si se selecciona unique
      // actualiza el resultado con el nº de enlaces únicos y el array de enlaces únicos
      const statsResult = calculateStats(links);
      statsResult.uniqueLinks = unique ? 1 : statsResult.uniqueLinks;
      statsResult.uniqueLinksArray = unique ? [links[0].href] : [];
      resolve(statsResult);
      // Si solo se selecciona la opcion de enlaces unicos
    } else if (unique) {
      // Crea un set de enlaces únicos y un array a partir del conjunto
      const uniqueLinksSet = new Set(links.map((link) => link.href));
      const uniqueLinksArray = Array.from(uniqueLinksSet);
      // Resuelve con el array de enlaces únicos
      resolve(uniqueLinksArray);
    } else {
      resolve(links);
    }
    // Si no se seleccionaron opciones adicionales resuelve con el array de enlaces encontrados
  } else {
    reject(new Error('It is a file, but it is not .md'));
  }
});

export default mdLinks;
