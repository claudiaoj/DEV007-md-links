// import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
// Axios para realizar solicitudes HTTP
import axios from 'axios';

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
  // Lee el contenido del archivo en formato UTF-8
  const content = fs.readFileSync(route, 'utf8');
  // Expresión regular para buscar patrones de enlaces en el contenido
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  // Obtiene todas las coincidencias de enlaces en el contenido y las almacena en un array
  const matches = Array.from(content.matchAll(linkRegex));
  // Crea un array de objetos de enlaces, extrayendo el texto y la URL de cada coincidencia
  const links = matches.map((match) => ({
    text: match[1], // Texto del enlace
    href: match[2], // URL del enlace
    file: path.resolve(route), // Ruta absoluta del archivo que contiene el enlace
  }));
  // Devuelve el array de objetos de enlaces
  return links;
};
// Obtiene todos los archivos .md de un directorio y sus subdirectorios
export const getMdFilesRecursive = (dir) => {
  let mdFiles = [];

  // Lee los archivos y subdirectorios del directorio
  const files = fs.readdirSync(dir);
  // Para cada archivo o subdirectorio
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Si es un archivo .md, agregarlo al array "mdFiles"
    if (stats.isFile() && path.extname(filePath) === '.md') {
      mdFiles.push(filePath);
      // Si es un directorio, llama recursivamente a la función para obtener archivos .md
    } else if (stats.isDirectory()) {
      const subDirMdFiles = getMdFilesRecursive(filePath);
      mdFiles = mdFiles.concat(subDirMdFiles);
    }
  });
  // Retorna el array con todos los archivos .md encontrados en el directorio
  return mdFiles;
};

// Función para validar un enlace
export const validateLink = (link) => new Promise((resolve) => {
  // Crea una copia del objeto link usando el operador de propagación (...)
  const validatedLink = { ...link };
  // Realiza una solicitud HTTP get a la URL especificada en link.href
  axios.get(link.href)
    .then((response) => {
      // Si la solicitud es exitosa, actualiza las prop status y statusText del objeto validatedLink
      validatedLink.status = response.status;
      validatedLink.statusText = response.statusText;
      // Resuelve la promesa con validatedLink que contiene la información del enlace validado
      resolve(validatedLink);
    })
    .catch(() => {
      // Si la solicitud falla, establece status en 404 y statusText en 'Not Found'
      validatedLink.status = 404;
      validatedLink.statusText = 'Not Found';
      // Resuelve la promesa con validatedLink que contiene la información del enlace: estado 404
      resolve(validatedLink);
    });
});

// Función para calcular las stats de un conjunto de enlaces
export const calculateStats = (links) => {
  // New set, para almacenar enlaces únicos usando la propiedad href de cada enlace
  const uniqueLinksSet = new Set(links.map((link) => link.href));
  // Obtiene la cantidad de enlaces únicos contando el tamaño del conjunto
  const uniqueLinks = uniqueLinksSet.size;
  // Obtiene el total de enlaces contando la cantidad de elementos en el array de enlaces
  const totalLinks = links.length;
  // Filtra los enlaces para obtener solo los que tienen un código
  // de estado HTTP mayor o igual a 400(rotos)
  const brokenLinks = links.filter((link) => link.status >= 400).length;
  return {
    totalLinks,
    uniqueLinks,
    brokenLinks,
    // Array de enlaces únicos obtenidos del conjunto
    uniqueLinksArray: Array.from(uniqueLinksSet),
  };
};
