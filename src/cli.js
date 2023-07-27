/* import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './mdLinks.js';

const path = process.argv[2];
console.log(chalk.yellow('LA ruta recibida :', path));

mdLinks(path).then((res) => {
  console.log(chalk.green.bold(res));
}).catch((error) => {
  console.log(chalk.red.bold(error));
});
console.log();
*/

import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './mdLinks.js';

const path = process.argv[2];
const options = process.argv.slice(3);

console.log(chalk.yellow('The route received:', path));

const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');

mdLinks(path, { validate: validateOption, stats: statsOption })
  .then((res) => {
    if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
    } else {
      console.log(chalk.green.bold('There are .md files\n'));
      if (validateOption && statsOption) {
        const { totalLinks, uniqueLinks, brokenLinks } = res;

        console.log(chalk.magenta('Validation and Stats:\n'));
        console.log(chalk.cyan.bold(`Total links: ${totalLinks}`));
        console.log(chalk.cyan.bold(`Unique links: ${uniqueLinks}`));
        console.log(chalk.cyan.bold(`Broken links: ${brokenLinks}`));
      } else if (validateOption) {
        console.log(chalk.magenta('Validation:\n'));
        res.forEach((link) => {
          const {
            href, text, file, status,
          } = link;
          const ok = status >= 200 && status < 400 ? 'OK' : 'Fail';

          console.log(chalk.cyan(`href: ${href}`));
          console.log(chalk.cyan(`text: ${text}`));
          console.log(chalk.cyan(`file: ${file}`));
          console.log(chalk.cyan(`status: ${status}`));
          console.log(chalk.cyan(`ok: ${ok}\n`));
        });
      } else if (statsOption) {
        const { totalLinks, uniqueLinks } = res;

        console.log(chalk.magenta('Stats:\n'));
        console.log(chalk.cyan.bold(`Total links: ${totalLinks}`));
        console.log(chalk.cyan.bold(`Unique links: ${uniqueLinks}`));
      } else {
        console.log(chalk.magenta('Links found:\n'));
        console.log(res);
      }
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });

// -----------PRUEBA OPTIONS-------------------------
/* console.log(process.argv);
const optionsObject = {};
if (process.argv[3] === '--validate') {
  optionsObject.validate = true;
} else {
  optionsObject.validate = false;
}

mdLinks(process.argv[2], optionsObject)
  .then((result) => {
    console.log(chalk.cyan.bold(result));
  }).catch((err) => {
    console.log(chalk.magenta.bold(err));
  }); */
