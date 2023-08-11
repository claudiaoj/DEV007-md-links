import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const pathExists = (route) => fs.existsSync(route);

export const absolutePath = (route) => path.isAbsolute(route);

export const getStats = (route) => fs.statSync(route);

export const directory = (route) => fs.statSync(route).isDirectory();

export const extname = (route) => path.extname(route);

// Función que lee el contenido de un archivo .md y extrae los links
export const readMdFile = (route) => {
  const content = fs.readFileSync(route, 'utf8');
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  const matches = Array.from(content.matchAll(linkRegex));
  const links = matches.map((match) => ({
    text: match[1],
    href: match[2],
    file: path.resolve(route),
  }));
  return links;
};

// Función que obtiene todos los archivos .md de un directorio y sus subdirectorios
export const getMdFilesRecursive = (dir) => {
  let mdFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && path.extname(filePath) === '.md') {
      mdFiles.push(filePath);
    } else if (stats.isDirectory()) {
      const subDirMdFiles = getMdFilesRecursive(filePath);
      mdFiles = mdFiles.concat(subDirMdFiles);
    }
  });
  return mdFiles;
};

// Función para validar un enlace
export const validateLink = (link) => new Promise((resolve) => {
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

// Función para calcular las stats
export const calculateStats = (links) => {
  const uniqueLinksSet = new Set(links.map((link) => link.href));
  const uniqueLinks = uniqueLinksSet.size;
  const totalLinks = links.length;
  const brokenLinks = links.filter((link) => link.status >= 400).length;
  return {
    totalLinks,
    uniqueLinks,
    brokenLinks,
  };
};
