#!/usr/bin/env node
import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './src/mdLinks.js';

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
    } if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
    } else if (validateOption && statsOption) {
      const { totalLinks, uniqueLinks, brokenLinks } = res;
      console.log(chalk.magenta.bold('Validation and Stats:\n'));
      console.log(chalk.blue('❯ '), (chalk.blue.bold(`Total links: ${totalLinks}`)));
      console.log(chalk.yellow('❯ '), (chalk.yellow.bold(`Unique links: ${uniqueLinks}`)));
      console.log(chalk.red('❯ '), (chalk.red.bold(`Broken links: ${brokenLinks}`)));
    } else if (validateOption) {
      console.log(chalk.magenta.bold('Validation:\n'));
      res.forEach((link) => {
        const {
          text, href, file, status,
        } = link;
        const ok = status >= 200 && status < 400 ? 'OK' : 'FAIL';
        console.log(chalk.magentaBright('      ——————     '));
        console.log(chalk.cyan(`text: ${text}`));
        console.log(chalk.cyan(`href: ${href}`));
        console.log(chalk.cyan(`file: ${file}`));
        console.log(chalk.cyan(`status: ${status}`));
        console.log(chalk.cyan(`ok: ${ok}\n`));
      });
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
