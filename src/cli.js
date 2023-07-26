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

// Obtiene el argumento ingresado en la línea de comandos (ruta o archivo .md)
const path = process.argv[2];
console.log(chalk.yellow('The route received:', path)); // Muestra la ruta recibida

mdLinks(path)
  // Se ejecutara cuando se resuelva con exito
  .then((res) => {
    if (typeof res === 'string') {
    // Si el resultado de "mdLinks" es una cadena de texto, significa que es un mensaje informativo
      // Muestra 'It is a .md file, but it does not contain links.'
      console.log(chalk.green.bold(res));
    } else {
    // Si el resultado de "mdLinks" es un array de objetos (los enlaces encontrados)
      console.log(chalk.green.bold('There is .md files\n'));
      console.log(chalk.magenta('Links found:\n'));
      // Convertir cada objeto de enlace en un nuevo objeto solo con las propiedad href, text y file
      const linkObjects = res.map((link) => ({
        href: link.href,
        text: link.text,
        file: link.file,
      }));

      console.log(linkObjects); // Muestra los objetos de enlace en la terminal
    }
  })
  .catch((error) => {
    // Si hay un error durante la ejecución de mdLinks: muestra ruta no válida o archivo inexistente
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
