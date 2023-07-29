import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './mdLinks.js';

// Obtiene la ruta del archivo y las opciones de la línea de comandos
const path = process.argv[2];
const options = process.argv.slice(3);

console.log(chalk.yellow('The route received:', path));

// Verifica si las opcions, incluyen validate, stats y opciones únicas
const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');
const uniqueOption = options.includes('--unique') || options.includes('--u');

// Llama a la fx mdLinks con la ruta, las opciones de validate, stats y unique
mdLinks(path, { validate: validateOption, stats: statsOption, unique: uniqueOption })
  .then((res) => {
    // Si el resultado es un string/mensaje, mostrarlo en verde y negrita
    if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
      // Si solo se incluyó la opción validator/stats
    } else if (validateOption && statsOption) {
      const { totalLinks, uniqueLinks, brokenLinks } = res;
      console.log(chalk.magenta('Validation and Stats:\n'));
      console.log(chalk.cyan.bold(`Total links: ${totalLinks}`));
      console.log(chalk.cyan.bold(`Unique links: ${uniqueLinks}`));
      console.log(chalk.cyan.bold(`Broken links: ${brokenLinks}`));
      // Si solo se incluyó la opción de validación
    } else if (validateOption) {
      // Mostrar el resultado de validate en magenta con negrita
      console.log(chalk.magenta('Validation:\n'));
      res.forEach((link) => {
        const {
          href, text, file, status,
        } = link;
        const ok = status >= 200 && status < 400 ? 'OK' : 'FAIL';
        console.log(chalk.cyan(`href: ${href}`));
        console.log(chalk.cyan(`text: ${text}`));
        console.log(chalk.cyan(`file: ${file}`));
        console.log(chalk.cyan(`status: ${status}`));
        console.log(chalk.cyan(`ok: ${ok}\n`));
      });
      // Si solo se incluyó la opción de stats
    } else if (statsOption) {
      const { totalLinks, uniqueLinks } = res;
      console.log(chalk.magenta('Stats:\n'));
      console.log(chalk.cyan.bold(`Total links: ${totalLinks}`));
      console.log(chalk.cyan.bold(`Unique links: ${uniqueLinks}`));
    } else if (uniqueOption) {
      console.log(chalk.magenta('Unique Links:\n'));
      console.log(res);
    } else {
      console.log(chalk.magenta('Links found:\n'));
      console.log(res);
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });
