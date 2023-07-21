import fs from 'fs'; // modulo fs, sistema de
import path from 'path';
import chalk from 'chalk';

// Indica la ruta
export const routeUser = process.argv[2];
// Indica la ruta existente
export const pathExists = (route) => fs.existsSync(route);

// Validar si la ruta es absoluta
export const makePathAbsolute = (route) => {
  if (!path.isAbsolute(route)) {
    const absolutePath = path.resolve(route);
    console.log(chalk.bold.magenta('Ahora es absoluta y se llama', absolutePath));
    return absolutePath;
  }
  return route;
};
