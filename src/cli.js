import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './mdLinks.js';

const path = process.argv[2];

mdLinks(path).then((res) => {
  console.log(chalk.green.bold(res));
}).catch((error) => {
  console.log(chalk.red.bold(error));
});
console.log();
