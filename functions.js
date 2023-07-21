import fs from 'fs'; // modulo fs, sistema de
import path from 'path';
// import chalk from 'chalk';

// Indica la ruta
export const routeUser = process.argv[2];

// Verifica existencia de ruta
export const pathExists = (userPath) => {
  if (fs.existsSync(userPath)) {
    // console.log('La ruta existe')
    return true;
  }
  // console.log('la ruta no existe');
  return false;
};

// Verifica si es ruta absoluta, sino se convierte
export const absoluteRoute = (userPath) => {
  if (path.isAbsolute(userPath)) {
    return userPath;
  }
  return path.resolve(userPath);
};
