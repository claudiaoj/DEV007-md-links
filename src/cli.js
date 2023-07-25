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
console.log(chalk.yellow('The route received:', path));

mdLinks(path)
  // Se ejecutara cuando se resuelva con exito
  .then((res) => {
    if (typeof res === 'string') {
      // Muestra el mensaje de 'Es un archivo .md, pero no contiene links.'
      console.log(chalk.green.bold(res));
    } else {
      console.log(chalk.green.bold('It is a .md file\n'));
      console.log(chalk.magenta('Links found:\n'));
      const linkObjects = res.map((link) => ({
        href: link.href,
        text: link.text,
        file: link.file,
      }));

      console.log(linkObjects);
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });
