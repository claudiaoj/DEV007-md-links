import fs from 'fs'; // modulo fs, sistema de
import path from 'path';
// import chalk from 'chalk';

// Existe la ruta
export const pathExists = (route) => fs.existsSync(route);
// Convierte una ruta relativa en absoluta
export const absolutePath = (route) => path.isAbsolute(route);
// Es un archivo
export const file = (route) => fs.statSync(route);
// Es un directorio
// export const directory = (route) => fs.statSync(route).isDirectory();

// export const extname = (route) => path.extname(route);
