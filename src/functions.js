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
  // Lee el contenido del archivo en la ruta especificada (route)
  const content = fs.readFileSync(route, 'utf8');
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  // Busca todas las coincidencias de enlaces en el contenido del archivo utilizando regex
  // El método matchAll devuelve un iterador con todas las coincidencias encontradas
  const matches = Array.from(content.matchAll(linkRegex));
  // eslint-disable-next-line max-len
  // Map las coincidencias encontradas para formar un nuevo array de objetos que representan los enlaces
  // Cada objeto tendrá las propiedades text y url
  const links = matches.map((match) => ({
    text: match[1],
    url: match[2],
  }));
  // Retorna el array de objetos que contiene los enlaces encontrados en el archivo .md
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
