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
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  const matches = Array.from(content.matchAll(linkRegex));
  const links = matches.map((match) => ({
    text: match[1], // Corregir: text en lugar de href
    href: match[2], // Corregir: href en lugar de text
    file: path.resolve(route),
  }));
  return links;
};
// Obtener todos los archivos .md de un directorio y sus subdirectorios
export const getMdFilesRecursive = (dir) => {
  let mdFiles = [];

  // Leer los archivos y subdirectorios del directorio
  const files = fs.readdirSync(dir);
  // Para cada archivo o subdirectorio
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Si es un archivo .md, agregarlo al array "mdFiles"
    if (stats.isFile() && path.extname(filePath) === '.md') {
      mdFiles.push(filePath);
      // Si es un directorio, llamar recursivamente a la función para obtener archivos .md
    } else if (stats.isDirectory()) {
      const subDirMdFiles = getMdFilesRecursive(filePath);
      mdFiles = mdFiles.concat(subDirMdFiles);
    }
  });
  // Retornar el array con todos los archivos .md encontrados en el directorio
  return mdFiles;
};
