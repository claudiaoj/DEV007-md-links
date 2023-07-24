import fs from 'fs';
import path from 'path';
// import chalk from 'chalk';

// Existe la ruta
export const pathExists = (route) => fs.existsSync(route);
// Convierte una ruta relativa en absoluta
export const absolutePath = (route) => path.isAbsolute(route);
// Es un archivo
export const file = (route) => fs.statSync(route);
// Es un directorio
export const directory = (route) => fs.statSync(route).isDirectory();
// Si es un archivo .md
export const extname = (route) => path.extname(route);

// Lee el contenido de un archivo .md y extrae los links
export const readMdFile = (route) => {
  const content = fs.readFileSync(route, 'utf8');
  const linkRegex = /(?:\[([^\]]+)\]\((http[s]?:\/\/[^\s)]+)\)|<a\s+href="(http[s]?:\/\/[^"]+)"[^>]*>([^<]+)<\/a>)/g;
  const matches = Array.from(content.matchAll(linkRegex));
  const links = [];

  matches.forEach((match) => {
    const [text, url] = match;
    links.push({ text: text || match[4], url: url || match[3] });
  });
  console.log(readMdFile);
  return links;
};
