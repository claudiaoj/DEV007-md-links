import path from 'path';
import {
  pathExists, absolutePath, directory, extname,
  getStats, readMdFile, getMdFilesRecursive, validateLink, calculateStats,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Fx para procesar los links y las opciones de validate y stats
const processLinks = (links, { validate, stats }) => {
  // Si se elige validate(true)
  if (validate) {
    // Valida cada enlace en paralelo usando Promise.all y validateLink
    return Promise.all(links.map((link) => validateLink(link)))
      .then((validatedLinks) => {
        // Si también se elige la opción stats(true)
        if (stats) {
          // Calcula las stats usando la fx calculateStats en base a los enlaces validados
          const statsResult = calculateStats(validatedLinks);
          // Añade al resultado la propiedad 'uniqueLinks' con el número de enlaces únicos
          statsResult.uniqueLinks = statsResult.uniqueLinksArray.length;
          return statsResult;
        }
        // Si solo se solicito validate devuelve los enlaces validados
        return validatedLinks;
      });
  }
  // Si se elige stats(true)
  if (stats) {
    // Calcula las stats usando la fx calculateStats en base a los enlaces
    const statsResult = calculateStats(links);
    // Añade al resultado la propiedad 'uniqueLinks' con el número de enlaces únicos
    statsResult.uniqueLinks = statsResult.uniqueLinksArray.length;
    // Resuelve la promesa con el resultado de las stats
    return Promise.resolve(statsResult);
  }

  // Si no se solicito ni validate ni stats, devuelve los enlaces originales
  return Promise.resolve(links);
};

// Función principal mdLinks
// eslint-disable-next-line max-len
const mdLinks = (pathUser, options = {}) => new Promise((resolve, reject) => {
  const { validate = false, stats = false } = options;
  // Verifica si la ruta existe
  if (!pathExists(pathUser)) {
    // Si la ruta no existe, devuelve una promesa con un error
    reject(new Error('The route doesn\'t exist. Please enter a valid path'));
  }

  // En caso que la ruta si existe, verifica si la ruta no es absoluta
  if (!absolutePath(pathUser)) {
    // Si no es absoluta, devuelve una promesa con la ruta absoluta
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
      .then((links) => processLinks(links, { validate, stats }))
      .then(resolve)
      .catch(reject);
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    // Si la ruta es un archivo y tiene extensión .md, lee los enlaces del archivo .md
    const links = readMdFile(pathUser);
    // Procesa los enlaces y devuelve una promesa con el resultado (puede ser validate o stats)
    processLinks(links, { validate, stats })
      .then(resolve)
      .catch(reject);
  } else {
    // Si la ruta es un archivo pero no tiene extensión .md, se rechaza promesa con un error
    reject(new Error('It\'s a file, but it isn\'t .md'));
  }
});

export default mdLinks;
