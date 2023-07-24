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
console.log(chalk.yellow('LA ruta recibida:', path));

mdLinks(path)
  .then((links) => {
    if (typeof links === 'string') {
      console.log(chalk.green.bold(links));
      // Muestra el mensaje de 'Es un archivo .md, pero no contiene links.'
    } else {
      console.log(chalk.green.bold('Es un archivo .md\n'));
      console.log(chalk.magenta('Links encontrados:\n'));
      links.forEach((link, index) => {
        console.log(chalk.magenta(`${index + 1}. Texto: ${link.text} - URL: ${link.url}`));
      });
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });
