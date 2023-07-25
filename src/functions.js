// import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Existe la ruta
export const pathExists = (route) => fs.existsSync(route);
// Convierte una ruta relativa en absoluta
export const absolutePath = (route) => path.isAbsolute(route);
// Es un archivo
export const getStats = (route) => fs.statSync(route);
// Es un directorio
export const directory = (route) => fs.statSync(route).isDirectory();
// Si es un archivo .md
export const extname = (route) => path.extname(route);

// Lee el contenido de un archivo .md y extrae los links
export const readMdFile = (route) => {
  const content = fs.readFileSync(route, 'utf8');
  const linkRegex = /\[([^\]]+)\]\((.*)\)/gm;
  const matches = Array.from(content.matchAll(linkRegex));
  const links = [];

  matches.forEach((match) => {
    const [url, text] = match;
    links.push({ url: url || match[4], text: text || match[3] });
  });
  // console.log(readMdFile);
  return links;
};
