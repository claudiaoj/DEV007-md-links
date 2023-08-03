#!/usr/bin/env node
import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './src/mdLinks.js';

// Obtiene la ruta del archivo y las opciones de la línea de comandos
const path = process.argv[2];
const options = process.argv.slice(3);

// console.log(chalk.yellow('The route received:', path));

// Verifica si las opciones incluyen validate y stats
const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');

// Llama a la función mdLinks con la ruta y las opciones de validate y stats
mdLinks(path, { validate: validateOption, stats: statsOption })
  .then((res) => {
    if (res.length === 0) {
      throw new Error('No links found');
      // Si el resultado es un string/mensaje, lo muestra en verde y negrita
    } if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
      // Si solo se incluyó la opción de validate y stats
    } else if (validateOption && statsOption) {
      const { totalLinks, uniqueLinks, brokenLinks } = res;
      console.log(chalk.magenta.bold('Validation and Stats:\n'));
      console.log(chalk.blue('❯ '), (chalk.blue.bold(`Total links: ${totalLinks}`)));
      console.log(chalk.yellow('❯ '), (chalk.yellow.bold(`Unique links: ${uniqueLinks}`)));
      console.log(chalk.red('❯ '), (chalk.red.bold(`Broken links: ${brokenLinks}`)));
      // Si solo se incluyó la opción de validación
    } else if (validateOption) {
      // Muetsra el resultado de validate en magenta con negrita
      console.log(chalk.magenta.bold('Validation:\n'));
      res.forEach((link) => {
        const {
          href, text, file, status,
        } = link;
        const ok = status >= 200 && status < 400 ? 'OK' : 'FAIL';
        console.log(chalk.magentaBright('      ——————     '));
        console.log(chalk.cyan(`href: ${href}`));
        console.log(chalk.cyan(`text: ${text}`));
        console.log(chalk.cyan(`file: ${file}`));
        console.log(chalk.cyan(`status: ${status}`));
        console.log(chalk.cyan(`ok: ${ok}\n`));
      });
      // Si solo se incluyó la opción stats
    } else if (statsOption) {
      const { totalLinks, uniqueLinks } = res;
      console.log(chalk.magenta.bold('Stats:\n'));
      console.log(chalk.blue.bold('❯ '), (chalk.blue.bold(`Total links: ${totalLinks}`)));
      console.log(chalk.yellow.bold('❯ '), (chalk.yellow.bold(`Unique links: ${uniqueLinks}`)));
    } else {
      console.log(chalk.magenta.bold('Links found:\n'));
      console.log(res);
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });