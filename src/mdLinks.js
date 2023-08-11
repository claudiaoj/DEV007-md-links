import path from 'path';
import {
  pathExists, absolutePath, directory, extname,
  getStats, readMdFile, getMdFilesRecursive, validateLink, calculateStats,
// eslint-disable-next-line import/extensions
} from './functions.js';

// Función para procesar los links y las opciones de validate y stats
const processLinks = (links, { validate, stats }) => {
  if (validate) {
    return Promise.all(links.map((link) => validateLink(link)))
      .then((validatedLinks) => {
        if (stats) {
          const statsResult = calculateStats(validatedLinks);
          return statsResult;
        }
        return validatedLinks;
      });
  }
  if (stats) {
    const statsResult = calculateStats(links);
    return Promise.resolve(statsResult);
  }
  return Promise.resolve(links);
};

// Función principal mdLinks
const mdLinks = (pathUser, options = {}) => new Promise((resolve, reject) => {
  const { validate = false, stats = false } = options;
  if (!pathExists(pathUser)) {
    reject(new Error('The route doesn\'t exist. Please enter a valid path'));
  }
  if (!absolutePath(pathUser)) {
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }
  if (directory(pathUser)) {
    const mdFiles = getMdFilesRecursive(pathUser);
    const linksPromises = mdFiles.map((file) => mdLinks(file, { validate }));

    Promise.all(linksPromises)
      .then((results) => results.flat())
      .then((links) => processLinks(links, { validate, stats }))
      .then(resolve)
      .catch(reject);
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    const links = readMdFile(pathUser);

    processLinks(links, { validate, stats })
      .then(resolve)
      .catch(reject);
  } else {
    reject(new Error('It\'s a file, but it isn\'t .md'));
  }
});

export default mdLinks;
