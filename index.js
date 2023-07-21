// import fs from 'fs'; // modulo fs, sistema de
// import path from 'path';
// import chalk from 'chalk';
import { pathExists, absoluteRoute } from './functions';

// Función MD-Links
const mdLinks = (path) => new Promise((resolve, reject) => {
  if (!pathExists(path)) {
    reject(new Error('Error, la ruta no existe'));
  } else {
    const route = absoluteRoute(path);
    // console.log('La ruta existe');
    console.log('Ruta absoluta:', route);
    path.resolve();
  }
});

// Llamada a la función mdLinks con una ruta a verificar
const userPath = process.argv[2];
mdLinks(userPath)
  .then(() => {
    // Manejar los datos si es necesario
  })
  .catch((error) => {
    console.error(error.message); // Mostrar el error si la ruta no existe
  });
/* const mdLinks = () => {
  // Validar si la ruta existe
  if (!pathExists(routeUser)) {
    console.log(chalk.red.bold('Error, la ruta no existe'));
    return;
  }
  // Convertir la ruta relativa en absoluta si es necesario
  const absoluteRoute = makePathAbsolute(routeUser);

  console.log(chalk.green.bold('La ruta si existe')); // que diga si existe la ruta.
  console.log(chalk.green.bold('Ruta absoluta:', absoluteRoute)); // mostrar la ruta absoluta
};

mdLinks(); */

/* -----------------------------------Pruebas----------------------------------------------
// Ruta ingresada
/* const routeUser = process.argv[2];
// Para evaluar si existe la ruta
const pathExists = (route) => fs.existsSync(route);
const mdLinks = () => {
// Validar si la ruta existe
  if (pathExists(routeUser) === false) {
    reject(console.log(chalk.red.bold('Error, la ruta no existe')));
    return;
  }
  console.log(chalk.green.bold('La ruta si existe')); // que diga si existe la ruta.

  // Validar si la ruta es absoluta
  if (path.isAbsolute(routeUser) === false) {
    console.log(chalk.bold.magenta('Ahora es absoluta y se llama', path.resolve(routeUser)));
    // return;
  }
  console.log(chalk.bold.cyan('Si, la ruta ya es absoluta'));

  // Verificar si es un archivo o un directorio
  const stats = fs.statSync(routeUser);
  if (stats.isFile()) {
    console.log(chalk.bold.yellow('La ruta se refiere a un archivo'));

    // Verificar si el archivo tiene extensión ".md"
    const extname = path.extname(routeUser);
    if (extname === '.md') {
      console.log(chalk.bold.bgMagentaBright.italic('El archivo es Markdown (.md)'));
    } else {
      console.log(chalk.bold.red('El archivo no es Markdown (.md)'));
    }
  } else if (stats.isDirectory()) {
    console.log(chalk.red.bold.italic('La ruta se refiere a un directorio'));
  }
};
mdLinks(); */

/* ----------------2da Prueba-------------------------------

// Ingresamos la ruta ./README.md
/* const routeUser = process.argv[2];
const mdLinks = (route) => fs.existsSync(route);
// valida si existe la ruta
if (mdLinks(routeUser) === false) {
  console.log('¡Error!'); // ¿Y si no existe? muestra error
} else if (path.isAbsolute(routeUser) === false) {
  console.log(path.resolve(routeUser));
} else {
  console.log('La ruta ya era absoluta');
} */

/* export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // Identifica si la ruta existe
  if (fs.existsSync(path)) {
    // resolve('La ruta existe');
    // Chequear o convertir a una ruta absoluta
    // Probar si esa ruta es un archivo o un directorio
    // Si es un directorio filtrar los archivos md
  } else {
    // Si no existe la ruta, rechaza la promesa
    reject('La ruta no existe');
  }
}); */
