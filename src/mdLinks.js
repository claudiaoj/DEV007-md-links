// Importa el módulo 'path' para trabajar con rutas de archivos y directorios
import path from 'path';
// Importa varias funciones de './functions.js'
import {
  pathExists, absolutePath, directory, extname,
  getStats, readMdFile, getMdFilesRecursive, validateLink, calculateStats,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función auxiliar para procesar los links y opciones de validate y stats
const processLinks = (links, { validate, stats }) => {
  // Si la opción 'validate' es verdadera
  if (validate) {
    // Valida cada enlace en paralelo usando Promise.all y validateLink
    return Promise.all(links.map((link) => validateLink(link)))
      .then((validatedLinks) => {
        // Si también la opción 'stats' es verdadera
        if (stats) {
          // Calcula las stats usando la función 'calculateStats' en base a los enlaces validados
          const statsResult = calculateStats(validatedLinks);
          // Añade al resultado la propiedad 'uniqueLinks' con el número de enlaces únicos
          statsResult.uniqueLinks = statsResult.uniqueLinksArray.length;
          return statsResult;
        }
        // Si solo se solicitó la validación, devuelve los enlaces validados
        return validatedLinks;
      });
  }
  // Si la opción 'stats' es verdadera (y 'validate' es falsa, ya que se validó antes)
  if (stats) {
    // Calcula las estadísticas usando la función 'calculateStats' en base a los enlaces
    const statsResult = calculateStats(links);
    // Añade al resultado la propiedad 'uniqueLinks' con el número de enlaces únicos
    statsResult.uniqueLinks = statsResult.uniqueLinksArray.length;
    // Resuelve la promesa con el resultado
    return Promise.resolve(statsResult);
  }
  // Si no se solicitó ni validación ni estadísticas, simplemente devuelve los enlaces originales
  return Promise.resolve(links);
};

// Función principal mdLinks
const mdLinks = (pathUser, { validate = false, stats = false } = {}) => {
  // Verifica si la ruta existe
  if (!pathExists(pathUser)) {
    // Si la ruta no existe, devuelve una promesa con un error
    return Promise.reject(new Error('The route does not exist. Please enter a valid path'));
  }

  // Verifica si la ruta no es absoluta
  if (!absolutePath(pathUser)) {
    // Si no es absoluta, devuelve una promesa con la ruta absoluta
    return Promise.resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }

  // Si la ruta es un directorio
  if (directory(pathUser)) {
    // Obtiene todos los archivos .md recursivamente en el directorio
    const mdFiles = getMdFilesRecursive(pathUser);
    // Crea un array de promesas para llamar a mdLinks para cada archivo .md encontrado
    const linksPromises = mdFiles.map((file) => mdLinks(file, { validate }));
    // Resuelve todas las promesas creadas y aplana el resultado para obtener un array de enlaces
    return Promise.all(linksPromises)
      .then((results) => results.flat())
      .then((links) => processLinks(links, { validate, stats }));
  }

  // Si la ruta es un archivo y tiene extensión .md
  if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    // Lee los enlaces del archivo .md
    const links = readMdFile(pathUser);
    // Procesa los enlaces y devuelve una promesa con el resultado (puede ser validate o stats)
    return processLinks(links, { validate, stats });
  }

  // Si la ruta es un archivo pero no tiene extensión .md devuelve un error
  return Promise.reject(new Error('It is a file, but it is not .md'));
};

// Exporta la función mdLinks como la función principal de este módulo
export default mdLinks;
