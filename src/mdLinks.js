import axios from 'axios';
import path from 'path';
import {
  pathExists, absolutePath, directory, extname,
  getStats, readMdFile, getMdFilesRecursive,
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

const calculateStats = (links) => {
  const uniqueLinksSet = new Set(links.map((link) => link.href));
  const uniqueLinks = uniqueLinksSet.size;
  const totalLinks = links.length;
  const brokenLinks = links.filter((link) => link.status >= 400).length;
  return {
    totalLinks,
    uniqueLinks,
    brokenLinks,
    uniqueLinksArray: Array.from(uniqueLinksSet),
  };
};

// Función principal mdLinks

const mdLinks = (pathUser, { validate = false, stats = false, unique = false }
= {}) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    reject(new Error('The route does not exist. Please enter a valid path'));
  }

  if (!absolutePath(pathUser)) {
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }

  if (directory(pathUser)) {
    const mdFiles = getMdFilesRecursive(pathUser);
    const linksPromises = mdFiles.map((file) => mdLinks(file, { validate }));
    Promise.all(linksPromises)
      .then((results) => results.flat())
      .then((links) => {
        const uniqueLinksSet = new Set(links.map((link) => link.href));
        const uniqueLinksArray = Array.from(uniqueLinksSet);

        if (validate && stats) {
          const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
            ...validatedLink,
            file: link.file,
          })));

          Promise.all(linkPromises)
            .then((validatedLinks) => {
              const statsResult = calculateStats(validatedLinks);
              statsResult.uniqueLinks = unique ? uniqueLinksArray.length : statsResult.uniqueLinks;
              statsResult.uniqueLinksArray = unique ? uniqueLinksArray : [];
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
          statsResult.uniqueLinks = unique ? uniqueLinksArray.length : statsResult.uniqueLinks;
          statsResult.uniqueLinksArray = unique ? uniqueLinksArray : [];
          resolve(statsResult);
        } else if (unique) {
          resolve(uniqueLinksArray);
        } else {
          resolve(links);
        }
      })
      .catch((error) => reject(error));
  } else if (getStats(pathUser).isFile() && extname(pathUser) === '.md') {
    const links = readMdFile(pathUser);
    if (validate && stats) {
      const linkPromises = links.map((link) => validateLink(link).then((validatedLink) => ({
        ...validatedLink,
        file: link.file,
      })));

      Promise.all(linkPromises)
        .then((validatedLinks) => {
          const statsResult = calculateStats(validatedLinks);
          statsResult.uniqueLinks = unique ? 1 : statsResult.uniqueLinks;
          statsResult.uniqueLinksArray = unique ? [links[0].href] : [];
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
      statsResult.uniqueLinks = unique ? 1 : statsResult.uniqueLinks;
      statsResult.uniqueLinksArray = unique ? [links[0].href] : [];
      resolve(statsResult);
    } else if (unique) {
      const uniqueLinksSet = new Set(links.map((link) => link.href));
      const uniqueLinksArray = Array.from(uniqueLinksSet);
      resolve(uniqueLinksArray);
    } else {
      resolve(links);
    }
  } else {
    reject(new Error('It is a file, but it is not .md'));
  }
});

export default mdLinks;
