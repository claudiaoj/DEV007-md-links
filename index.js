import fs  from 'fs';
  
//const chalk = require("chalk");

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe
    if (fs.existsSync(path)) {
      //resolve('La ruta existe');
      // Chequear o convertir a una ruta absoluta
      // Probar si esa ruta es un archivo o un directorio
      // Si es un directorio filtrar los archivos md
    } else {
      // Si no existe la ruta, rechaza la promesa
      reject('La ruta no existe');
    }
  });
};

//import image from './thumb.png'
