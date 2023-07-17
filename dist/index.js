const fs = require('fs');


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => { 
    // Identifica si la ruta existe
    if(fs.existsSync(path)) {
    // Chequear o convertir a una ruta absoluta
    // Probar si esa ruta es un archivo o un directorio
    // Si es un directorio filtrar los archivos md
    } else {
    // Si no existe la ruta, rechaza la promesa
      reject('La ruta no existe');
    }
  });
}

module.exports = {
mdLinks
};

//import imagen from './thumb.png';
